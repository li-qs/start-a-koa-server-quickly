import * as Router from '@koa/router'
import HealthController from '../controller/health.controller'

export const health = new Router()

health.prefix('/healthcheck')
health.get('/mysql', HealthController.mysql)
health.get('/redis', HealthController.redis)
