import { Context } from 'koa'
import { successful } from '../util/formater'
import { mysql, redis } from '../connection'
import { middlewareExample } from '../middleware/middlewareExample'
import { middlewareExample2 } from '../middleware/middlewareExample2'
import { Before, Controller, Get, Middlewares } from 'koa-controller-register'

@Controller('/ping')
@Middlewares([middlewareExample])
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

    @Get('/middleware')
    @Before([middlewareExample2])
    async middleware(ctx: Context) {
        ctx.body = successful()
    }
}
