import Application, { Context } from 'koa'
import * as Router from '@koa/router'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as bodyParser from 'koa-bodyparser'
import { loadRouters } from '../router'
import { runConfig } from '../config'
import catchError from '../middleware/catchError'

const app = new Application()
const router = new Router()

router.get('/ping', async (ctx: Context) => {
    ctx.body = 'pong'
})

app.use(catchError)
app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(router.routes()).use(router.allowedMethods())
loadRouters(app)

app.listen(runConfig.port, () => {
    console.log(`Listening on port ${runConfig.port}...\n`)
})
