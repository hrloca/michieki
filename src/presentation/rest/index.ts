import glob from 'glob-promise'
import Koa from 'koa'
import path from 'path'
import { useKoaServer } from 'routing-controllers'

export const createRestApiServer = async (app: Koa) => {
  const controllers = await gatherController()
  useKoaServer(app, {
    routePrefix: '/api',
    controllers,
  })
}

const gatherController = async () => {
  const files = await glob('**/*.controller.ts', { cwd: __dirname })
  // TODO: depends on tsconfig.
  return files
    .map((p) => require(path.join(__dirname, p)))
    .map(Object.values)
    .flat()
}
