import {Request,Response} from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {connection, queryRunner} from '../../config/connection';
import { Item } from '../../models/products/items';
import { Orders } from '../../models/products/order';
import { User } from '../../models/user';
import { CodeBrewingApiException } from '../../utils/exception';


const addOrder = async(request:Request,response:Response) =>{
    let orderedUserId = response.locals.userId;
    let orderItemId = request.body.itemId;
    try {

        let [orderRepository,userRespository,itemRepository] = await Promise.all([
            connection.getRepository(Orders),
            connection.getRepository(User),
            connection.getRepository(Item)
        ]);



        let [orderedUser,orderedItem] = await Promise.all([
            userRespository.findOne({where:{id:orderedUserId}}),
            itemRepository.findOne({where:{id:orderItemId},relations:['category']})
        ]);

        let newOrder = orderRepository.create({
            orderedBy : orderedUser,
            item : orderedItem,
            category : orderedItem.category,
        });

        await queryRunner.connect();
        newOrder = await queryRunner.manager.save(newOrder);
        console.log(newOrder);
        return response.status(StatusCodes.CREATED).json({message:"Your order is placed","orderId":newOrder.id});

    } catch(error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
          return  response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
          return  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


const getOrders = async (request:Request,response:Response) => {
    let requestedUserId = response.locals.userId;

    try{
        let [orderRepository,userRespository] = await Promise.all([
            connection.getRepository(Orders),
            connection.getRepository(User),
        ]);
        let orderedUser = await userRespository.findOne({where:{id:requestedUserId}});
        let orders = await orderRepository.find({where:{orderedBy:orderedUser},relations:['item']});
        console.log(orders);
        if(orders.length == 0) {
            throw new CodeBrewingApiException("You don't have any orders",StatusCodes.NOT_FOUND);            
        }
        return response.status(StatusCodes.OK).json(orders);


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
    addOrder,
    getOrders
}
