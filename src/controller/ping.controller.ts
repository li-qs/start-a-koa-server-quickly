import { Context } from 'koa'
import { successful } from '../util/formater'
import { mysql, redis } from '../connection'
import { Controller, Get } from '../core/decorator'

@Controller('/ping')
export default class PingController {
    @Get('/')
    async ping(ctx: Context) {
        ctx.body = 'pong'
    }

    @Get('/mysql')
    async mysql(ctx: Context) {
        await mysql.query('select 1')
        ctx.body = successful()
    }

    @Get('/redis')
    async redis(ctx: Context) {
        await redis.get('1')
        ctx.body = successful()
    }
}
