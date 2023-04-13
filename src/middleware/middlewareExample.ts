import { Context, Next } from 'koa'

export async function middlewareExample(ctx: Context, next: Next) {
    console.log('执行了中间件 middlewareExample')
    await next()
}
