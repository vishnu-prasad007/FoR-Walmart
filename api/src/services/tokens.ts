import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import jwt = require('jsonwebtoken');
import { CodeBrewingApiException } from '../utils/exception';
import { Request, RequestHandler, Response } from 'express'

// const createAuthTokens = async(userId:number) =>{
//     const accessToken = jwt.sign({userId:userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10d"});
// }


const ACCESS_TOKEN_SECRET = "jfgvjkdfhg4567489671324%^&*90009584+-.?']|jnfjhg578900!@#f%^h*())jg"

/**
 * Creates access token 
 * @param userId User id
 */
const createAcessToken = async(userId:number) =>{
    return jwt.sign({userId:userId},ACCESS_TOKEN_SECRET,{expiresIn:"10d"});
}


const verifyAccessToken = async(request:Request,response:Response,next) => {
    const accessToken = request.headers['authorization'];
    if(accessToken == undefined || accessToken == null || accessToken == "")
        throw new CodeBrewingApiException(ReasonPhrases.UNAUTHORIZED + 'access',StatusCodes.UNAUTHORIZED);
    try {
        const decodedToken:any = jwt.verify(accessToken,ACCESS_TOKEN_SECRET);
        response.locals.userId = decodedToken.userId;
        next()
    } catch (error) {
        if(error instanceof CodeBrewingApiException){
            return response.status(error.HttpStatusCode).json({message:error.message});
        } else {
            return response.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED + ' access' });
        }
    }
}

export{
    createAcessToken,
    verifyAccessToken
}