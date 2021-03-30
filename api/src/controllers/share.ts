import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { connection, queryRunner } from '../config/connection';
import { User } from '../models/user';
import { CodeBrewingApiException } from '../utils/exception';


const Profile_Private_To_Public = 2001;
const Happy_Sharing = 2000;
const Agree_To_T_C = 4000;


const shareTerms = async (request: Request, response: Response) => {

    var shareUserId = response.locals.userId;

    try {

        let userRespository = await connection.getRepository(User);
        var shareUser = await userRespository.findOne({ where: { id: shareUserId } });
        if (shareUser.termsandConditionStatus) {
            // user agreed to T&C 
            if (!shareUser.isProfilePublic) {
                // if user profile is not public switch user profile from private to public
                shareUser.isProfilePublic = true;
                await queryRunner.connect();
                shareUser = await queryRunner.manager.save(shareUser);
                return response.status(StatusCodes.OK).json({ message: "Your profile is private, by clicking next we switch your profile to public", errorCode: Profile_Private_To_Public });
            }
            return response.status(StatusCodes.OK).json({ message: "Happy sharing", errorCode: Happy_Sharing });
        } else {
            // user not aggred to T&C
            return response.status(StatusCodes.OK).json({ message: "In order to proceed further, you need to agree to our Terms & Conditions", errorCode: Agree_To_T_C });
        }

    } catch (error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
            return response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


const agreeToTerms = async (request:Request,response:Response) => {
    var userId = response.locals.userId;
    
    try {
        let userRespository = await connection.getRepository(User);
        var user =  await userRespository.findOne({where:{id:userId}});
        user.termsandConditionStatus = true;
        user.isProfilePublic = true;
        await queryRunner.connect();
        await queryRunner.manager.save(user);
        return response.status(StatusCodes.OK).json({message:"Thank You"});
    } catch(error){
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
            return response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}

export {
    agreeToTerms,
    shareTerms,
}