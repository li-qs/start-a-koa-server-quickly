import Redis from 'ioredis'
import * as config from 'config'

export const redis = new Redis({
    host: config.get('redis.host'),
    port: Number(config.get('redis.port')),
    db: Number(config.get('redis.db')),
})

redis.info((err) => {
    if (!err) {
        console.log('Redis is established!')
    } else {
        console.error('Error connecting Redis:\n', err)
    }
})
