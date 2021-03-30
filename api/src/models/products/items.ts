import {Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import { Category } from './category';
import { Orders } from './order';

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    name:string;

    @Column({type:"integer",unsigned:true})
    price: number;

    @Column({type:"longtext"})
    description:string;

    @Column({type:"smallint",unsigned:true})
    ratings:number;

    @Column({type:"varchar"})
    pictureLink:string

    @ManyToOne(type =>Category,category=>category.items)
    category:Category;

    @OneToMany(()=>Orders,order => order.item)
    orders: Orders[]
}