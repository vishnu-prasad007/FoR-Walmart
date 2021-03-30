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
exports.getProfile = exports.followUser = exports.getUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const connection_1 = require("../../config/connection");
const follower_1 = require("../../models/follower");
const order_1 = require("../../models/products/order");
const user_1 = require("../../models/user");
const exception_1 = require("../../utils/exception");
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield connection_1.connection.getRepository(user_1.User).find({ where: { id: response.locals.userId } });
        if (user) {
            // user exist return back
            return response.status(http_status_codes_1.StatusCodes.OK).json(user[0]);
        }
        throw new exception_1.CodeBrewingApiException("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    catch (error) {
        if (error instanceof exception_1.CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        }
        else {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
});
exports.getUser = getUser;
const followUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = response.locals.userId;
    let followingUserId = request.params.followingUserId;
    console.log(followingUserId);
    try {
        let userRespository = connection_1.connection.getRepository(user_1.User);
        let followUserRepository = connection_1.connection.getRepository(follower_1.Follower);
        let [follower, followingUser] = yield Promise.all([
            userRespository.findOne({ where: { id: userId } }),
            userRespository.findOne({ where: { id: followingUserId } })
        ]);
        console.log(follower);
        console.log(followingUser);
        let newFollower = followUserRepository.create({
            followedBy: follower,
            following: followingUser
        });
        yield connection_1.queryRunner.connect();
        followingUser.followers = [];
        followingUser.followers.push(newFollower);
        newFollower = yield connection_1.queryRunner.manager.save(newFollower);
        console.log(newFollower);
        return response.status(http_status_codes_1.StatusCodes.OK).json({ message: `You started following ${newFollower.following.name}` });
    }
    catch (error) {
        console.log(error);
        if (error instanceof exception_1.CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        }
        else {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
});
exports.followUser = followUser;
const getProfile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let profileUserId = request.params.userId;
    try {
        let userRepository = connection_1.connection.getRepository(user_1.User);
        let profile = yield userRepository.findOne({ where: { id: profileUserId } });
        if (profile != undefined && profile.isProfilePublic) {
            let orderRepository = connection_1.connection.getRepository(order_1.Orders);
            profile.orders = yield orderRepository.find({ where: { orderedBy: profile }, relations: ['item'] });
            profile.orders = profile.orders.filter(filterPrivateOrders);
            if (profile.orders.length == 0)
                profile.orders = null;
            return response.status(http_status_codes_1.StatusCodes.OK).json({ profile });
        }
        throw new exception_1.CodeBrewingApiException("Profile not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    catch (error) {
        console.log(error);
        if (error instanceof exception_1.CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        }
        else {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
});
exports.getProfile = getProfile;
const filterPrivateOrders = (order) => {
    return order.isPublic;
};
