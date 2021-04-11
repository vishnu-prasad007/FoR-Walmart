import {connection} from '../config/connection';
import { UserAuthentication } from '../models/authentication';
import { User } from '../models/user';


interface Contact{
    phoneEmail:string
}

const findMatchedUser = async (contacts:Contact[],users:User[]) => {
        console.log(users);
        let userAuthenticationRespository =  connection.getRepository(UserAuthentication);
        let matchedUsers:User[] = [];

        for (let index = 0; index < contacts.length; index++) {
            const contact = contacts[index];
            let userAuthentication = await userAuthenticationRespository.findOne({where:{emailPhoneNo:contact.phoneEmail,},relations:['user']});
            if((userAuthentication != null || userAuthentication != undefined)) {
                for(var j = 0;j<users.length;j++){
                    if(users[j].id != userAuthentication.id){
                        matchedUsers.push(userAuthentication.user);
                    }
                }
            }
        }
        return matchedUsers;
}

export{ 
    findMatchedUser
}