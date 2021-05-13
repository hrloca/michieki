import Router from 'koa-router'
import { config } from '@api/config'
import { routes } from './routes'
import { AppRouter } from './types'

export const createRestServer = async (prefix: string = config.restPrefix) => {
  const router: AppRouter = new Router({ prefix })

  const getMiddleware = () => {
    routes.forEach((route) => router.use(route(router).routes()))
    return router.routes()
  }

  return { getMiddleware }
}
