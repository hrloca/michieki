import Koa from 'koa'
import { useKoaServer } from 'routing-controllers'
import { gatherModules } from '@app/core'

export const createRestApiServer = async (app: Koa) => {
  const controllers = await gatherModules('**/*.controller.ts', __dirname)
  useKoaServer(app, {
    routePrefix: '/api',
    controllers,
  })
}
