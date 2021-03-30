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
exports.getCategorys = exports.addCategory = void 0;
const connection_1 = require("../../config/connection");
const category_1 = require("../../models/products/category");
const http_status_codes_1 = require("http-status-codes");
const exception_1 = require("../../utils/exception");
const constants_1 = require("../../utils/constants");
const addCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var categoryName = request.body.name;
    var pictureLink = request.body.pictureLink;
    try {
        // category repository
        let categoryRepository = yield connection_1.connection.getRepository(category_1.Category);
        let newCateory = categoryRepository.create({
            name: categoryName,
            pictureLink: pictureLink
        });
        yield connection_1.queryRunner.connect();
        newCateory = yield connection_1.queryRunner.manager.save(newCateory);
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "Category added successfully",
            addItems: constants_1.BASE_URL + constants_1.CATEGORY_ENDPOINT + '/' + newCateory.id
        });
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
exports.addCategory = addCategory;
const getCategorys = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryRepository = yield connection_1.connection.getRepository(category_1.Category);
        let categories = yield categoryRepository.find();
        if (categories.length == 0)
            throw new exception_1.CodeBrewingApiException("No categorys found", http_status_codes_1.StatusCodes.NOT_FOUND);
        return response.status(http_status_codes_1.StatusCodes.OK).json({ categories: categories });
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
exports.getCategorys = getCategorys;
