import Application from 'koa'
import * as config from 'config'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as bodyParser from 'koa-bodyparser'
import catchError from '../middleware/catchError'
import { RouteRegister } from '../core/routeRegister'
import PingController from '../controller/ping.controller'

const host = config.get('serv.host') as string
const port = Number(config.get('serv.port'))
const app = new Application()
app.use(catchError)
app.use(bodyParser())
app.use(json())
app.use(logger())
const t = new RouteRegister(app)
t.register(PingController)
app.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}\n`)
})
