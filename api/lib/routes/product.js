"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express = require("express");
const category_1 = require("../controllers/products/category");
const items_1 = require("../controllers/products/items");
const validators_1 = require("../utils/validators");
const productRouter = express.Router();
exports.productRouter = productRouter;
productRouter.post('/', validators_1.addCategoryValidator, category_1.addCategory);
productRouter.get('/', category_1.getCategorys);
productRouter.post('/:categoryId/items', validators_1.addItemValidator, items_1.additems);
productRouter.get('/:categoryId/items', items_1.getItems);
