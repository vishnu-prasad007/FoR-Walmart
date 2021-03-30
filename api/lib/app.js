"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const dbConnection_1 = require("./config/dbConnection");
require("reflect-metadata");
/**Establish connection with database */
dbConnection_1.dbConnection();
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const product_1 = require("./routes/product");
const order_1 = require("./routes/order");
const share_1 = require("./routes/share");
/**Router */
server_1.app.use('/auth', auth_1.authRouter);
server_1.app.use('/users', users_1.userRouter);
server_1.app.use('/category', product_1.productRouter);
server_1.app.use('/orders', order_1.orderRouter);
server_1.app.use('/share', share_1.shareRouter);
