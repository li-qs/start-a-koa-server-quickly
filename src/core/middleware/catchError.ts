import { Context, Next } from 'koa'
import { response } from '../../util/formater'

export default async function catchError(ctx: Context, next: Next) {
    try {
        await next()
    } catch (e) {
        console.error(e)
        ctx.status = 500
        ctx.body = response(500, null, '服务器错误')
    }
}
