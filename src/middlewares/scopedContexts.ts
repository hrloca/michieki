import { DependencyContainer } from 'tsyringe'
import { Logger } from 'winston'
import { Middleware } from 'koa'
// import { RedisClient } from 'redis'
// import { Client } from '@elastic/elasticsearch'
import { registerScopedContainer } from '@app/registry'

type GetMiddlewareInput = {
  logger: Logger
  container: DependencyContainer
}

export const registerScopedContexts =
  ({ container, logger: baseLogger }: GetMiddlewareInput): Middleware =>
  async (ctx, next) => {
    const requestId = ctx.request.headers['x-request-id'] as string | undefined

    const requestIdLabel = requestId || 'unknown'
    const logger = baseLogger.child({ requestId: requestIdLabel })
    const child = registerScopedContainer(container, {
      requestId: requestIdLabel,
      logger,
    })

    ctx.requestId = requestIdLabel
    ctx.logger = logger
    ctx.container = child
    await next()
  }
