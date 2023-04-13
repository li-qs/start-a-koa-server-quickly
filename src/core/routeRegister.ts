import 'reflect-metadata'
import * as Router from '@koa/router'
import {
    FUNCTION_CONSTRUCTOR,
    METADATA_METHOD,
    METADATA_PATH,
    METADATA_PREFIX,
} from './constants'
import Application from 'koa'

export class RouteRegister {
    private readonly app: Application

    constructor(app: Application) {
        this.app = app
    }

    register(cls: new () => any) {
        const prefix: string = Reflect.getMetadata(METADATA_PREFIX, cls)
        const dynamicFuncNames: Array<string | symbol> = Reflect.ownKeys(
            cls.prototype
        )
        const controller = new cls()
        const router = new Router()
        router.prefix(prefix)
        let i = 0
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
            router[requestMethod](requestPath, controller[funcName])
            i++
        })
        if (i > 0) {
            this.app.use(router.routes()).use(router.allowedMethods())
        }
    }
}
