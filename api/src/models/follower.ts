import {Column,Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user';

@Entity()
export class Follower {
    
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,User=>User.followedBy)
    followedBy:User

    @ManyToOne(type=>User,user =>user.followers)
    @JoinTable()
    following:User
}