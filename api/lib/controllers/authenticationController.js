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
exports.signup = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const typeorm_1 = require("typeorm");
const authentication_1 = require("../models/authentication");
const user_1 = require("../models/user");
const tokens_1 = require("../services/tokens");
const exception_1 = require("../utils/exception");
const connection = typeorm_1.getConnection();
const queryRunner = connection.createQueryRunner();
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside login controller");
    var emailPhoneNo = request.body.emailPhoneNo;
    var password = request.body.password;
    try {
        // get UserAuthentication Repository
        let userAuthenticationRepository = connection.getRepository(authentication_1.UserAuthentication);
        var user = yield userAuthenticationRepository.findOne({ where: { emailPhoneNo: emailPhoneNo, password: password }, relations: ["user"] });
        if (user == undefined || user == null)
            throw new exception_1.CodeBrewingApiException("Invalid Email/PhoneNo or Password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        console.log(user.user);
        console.log(`User id ${user.user}`);
        const accessToken = yield tokens_1.createAcessToken(user.user.id);
        return response.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Login Successful",
            data: {
                userId: user.user.id,
                accessToken: accessToken
            }
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
exports.login = login;
const signup = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var emailPhoneNo = request.body.emailPhoneNo;
    var name = request.body.name;
    var password = request.body.password;
    try {
        // get UserAuthentication Repository
        let userAuthenticationRepository = connection.getRepository(authentication_1.UserAuthentication);
        // get User Repository
        let userRepository = connection.getRepository(user_1.User);
        // find by emailPhoneNo
        const user = yield userAuthenticationRepository.findOne({ where: { emailPhoneNo: emailPhoneNo } });
        if (user == undefined || user == null) {
            let newuser = userRepository.create({
                name: name,
            });
            var newUserAuthentication = userAuthenticationRepository.create({
                emailPhoneNo: emailPhoneNo,
                password: password,
            });
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            newuser = yield queryRunner.manager.save(newuser);
            console.log(newuser);
            newUserAuthentication.user = newuser;
            console.log(newUserAuthentication.user);
            yield queryRunner.manager.save(newUserAuthentication);
            yield queryRunner.commitTransaction();
            return response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "User created Successfully" });
        }
        else {
            throw new exception_1.CodeBrewingApiException("User already exist with this Email/PhoneNo", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
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
exports.signup = signup;
