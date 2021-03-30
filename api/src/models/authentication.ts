import {Entity,Column, OneToOne, JoinColumn,PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user';

@Entity()
export class UserAuthentication {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    emailPhoneNo:string

    @Column({type:'varchar'})
    password:string

    @OneToOne(()=>User,user =>user.userAuthentication)
    @JoinColumn()
    user: User;

}