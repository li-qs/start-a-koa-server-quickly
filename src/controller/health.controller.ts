import { Context } from 'koa'
import { successful } from '../util/formater'
import { mysql, redis } from '../dbHelper'

export default class HealthController {
    static async mysql(ctx: Context) {
        await mysql.query('select 1')
        ctx.body = successful()
    }

    static async redis(ctx: Context) {
        await redis.get('1')
        ctx.body = successful()
    }
}
