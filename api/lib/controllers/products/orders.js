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
exports.getOrders = exports.addOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const connection_1 = require("../../config/connection");
const items_1 = require("../../models/products/items");
const order_1 = require("../../models/products/order");
const user_1 = require("../../models/user");
const exception_1 = require("../../utils/exception");
const addOrder = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let orderedUserId = response.locals.userId;
    let orderItemId = request.body.itemId;
    try {
        let [orderRepository, userRespository, itemRepository] = yield Promise.all([
            connection_1.connection.getRepository(order_1.Orders),
            connection_1.connection.getRepository(user_1.User),
            connection_1.connection.getRepository(items_1.Item)
        ]);
        let [orderedUser, orderedItem] = yield Promise.all([
            userRespository.findOne({ where: { id: orderedUserId } }),
            itemRepository.findOne({ where: { id: orderItemId }, relations: ['category'] })
        ]);
        let newOrder = orderRepository.create({
            orderedBy: orderedUser,
            item: orderedItem,
            category: orderedItem.category,
        });
        yield connection_1.queryRunner.connect();
        newOrder = yield connection_1.queryRunner.manager.save(newOrder);
        console.log(newOrder);
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "Your order is placed", "orderId": newOrder.id });
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
exports.addOrder = addOrder;
const getOrders = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let requestedUserId = response.locals.userId;
    try {
        let [orderRepository, userRespository] = yield Promise.all([
            connection_1.connection.getRepository(order_1.Orders),
            connection_1.connection.getRepository(user_1.User),
        ]);
        let orderedUser = yield userRespository.findOne({ where: { id: requestedUserId } });
        let orders = yield orderRepository.find({ where: { orderedBy: orderedUser }, relations: ['item'] });
        console.log(orders);
        if (orders.length == 0) {
            throw new exception_1.CodeBrewingApiException("You don't have any orders", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json(orders);
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
exports.getOrders = getOrders;
