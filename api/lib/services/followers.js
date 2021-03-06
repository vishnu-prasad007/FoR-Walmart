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
exports.getFollowingUsersList = exports.getFollowingUsers = exports.getUserFollowersEmailAddressPhoneNo = void 0;
const connection_1 = require("../config/connection");
const authentication_1 = require("../models/authentication");
const follower_1 = require("../models/follower");
const user_1 = require("../models/user");
const getUserFollowersEmailAddressPhoneNo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = connection_1.connection.getRepository(user_1.User);
    let userAuthenticationRepository = connection_1.connection.getRepository(authentication_1.UserAuthentication);
    let followUserRepository = connection_1.connection.getRepository(follower_1.Follower);
    let follower = yield followUserRepository.query(`SELECT * FROM follower WHERE followingId = ${user.id}`);
    let userT = yield userRepository.findOne({ where: { id: follower[0].followedById } });
    // console.log(follower[0].followedById);
    let userEmail = yield userAuthenticationRepository.findOne({ where: { user: userT } });
    // console.log(userEmail.emailPhoneNo);
    return userEmail.emailPhoneNo;
});
exports.getUserFollowersEmailAddressPhoneNo = getUserFollowersEmailAddressPhoneNo;
const getFollowingUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = connection_1.connection.getRepository(user_1.User);
    let followUserRepository = connection_1.connection.getRepository(follower_1.Follower);
    let follower = yield followUserRepository.query(`SELECT * FROM follower WHERE followedById = ${userId}`);
    let userT = yield userRepository.findOne({ where: { id: follower[0].followingId } });
    return userT;
});
exports.getFollowingUsers = getFollowingUsers;
const getFollowingUsersList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let userList = [];
    let userRepository = connection_1.connection.getRepository(user_1.User);
    let followUserRepository = connection_1.connection.getRepository(follower_1.Follower);
    let follower = yield followUserRepository.query(`SELECT * FROM follower WHERE followedById = ${userId}`);
    // let userT = await userRepository.findOne({where:{id:follower[0].followingId}});
    for (let index = 0; index < follower.length; index++) {
        let user = yield userRepository.findOne({ where: { id: follower[index].followingId } });
        if (user != null || user != undefined)
            userList.push(user);
    }
    return userList;
});
exports.getFollowingUsersList = getFollowingUsersList;
