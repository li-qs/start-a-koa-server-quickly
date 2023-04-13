import Application from 'koa'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as bodyParser from 'koa-bodyparser'
import catchError from './middleware/catchError'
import { RouteRegister } from './routeRegister'

export class AppFactory {
    static create(controllers: Array<new () => void>) {
        const app = new Application()
        app.use(catchError)
        app.use(bodyParser())
        app.use(json())
        app.use(logger())
        const router = new RouteRegister(app)
        controllers.forEach((controller) => router.register(controller))
        return app
    }
}
