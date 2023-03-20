import * as path from 'path'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

// 关于连接池：https://github.com/mysqljs/mysql/tree/master#pool-options
export const mainDataSource: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [path.resolve('../entity/*{.js,.ts}')],
    synchronize: true,
    logging: true,
    extra: {
        // connectionLimit: 10,
    },
}
