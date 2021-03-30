"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRunner = exports.connection = void 0;
const typeorm_1 = require("typeorm");
const connection = typeorm_1.getConnection();
exports.connection = connection;
const queryRunner = connection.createQueryRunner();
exports.queryRunner = queryRunner;
