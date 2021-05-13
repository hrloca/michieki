import redis from 'redis'
import { config } from '@app/config'

export const createRedisClient = () => {
  return redis.createClient({ url: config.redisURL })
}
