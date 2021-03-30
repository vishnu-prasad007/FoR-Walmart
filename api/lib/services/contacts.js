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
exports.findMatchedUser = void 0;
const connection_1 = require("../config/connection");
const authentication_1 = require("../models/authentication");
const findMatchedUser = (contacts) => __awaiter(void 0, void 0, void 0, function* () {
    let userAuthenticationRespository = connection_1.connection.getRepository(authentication_1.UserAuthentication);
    let matchedUsers = [];
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        let userAuthentication = yield userAuthenticationRespository.findOne({ where: { emailPhoneNo: contact.phoneEmail, }, relations: ['user'] });
        if (userAuthentication != null || userAuthentication != undefined) {
            matchedUsers.push(userAuthentication.user);
        }
    }
    return matchedUsers;
});
exports.findMatchedUser = findMatchedUser;
