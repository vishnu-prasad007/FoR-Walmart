"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const authentication_1 = require("../models/authentication");
const category_1 = require("../models/products/category");
const items_1 = require("../models/products/items");
const order_1 = require("../models/products/order");
const follower_1 = require("../models/follower");
const dbConnection = () => {
    console.log("inside dbConnection");
    typeorm_1.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "1234*vI",
        database: "forsocialcommerce",
        entities: [
            user_1.User,
            authentication_1.UserAuthentication,
            category_1.Category,
            items_1.Item,
            order_1.Orders,
            follower_1.Follower
        ],
        synchronize: true
    });
};
exports.dbConnection = dbConnection;
