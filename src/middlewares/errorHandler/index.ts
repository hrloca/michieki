import { config } from '@app/config'
import { Middleware } from 'koa'

export const errorHandler = (): Middleware => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (config.isDev) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        message: err.message,
      }
    } else {
      throw err
    }
  }
}
