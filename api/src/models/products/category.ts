import {Column,PrimaryGeneratedColumn,Entity, OneToMany,} from 'typeorm';
import { Item } from './items';
import { Orders } from './order';

@Entity()
export class Category {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    name:string;

    @Column({type:"varchar"})
    pictureLink:string;

    @OneToMany(type=>Item,item=>item.category)
    items:Item[];

    @OneToMany(type=>Orders,order => order.category)
    orders: Orders[];
}