import "reflect-metadata";
import {createConnection} from 'typeorm';
import {User} from '../models/user';
import {UserAuthentication} from '../models/authentication';
import { Category } from "../models/products/category";
import { Item } from "../models/products/items";
import { Orders } from "../models/products/order";
import { Follower } from "../models/follower";
import { Story } from "../models/story";

const dbConnection = ()=>{
    console.log("inside dbConnection");
    createConnection({
        type:"mysql",
        host:"localhost",
        port:3306,
        username:"root",
        password:"1234*vI",
        database:"forsocialcommerce",
        entities:[
            User,
            UserAuthentication,
            Category,
            Item,
            Orders,
            Follower,
            Story
        ],
        synchronize:true
    });
}

export{
    dbConnection
}
