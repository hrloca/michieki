import 'reflect-metadata'
import Koa from 'koa'
import morgan from 'koa-morgan'
import { config } from '@app/config'
import { createApolloServer, createRestApiServer } from '@app/presentation'
import { createLogger } from '@app/core'
import { createContainer } from '@app/registry'
import { errorHandler, registerScopedContexts } from '@app/middlewares'

const createApp = async () => {
  const app = new Koa()
  const container = await createContainer()
  const apolloServer = await createApolloServer()
  const logger = createLogger()

  app.use(errorHandler())
  app.use(morgan('combined', { stream: process.stdout }))
  app.use(registerScopedContexts({ container, logger }))
  app.use(apolloServer.getMiddleware())
  await createRestApiServer(app)

  return { app, logger }
}

createApp().then(({ app, logger }) => {
  app.listen(config.port, () => {
    logger.info(`🚀🚀🚀 start server at ${config.port}!! 🚀🚀🚀`)
  })
})
