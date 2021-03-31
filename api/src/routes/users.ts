import express = require('express');
import { switchProfileToPublic } from '../controllers/share';
import { followUser, getFollowingUsers, getProfile, getUser } from '../controllers/user/user';
import {verifyAccessToken} from '../services/tokens';

const userRouter = express.Router();

userRouter.get('/me',verifyAccessToken,getUser)
userRouter.get('/profile/:userId',verifyAccessToken,getProfile);
userRouter.post('/:followingUserId/follow',verifyAccessToken,followUser);
userRouter.post('/profile-switch',verifyAccessToken,switchProfileToPublic);
userRouter.get('/me/following',verifyAccessToken,getFollowingUsers);

export {
    userRouter
}