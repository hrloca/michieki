import 'reflect-metadata'
import koa from 'koa'
import { config } from '@api/config'
import { createContainer } from '@api/container'
import { createApolloServer, createRestServer } from '@api/presenter'

const createApp = async () => {
  const app = new koa()
  const containerService = await createContainer()
  const apolloServer = await createApolloServer()
  const restServer = await createRestServer()

  app
    .use(containerService.getMiddleware())
    .use(apolloServer.getMiddleware())
    .use(restServer.getMiddleware())

  return app
}

createApp().then((app) => {
  app.listen(config.port, () => {
    console.log(`🚀🚀🚀 start server at ${config.port}!! 🚀🚀🚀`)
  })
})
