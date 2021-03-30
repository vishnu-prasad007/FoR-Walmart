import {PrimaryGeneratedColumn,Entity,CreateDateColumn, ManyToOne, ManyToMany, Column, JoinColumn} from 'typeorm';
import { User } from '../user';
import { Category } from './category';
import { Item } from './items';

@Entity()
export class Orders {
    
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    createdAt:Date;

    @ManyToOne(()=>User,user => user.orders)
    orderedBy:User;
    
    @ManyToOne(()=>Category,category => category.orders)
    category: Category;

    @ManyToOne(()=>Item,item => item.orders)
    item: Item; 

    @Column({type:"boolean",default:false})
    isPublic:boolean
}