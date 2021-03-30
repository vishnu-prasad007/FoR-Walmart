import {connection} from '../config/connection';
import { UserAuthentication } from '../models/authentication';
import { User } from '../models/user';


interface Contact{
    emailPhoneNo:string
}

const findMatchedUser = async (user:User,contacts:Contact[]) => {

        let userAuthenticationRespository = await connection.getRepository(UserAuthentication);
        let matchedUsers:User[];
        contacts.forEach(async (contact)=>{
            let userAuthentication = await userAuthenticationRespository.findOne({where:{emailPhoneNo:contact.emailPhoneNo}});
            if(userAuthentication != null || userAuthentication != undefined) {
                matchedUsers.push(userAuthentication.user);
            }
        });
}