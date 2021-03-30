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
exports.notifyUsers = void 0;
const firebase_admin_1 = require("firebase-admin");
const fcm = firebase_admin_1.messaging();
const notifyUsers = (deviceTokens, payload) => __awaiter(void 0, void 0, void 0, function* () {
    fcm.sendToDevice(deviceTokens, payload);
});
exports.notifyUsers = notifyUsers;
