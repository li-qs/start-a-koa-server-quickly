import Application from 'koa'
import * as config from 'config'
import * as bodyParser from 'koa-bodyparser'
import * as json from 'koa-json'
import { registerControllers } from 'koa-controller-register'
import { controllers } from './controllers'

const host = config.get('serv.host') as string
const port = Number(config.get('serv.port'))

const app = new Application()

app.use(bodyParser())
app.use(json())
registerControllers(app, controllers)

app.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}\n`)
})
