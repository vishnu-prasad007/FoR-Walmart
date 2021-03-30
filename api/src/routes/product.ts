import express = require('express');
import { addCategory,getCategorys } from '../controllers/products/category';
import { additems, getItems } from '../controllers/products/items';
import { verifyAccessToken } from '../services/tokens';
import { addCategoryValidator, addItemValidator } from '../utils/validators';

const productRouter = express.Router();


productRouter.post('/',addCategoryValidator,addCategory);
productRouter.get('/',getCategorys)
productRouter.post('/:categoryId/items',addItemValidator,additems)
productRouter.get('/:categoryId/items',getItems);



export {
    productRouter
}