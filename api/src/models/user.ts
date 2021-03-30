import { type } from 'node:os';
import{Entity,Column,PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm'
import { UserAuthentication } from './authentication';
import { Follower } from './follower';
import { Orders } from './products/order';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    name:string

    @OneToOne(()=>UserAuthentication,userAuthentication => userAuthentication.user)
    userAuthentication:UserAuthentication;

    @OneToMany(() =>Orders,order =>order.orderedBy)
    orders: Orders[]

    @Column({type:"boolean",default:false})
    termsandConditionStatus:boolean

    @Column({type:"boolean",default:false})
    isProfilePublic:boolean

    @OneToMany(()=>Follower,follower=>follower.followedBy)
    followedBy:Follower;

    @OneToMany(type=>Follower,follower => follower.following)
    followers:Follower[];
}