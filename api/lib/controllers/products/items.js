"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = exports.additems = void 0;
const http_status_codes_1 = require("http-status-codes");
const connection_1 = require("../../config/connection");
const category_1 = require("../../models/products/category");
const items_1 = require("../../models/products/items");
const exception_1 = require("../../utils/exception");
const getItems = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryId = request.params.categoryId;
    try {
        const [itemRepository, categoryRepository] = yield Promise.all([connection_1.connection.getRepository(items_1.Item), connection_1.connection.getRepository(category_1.Category)]);
        let category = yield categoryRepository.find({ where: { id: categoryId } });
        if (category.length == 0)
            throw new exception_1.CodeBrewingApiException("No category found", http_status_codes_1.StatusCodes.NOT_FOUND);
        let items = yield itemRepository.find({ where: { category: category[0].id } });
        if (items.length == 0)
            throw new exception_1.CodeBrewingApiException("No items found", http_status_codes_1.StatusCodes.NOT_FOUND);
        return response.status(http_status_codes_1.StatusCodes.OK).json({ products: items });
    }
    catch (error) {
        console.log(error);
        if (error instanceof exception_1.CodeBrewingApiException) {
            return response.status(error.HttpStatusCode).json({ message: error.message });
        }
        else {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
});
exports.getItems = getItems;
const additems = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryId = request.params.categoryId;
    let itemName = request.body.itemName;
    let price = request.body.price;
    let description = request.body.description;
    let ratings = request.body.ratings;
    let pictureLink = request.body.pictureLink;
    console.log("ItemName" + itemName);
    try {
        const [itemRepository, categoryRepository] = yield Promise.all([connection_1.connection.getRepository(items_1.Item), connection_1.connection.getRepository(category_1.Category)]);
        let parentCategory = yield categoryRepository.findOne({ where: { id: categoryId } });
        let newItem = itemRepository.create({
            name: itemName,
            price: price,
            description: description,
            ratings: ratings,
            pictureLink: pictureLink,
            category: parentCategory
        });
        yield connection_1.queryRunner.connect();
        yield connection_1.queryRunner.manager.save(newItem);
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "item added successfully" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof exception_1.CodeBrewingApiException) {
            return response.status(error.HttpStatusCode).json({ message: error.message });
        }
        else {
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
});
exports.additems = additems;
