import{Request,Response} from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {getConnection} from 'typeorm'
import { UserAuthentication } from '../models/authentication';
import { User } from '../models/user';
import { createAcessToken } from '../services/tokens';
import { CodeBrewingApiException } from '../utils/exception';

const connection = getConnection();
const queryRunner = connection.createQueryRunner();

const login = async(request:Request,response:Response) =>{
    console.log("inside login controller");
    var emailPhoneNo = request.body.emailPhoneNo;
    var password = request.body.password;
    var fcmDeviceToken = request.body.fcmDeviceToken

    try {
        // get UserAuthentication Repository
        let userAuthenticationRepository = connection.getRepository(UserAuthentication);

        var user = await userAuthenticationRepository.findOne({where:{emailPhoneNo:emailPhoneNo,password:password},relations:["user"]});

        if(user == undefined || user == null)
            throw new CodeBrewingApiException("Invalid Email/PhoneNo or Password",StatusCodes.UNAUTHORIZED);
            console.log(user.user);
        console.log(`User id ${user.user}`);

        const accessToken = await createAcessToken(user.user.id);
        await queryRunner.connect();
        user.fcmDeviceToken = fcmDeviceToken;
        user = await queryRunner.manager.save(user);
        return response.status(StatusCodes.OK).json({
            message:"Login Successful",
            data:{
                userId:user.user.id,
                accessToken:accessToken
            }
        });

    } catch (error) {
        console.log(error);
        if (error instanceof CodeBrewingApiException) {
          return  response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
           return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}


const signup = async(request:Request,response:Response) =>{
    
    var emailPhoneNo = request.body.emailPhoneNo;
    var name = request.body.name;
    var password = request.body.password;
    try{

        // get UserAuthentication Repository
        let userAuthenticationRepository = connection.getRepository(UserAuthentication);

        // get User Repository
        let userRepository = connection.getRepository(User);

        // find by emailPhoneNo
        const user = await userAuthenticationRepository.findOne({where:{emailPhoneNo:emailPhoneNo}});
        if(user == undefined || user == null){
          let newuser = userRepository.create({
            name:name,
          });
          var newUserAuthentication = userAuthenticationRepository.create({
            emailPhoneNo:emailPhoneNo,
            password:password,
          })

          await queryRunner.connect();
          await queryRunner.startTransaction();
          newuser = await queryRunner.manager.save(newuser);
          console.log(newuser);
          newUserAuthentication.user = newuser;
          console.log(newUserAuthentication.user);
          await queryRunner.manager.save(newUserAuthentication);
          await queryRunner.commitTransaction();
          return response.status(StatusCodes.CREATED).json({message:"User created Successfully"});
        } else {
            throw new CodeBrewingApiException("User already exist with this Email/PhoneNo",StatusCodes.BAD_REQUEST);
        }

    } catch(error) {
        if (error instanceof CodeBrewingApiException) {
            response.status(error.HttpStatusCode).json({ message: error.message });
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}

export {
    login,
    signup
}