import * as config from 'config'
import { AppFactory } from '../core/appFactory'
import PingController from '../controller/ping.controller'
import catchError from '../middleware/catchError'

const host = config.get('serv.host') as string
const port = Number(config.get('serv.port'))

const controllers = [PingController]
const app = AppFactory.create(controllers, catchError)
app.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}\n`)
})
