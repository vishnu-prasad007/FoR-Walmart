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
exports.switchProfileToPublic = exports.shareOrder = exports.shareTerms = exports.agreeToTerms = void 0;
const http_status_codes_1 = require("http-status-codes");
const connection_1 = require("../config/connection");
const order_1 = require("../models/products/order");
const user_1 = require("../models/user");
const contacts_1 = require("../services/contacts");
const followers_1 = require("../services/followers");
const mailer_1 = require("../services/mailer");
const exception_1 = require("../utils/exception");
const story_1 = require("./story");
const Profile_Private_To_Public = 2001;
const Happy_Sharing = 2000;
const Agree_To_T_C = 4000;
const shareTerms = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var shareUserId = response.locals.userId;
    var orderId = request.body.orderId;
    try {
        let userRespository = yield connection_1.connection.getRepository(user_1.User);
        var shareUser = yield userRespository.findOne({ where: { id: shareUserId } });
        if (shareUser.termsandConditionStatus) {
            // user agreed to T&C 
            if (!shareUser.isProfilePublic) {
                // if user profile is not public switch user profile from private to public
                // shareUser.isProfilePublic = true;
                // await queryRunner.connect();
                // shareUser = await queryRunner.manager.save(shareUser);
                return response.status(http_status_codes_1.StatusCodes.OK).json({ message: "Your profile is private, by clicking share we switch your profile to public", errorCode: Profile_Private_To_Public });
            }
            else {
                yield shareOrderBackground(shareUserId, orderId);
                return response.status(http_status_codes_1.StatusCodes.OK).json({ message: "Happy sharing", errorCode: Happy_Sharing });
            }
        }
        else {
            // user not aggred to T&C
            return response.status(http_status_codes_1.StatusCodes.OK).json({ message: "In order to proceed further, you need to agree to our Terms & Conditions", errorCode: Agree_To_T_C });
        }
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
exports.shareTerms = shareTerms;
const agreeToTerms = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = response.locals.userId;
    var contacts = request.body.contacts;
    try {
        let userRespository = yield connection_1.connection.getRepository(user_1.User);
        var user = yield userRespository.findOne({ where: { id: userId } });
        var c = contactList(contacts);
        var followingUserList = yield followers_1.getFollowingUsersList(userId);
        let musers = yield contacts_1.findMatchedUser(c, followingUserList);
        musers = musers.filter(filterprivateProfile);
        user.termsandConditionStatus = true;
        user.isProfilePublic = true;
        yield connection_1.queryRunner.connect();
        yield connection_1.queryRunner.manager.save(user);
        return response.status(http_status_codes_1.StatusCodes.OK).json({ message: "Thank You", users: musers });
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
exports.agreeToTerms = agreeToTerms;
const shareOrder = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = response.locals.userId;
    var orderId = request.params.order_id;
    try {
        // user Repository
        let userRepository = connection_1.connection.getRepository(user_1.User);
        // order repository
        let orderRepository = connection_1.connection.getRepository(order_1.Orders);
        let sharingUser = yield userRepository.findOne({ where: { id: userId } });
        let sharingOrder = yield orderRepository.findOne({ where: { id: orderId }, relations: ['item'] });
        yield connection_1.queryRunner.connect();
        sharingOrder.isPublic = true;
        sharingOrder = yield connection_1.queryRunner.manager.save(sharingOrder);
        // TODO => now trigger email service for followers
        let followerEmail = yield followers_1.getUserFollowersEmailAddressPhoneNo(sharingUser);
        story_1.addToStory(sharingUser, sharingOrder.item);
        yield mailer_1.sendmail('vishnu007vprasad@gmail.com', 'New order from your friend', 'Vishnu has bought something new');
        return response.status(http_status_codes_1.StatusCodes.OK).json({ message: "Your order shared with your friends/followers" });
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
exports.shareOrder = shareOrder;
const shareOrderBackground = (userId, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    // user Repository
    let userRepository = connection_1.connection.getRepository(user_1.User);
    // order repository
    let orderRepository = connection_1.connection.getRepository(order_1.Orders);
    let sharingUser = yield userRepository.findOne({ where: { id: userId } });
    let sharingOrder = yield orderRepository.findOne({ where: { id: orderId }, relations: ['item'] });
    yield connection_1.queryRunner.connect();
    sharingOrder.isPublic = true;
    sharingOrder = yield connection_1.queryRunner.manager.save(sharingOrder);
    // TODO => now trigger email service for followers
    let followerEmail = yield followers_1.getUserFollowersEmailAddressPhoneNo(sharingUser);
    story_1.addToStory(sharingUser, sharingOrder.item);
    yield mailer_1.sendmail('vishnu007vprasad@gmail.com', 'New order from your friend', 'Vishnu has bought something new');
});
const switchProfileToPublic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = response.locals.userId;
    try {
        // user Repository
        let userRepository = connection_1.connection.getRepository(user_1.User);
        var shareUser = yield userRepository.findOne({ where: { id: userId } });
        shareUser.isProfilePublic = true;
        yield connection_1.queryRunner.connect();
        yield connection_1.queryRunner.manager.save(shareUser);
        return response.status(http_status_codes_1.StatusCodes.OK).json({ message: "Profile Switched to public" });
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
exports.switchProfileToPublic = switchProfileToPublic;
const contactList = (contacts) => {
    return JSON.parse(contacts);
};
const filterprivateProfile = (user) => {
    return user.isProfilePublic;
};
