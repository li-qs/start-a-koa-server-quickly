import Application, { Middleware } from 'koa'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as bodyParser from 'koa-bodyparser'
import * as Router from '@koa/router'
import {
    FUNCTION_CONSTRUCTOR,
    METADATA_METHOD,
    METADATA_MIDDLEWARES,
    METADATA_PATH,
    METADATA_PREFIX,
} from './constants'

export class AppFactory {
    static create(
        controllers: Array<new () => void>,
        errorHandler: Middleware
    ): Application {
        const app = new Application()
        app.use(errorHandler)
        app.use(bodyParser())
        app.use(json())
        app.use(logger())
        controllers.forEach((controller) =>
            AppFactory.register(app, controller)
        )
        return app
    }

    static register(app: Application, controller: new () => any): void {
        const router = AppFactory.generateRouter(controller)
        app.use(router.routes()).use(router.allowedMethods())
    }

    static generateRouter(cls: new () => any): Router {
        const prefix: string = Reflect.getMetadata(METADATA_PREFIX, cls)
        const middlewares: Middleware[] =
            Reflect.getMetadata(METADATA_MIDDLEWARES, cls) || []
        const dynamicFuncNames: Array<string | symbol> = Reflect.ownKeys(
            cls.prototype
        )
        const controller = new cls()
        const router = new Router()
        router.prefix(prefix)
        router.use(...middlewares)
        dynamicFuncNames.forEach((funcName) => {
            if (
                funcName === FUNCTION_CONSTRUCTOR ||
                !controller[funcName] ||
                'function' !== typeof controller[funcName]
            ) {
                return
            }
            const requestMethod = Reflect.getMetadata(
                METADATA_METHOD,
                controller[funcName]
            )
            if (
                !router[requestMethod] ||
                'function' !== typeof router[requestMethod]
            ) {
                return
            }
            const requestPath = Reflect.getMetadata(
                METADATA_PATH,
                controller[funcName]
            )
            const middlewares =
                Reflect.getMetadata(
                    METADATA_MIDDLEWARES,
                    controller[funcName]
                ) || []
            router[requestMethod](
                requestPath,
                ...middlewares,
                controller[funcName]
            )
        })
        return router
    }
}
