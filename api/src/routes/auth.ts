import express = require('express');
import { login,signup } from '../controllers/authenticationController';
import {loginValidator, signupValidator, validate} from "../utils/validators";

const authRouter = express.Router();


authRouter.post('/login',loginValidator,login);
authRouter.post('/signup',validate(signupValidator),signup);


export {
    authRouter
}