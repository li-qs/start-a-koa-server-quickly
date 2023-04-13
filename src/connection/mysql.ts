import { DataSource } from 'typeorm'
import * as config from 'config'
import * as path from 'path'

export const mysql = new DataSource({
    type: 'mysql',
    host: config.get('mysql.host'),
    port: Number(config.get('mysql.port')),
    username: config.get('mysql.username'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
    entities: [path.resolve('./entity/*{.js,.ts}')],
    logging: Boolean(config.get('mysql.logging')),
    synchronize: true,
    // extra: {
    //     connectionLimit: 10,
    // },
})

mysql
    .initialize()
    .then(() => {
        console.log('MySQL is established!')
    })
    .catch((err) => {
        console.error('Error connecting MySQL:\n', err)
    })
