import {Request,Response} from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {connection, queryRunner} from '../../config/connection';
import { Category } from '../../models/products/category';
import { Item } from '../../models/products/items';
import { CodeBrewingApiException } from '../../utils/exception';

const getItems = async(request:Request,response:Response)  =>{ 
    let categoryId = request.params.categoryId;
    try{
        const [itemRepository,categoryRepository] = await Promise.all([connection.getRepository(Item),connection.getRepository(Category)])
        let category = await categoryRepository.find({where:{id:categoryId}});
        if(category.length == 0)
            throw new CodeBrewingApiException("No category found",StatusCodes.NOT_FOUND);
        let items = await itemRepository.find({where:{category:category[0].id}});
        if(items.length == 0)
            throw new CodeBrewingApiException("No items found",StatusCodes.NOT_FOUND);
        return response.status(StatusCodes.OK).json({products:items});

    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
          return  response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
          return  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}

const additems = async(request:Request,response:Response) => {
    let categoryId = request.params.categoryId;
    let itemName = request.body.itemName;
    let price = request.body.price;
    let description = request.body.description;
    let ratings = request.body.ratings;
    let pictureLink = request.body.pictureLink;
    console.log("ItemName" + itemName);

    try{
        const [itemRepository,categoryRepository] = await Promise.all([connection.getRepository(Item),connection.getRepository(Category)])
        let parentCategory = await categoryRepository.findOne({where:{id:categoryId}});
        
        let newItem = itemRepository.create({
            name:itemName,
            price:price,
            description:description,
            ratings:ratings,
            pictureLink:pictureLink,
            category:parentCategory
        });

        await queryRunner.connect();
        await queryRunner.manager.save(newItem);
        return response.status(StatusCodes.CREATED).json({message:"item added successfully"});

    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
          return  response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
          return  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


export {
    additems,
    getItems
}