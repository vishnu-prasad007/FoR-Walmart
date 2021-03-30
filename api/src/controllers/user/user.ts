import {request, Request,Response} from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import{connection,queryRunner} from '../../config/connection';
import { Follower } from '../../models/follower';
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
    let followingUserId = request.body.followingUserId;

    try {
        let userRespository = connection.getRepository(User);
        let followUserRepository = connection.getRepository(Follower);

        let [follower,followingUser] = await Promise.all([
            userRespository.findOne({where:{id:userId}}),
            userRespository.findOne({where:{id:followingUserId}})
        ]);

        let newFollower = followUserRepository.create({
            followedBy:follower,
            following:followingUser
        })
        await queryRunner.connect();
        newFollower = await queryRunner.manager.save(newFollower);
        followingUser.followers.push(newFollower);
        

    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


export{
    getUser,
    followUser
}