"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express = require("express");
const category_1 = require("../controllers/products/category");
const validators_1 = require("../utils/validators");
const categoryRouter = express.Router();
exports.categoryRouter = categoryRouter;
categoryRouter.post('/', validators_1.addCategoryValidator, category_1.addCategory);
categoryRouter.get('/', category_1.getCategorys);
