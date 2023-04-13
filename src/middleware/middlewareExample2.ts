import { Context, Next } from 'koa'

export async function middlewareExample2(ctx: Context, next: Next) {
    console.log('执行了中间件 middlewareExample2')
    await next()
}
