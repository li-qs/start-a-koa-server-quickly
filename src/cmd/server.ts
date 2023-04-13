import * as config from 'config'
import { AppFactory } from '../core/appFactory'
import PingController from '../controller/ping.controller'

const controllers = [PingController]
const host = config.get('serv.host') as string
const port = Number(config.get('serv.port'))
AppFactory.create(controllers).listen(port, host, () => {
    console.log(`Listening on ${host}:${port}\n`)
})
