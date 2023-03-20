import Redis from 'ioredis'
import { mainRedisOptions } from '../config'

export const redis = new Redis(mainRedisOptions)
