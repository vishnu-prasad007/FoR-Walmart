import{PrimaryGeneratedColumn,Entity, Column, ManyToOne} from 'typeorm';
import { Item } from './products/items';
import { User } from './user';

@Entity()
export class Story {

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>User,user=>user.storys)
    user:User;

    @ManyToOne(()=>Item,item=>item)
    item:Item
}