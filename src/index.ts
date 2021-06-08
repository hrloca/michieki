import 'reflect-metadata'
import Koa from 'koa'
import morgan from 'koa-morgan'
import { config } from '@app/config'
import { createLogger } from '@app/core'
import { createContainer } from '@app/registry'
import { errorHandler, registerScopedContexts } from '@app/middlewares'
import { createController } from '@app/controllers'
import { createApolloServer } from '@app/presentation'

const createApp = async () => {
  const app = new Koa()
  const container = await createContainer(__dirname)
  const apolloServer = await createApolloServer()
  const controller = await createController()
  const logger = createLogger()

  app
    .use(errorHandler())
    .use(morgan('combined', { stream: process.stdout }))
    .use(registerScopedContexts({ container, logger }))
    .use(apolloServer.getMiddleware())
    .use(controller.getMiddleware())

  return { app, logger }
}

createApp().then(({ app, logger }) => {
  app.listen(config.port, () => {
    logger.info(`🚀🚀🚀 start server at ${config.port}!! 🚀🚀🚀`)
  })
})
