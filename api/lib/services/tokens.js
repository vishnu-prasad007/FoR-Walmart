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
exports.verifyAccessToken = exports.createAcessToken = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt = require("jsonwebtoken");
const exception_1 = require("../utils/exception");
// const createAuthTokens = async(userId:number) =>{
//     const accessToken = jwt.sign({userId:userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10d"});
// }
const ACCESS_TOKEN_SECRET = "jfgvjkdfhg4567489671324%^&*90009584+-.?']|jnfjhg578900!@#f%^h*())jg";
/**
 * Creates access token
 * @param userId User id
 */
const createAcessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "10d" });
});
exports.createAcessToken = createAcessToken;
const verifyAccessToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = request.headers['authorization'];
    if (accessToken == undefined || accessToken == null || accessToken == "")
        throw new exception_1.CodeBrewingApiException(http_status_codes_1.ReasonPhrases.UNAUTHORIZED + 'access', http_status_codes_1.StatusCodes.UNAUTHORIZED);
    try {
        const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        response.locals.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        if (error instanceof exception_1.CodeBrewingApiException) {
            return response.status(error.HttpStatusCode).json({ message: error.message });
        }
        else {
            return response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: http_status_codes_1.ReasonPhrases.UNAUTHORIZED + ' access' });
        }
    }
});
exports.verifyAccessToken = verifyAccessToken;
