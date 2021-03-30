import {connection,queryRunner} from '../../config/connection';
import {Request,Response} from 'express';
import { Category } from '../../models/products/category';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CodeBrewingApiException } from '../../utils/exception';
import {BASE_URL,CATEGORY_ENDPOINT} from '../../utils/constants';

const addCategory = async(request:Request,response:Response) =>{
 
    var categoryName = request.body.name;
    var pictureLink = request.body.pictureLink;

    try {
        // category repository
        let categoryRepository = await connection.getRepository(Category);

        let newCateory = categoryRepository.create({
            name:categoryName,
            pictureLink:pictureLink
        });

        await queryRunner.connect();
        newCateory = await queryRunner.manager.save(newCateory);
        return response.status(StatusCodes.CREATED).json({message:"Category added successfully",
            addItems:BASE_URL+CATEGORY_ENDPOINT+'/'+newCateory.id
            });

    } catch (error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
          return  response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
          return  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


const getCategorys = async(request:Request,response:Response) =>{
        try {
            let categoryRepository = await connection.getRepository(Category);
            let categories = await categoryRepository.find();
            if(categories.length == 0)
                throw new CodeBrewingApiException("No categorys found",StatusCodes.NOT_FOUND);
            return response.status(StatusCodes.OK).json({categories:categories});

        } catch(error) {
            console.log(error);
        if (error instanceof CodeBrewingApiException) {
          return  response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
          return  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
        }

}

export{
    addCategory,
    getCategorys
}