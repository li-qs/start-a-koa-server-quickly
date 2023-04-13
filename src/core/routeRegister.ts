import 'reflect-metadata'
import * as Router from '@koa/router'
import {
    FUNCTION_CONSTRUCTOR,
    METADATA_METHOD,
    METADATA_MIDDLEWARES,
    METADATA_PATH,
    METADATA_PREFIX,
} from './constants'
import Application, { Middleware } from 'koa'

export class RouteRegister {
    private readonly app: Application

    constructor(app: Application) {
        this.app = app
    }

    register(cls: new () => any) {
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
        this.app.use(router.routes()).use(router.allowedMethods())
    }
}
