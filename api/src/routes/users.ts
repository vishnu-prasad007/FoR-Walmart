import express = require('express');
import { getUser } from '../controllers/user/user';
import {verifyAccessToken} from '../services/tokens';

const userRouter = express.Router();

userRouter.get('/me',verifyAccessToken,getUser)


export {
    userRouter
}