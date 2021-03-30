import {Column,Entity,JoinColumn,ManyToMany,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user';

@Entity()
export class Follower {
    
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,User=>User.followedBy)
    followedBy:User

    @ManyToMany(type=>User,user =>user.followers)
    @JoinColumn()
    following:User
}