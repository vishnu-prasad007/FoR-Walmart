"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const user_1 = require("../controllers/user/user");
const tokens_1 = require("../services/tokens");
const userRouter = express.Router();
exports.userRouter = userRouter;
userRouter.get('/me', tokens_1.verifyAccessToken, user_1.getUser);
