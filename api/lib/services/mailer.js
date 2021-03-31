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
exports.sendmail = void 0;
const nodemailer = require("nodemailer");
function sendmail(toemailAddress, subject, text) {
    return __awaiter(this, void 0, void 0, function* () {
        var fromUser = 'ting.bing.test@gmail.com';
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "ting.bing.test@gmail.com",
                pass: "Ting@123",
            },
        });
        let info = yield transporter.sendMail({
            from: fromUser,
            to: toemailAddress,
            subject: subject,
            text: text, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
exports.sendmail = sendmail;
