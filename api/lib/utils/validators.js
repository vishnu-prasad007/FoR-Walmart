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
exports.addOrderValidator = exports.addItemValidator = exports.addCategoryValidator = exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const validate = validations => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(validations.map(validation => validation.run(req)));
        const errors = express_validator_1.validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    });
};
exports.validate = validate;
const loginValidator = (request, response, next) => {
    var emailPhoneNo = request.body.emailPhoneNo;
    let password = request.body.password;
    let fcmDeviceToken = request.body.fcmDeviceToken;
    console.log(emailPhoneNo);
    if (emailPhoneNo == undefined || password == undefined || fcmDeviceToken == undefined) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Invalid email/phone or Password" });
    }
    if ((emailPhoneNo.includes("@") || emailPhoneNo.length == 10) && (password.length > 4)) {
        console.log("success jfhjghj");
        next();
    }
    else {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Invalid email/phone or Password" });
    }
};
exports.loginValidator = loginValidator;
const addCategoryValidator = [
    express_validator_1.check('name').isLength({ min: 2 }),
    express_validator_1.check('pictureLink').isURL()
];
exports.addCategoryValidator = addCategoryValidator;
const addItemValidator = [
    express_validator_1.check('itemName').isLength({ min: 2 }),
    express_validator_1.check('price').isNumeric(),
    express_validator_1.check('description').isLength({ min: 2 }),
    express_validator_1.check('ratings').isNumeric(),
    express_validator_1.check('pictureLink').isURL()
];
exports.addItemValidator = addItemValidator;
const addOrderValidator = [
    express_validator_1.check('itemId').notEmpty().isNumeric()
];
exports.addOrderValidator = addOrderValidator;
const signupValidator = [
    express_validator_1.check('name').isLength({ min: 2 }),
    express_validator_1.check('emailPhoneNo').isLength({ min: 5 }),
    express_validator_1.check('password').isLength({ min: 4 }),
];
exports.signupValidator = signupValidator;
