import express = require('express');
import { getProfile, getUser } from '../controllers/user/user';
import {verifyAccessToken} from '../services/tokens';

const userRouter = express.Router();

userRouter.get('/me',verifyAccessToken,getUser)
userRouter.get('/profile/:userId',verifyAccessToken,getProfile);


export {
    userRouter
}