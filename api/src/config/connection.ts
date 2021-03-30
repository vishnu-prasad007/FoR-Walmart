import {getConnection} from 'typeorm';

const connection = getConnection();
const queryRunner = connection.createQueryRunner();

export {
    connection,
    queryRunner
}