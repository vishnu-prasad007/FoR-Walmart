import {Request,Response} from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {connection, queryRunner} from '../config/connection';
import { Item } from '../models/products/items';
import { Story } from '../models/story';
import { User } from '../models/user';
import { getFollowingUsers } from '../services/followers';
import { CodeBrewingApiException } from '../utils/exception';

const addToStory = async(user:User,item:Item) =>{
    
    let storyRepository = connection.getRepository(Story);
    let newStory = storyRepository.create({
        user:user,
        item:item
    });
    await queryRunner.connect();
    newStory = await queryRunner.manager.save(newStory);
}



const getStory = async(request:Request,response:Response) =>{

    let userId = response.locals.userId;
    try {
        let user = await getFollowingUsers(userId);
        let storyRepository = connection.getRepository(Story);
        let stories = await storyRepository.find({where:{user:user},relations:['item','user']});
        if(stories.length == 0)
        return response.status(StatusCodes.NOT_FOUND).json({message:"No stories found"});
        else {
            return response.status(StatusCodes.OK).json({data:stories});
        }
    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
            return response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


export {
    addToStory,
    getStory
}