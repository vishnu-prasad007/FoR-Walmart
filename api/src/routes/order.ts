import express = require('express');
import { addOrder, getOrders } from '../controllers/products/orders';
import { shareOrder } from '../controllers/share';
import { verifyAccessToken } from '../services/tokens';

const orderRouter = express.Router();


orderRouter.post('/',verifyAccessToken,addOrder);
orderRouter.get('/',verifyAccessToken,getOrders);
orderRouter.post('/:order_id/share',verifyAccessToken,shareOrder);


export {
    orderRouter
}