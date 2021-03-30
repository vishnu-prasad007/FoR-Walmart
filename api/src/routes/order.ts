import express = require('express');
import { addOrder, getOrders } from '../controllers/products/orders';
import { verifyAccessToken } from '../services/tokens';

const orderRouter = express.Router();


orderRouter.post('/',verifyAccessToken,addOrder);
orderRouter.get('/',verifyAccessToken,getOrders);


export {
    orderRouter
}