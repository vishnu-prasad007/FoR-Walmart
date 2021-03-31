import { createQueryBuilder } from 'typeorm';
import { connection } from '../config/connection';
import { UserAuthentication } from '../models/authentication';
import { Follower } from '../models/follower';
import { User } from '../models/user';


const getUserFollowersEmailAddressPhoneNo = async (user: User) => {
    let userRepository = connection.getRepository(User);
    let userAuthenticationRepository = connection.getRepository(UserAuthentication);
    let followUserRepository = connection.getRepository(Follower);
     let follower = await followUserRepository.query(`SELECT * FROM follower WHERE followingId = ${user.id}`);
     let userT = await userRepository.findOne({where:{id:follower[0].followedById}});
   // console.log(follower[0].followedById);
    let userEmail = await userAuthenticationRepository.findOne({where:{user:userT}});
   // console.log(userEmail.emailPhoneNo);
   return userEmail.emailPhoneNo;
}


export {
    getUserFollowersEmailAddressPhoneNo
}