import {Request,Response} from 'express';
import {connection, queryRunner} from '../config/connection';
import { Item } from '../models/products/items';
import { Story } from '../models/story';
import { User } from '../models/user';

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
    
}


export {
    addToStory
}