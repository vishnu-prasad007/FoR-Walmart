import {request, Request,Response} from 'express';
import { truncate } from 'fs/promises';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import{connection,queryRunner} from '../../config/connection';
import { Follower } from '../../models/follower';
import { Item } from '../../models/products/items';
import { Orders } from '../../models/products/order';
import { User } from '../../models/user';
import { CodeBrewingApiException } from '../../utils/exception';



const getUser = async(request:Request,response:Response) => {
    try {
        const user = await connection.getRepository(User).find({where:{id:response.locals.userId}});
        if(user){
            // user exist return back
            return response.status(StatusCodes.OK).json(user[0]);
        }
        throw new CodeBrewingApiException("User not found",StatusCodes.NOT_FOUND);
    } catch(error) {

        if (error instanceof CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


const followUser = async(request:Request,response:Response) => {
    let userId = response.locals.userId;
    let followingUserId = request.params.followingUserId;
    console.log(followingUserId);
    try {
        let userRespository = connection.getRepository(User);
        let followUserRepository = connection.getRepository(Follower);

        let [follower,followingUser] = await Promise.all([
            userRespository.findOne({where:{id:userId}}),
            userRespository.findOne({where:{id:followingUserId}})
        ]);

        console.log(follower);
        console.log(followingUser);

        let newFollower = followUserRepository.create({
            followedBy:follower,
            following:followingUser,
        })
        await queryRunner.connect();
        followingUser.followers = [];
        followingUser.followers.push(newFollower);
        newFollower = await queryRunner.manager.save(newFollower);
        await queryRunner.manager.save(followingUser);
        console.log(newFollower);
        return response.status(StatusCodes.OK).json({message:`You started following ${newFollower.following.name}`});

    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


const getProfile = async(request:Request,response:Response) => {

    let profileUserId = request.params.userId;
    try{
        let userRepository = connection.getRepository(User);
        let profile = await  userRepository.findOne({where:{id:profileUserId}});
        if(profile !=undefined && profile.isProfilePublic){   
                let orderRepository = connection.getRepository(Orders);
                profile.orders = await orderRepository.find({where:{orderedBy:profile},relations:['item']});
                profile.orders = profile.orders.filter(filterPrivateOrders);
                if(profile.orders.length == 0)
                profile.orders = null;
                return response.status(StatusCodes.OK).json({profile})
        }
      throw new CodeBrewingApiException("Profile not found",StatusCodes.NOT_FOUND);

    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }

}

const filterPrivateOrders = (order:Orders) =>{
    return order.isPublic;
}


export{
    getUser,
    followUser,
    getProfile
}