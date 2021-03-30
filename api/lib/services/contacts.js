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
const connection_1 = require("../config/connection");
const authentication_1 = require("../models/authentication");
const findMatchedUser = (user, contacts) => __awaiter(void 0, void 0, void 0, function* () {
    let userAuthenticationRespository = yield connection_1.connection.getRepository(authentication_1.UserAuthentication);
    let matchedUsers;
    contacts.forEach((contact) => __awaiter(void 0, void 0, void 0, function* () {
        let userAuthentication = yield userAuthenticationRespository.findOne({ where: { emailPhoneNo: contact.emailPhoneNo } });
        if (userAuthentication != null || userAuthentication != undefined) {
            matchedUsers.push(userAuthentication.user);
        }
    }));
});
