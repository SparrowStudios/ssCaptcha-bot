import { PoolOptions } from 'mysql2';

export const MysqlConfig: PoolOptions = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT === undefined ? "3306" : process.env.MYSQL_PORT),
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // rowsAsArray: true,
    multipleStatements: true
}