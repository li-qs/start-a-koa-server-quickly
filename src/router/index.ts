import Application from 'koa'
import { health } from './health'

export function loadRouters(app: Application) {
    app.use(health.routes())
}
