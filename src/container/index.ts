import { container } from 'tsyringe'
import { MichinoekiRepository } from '@api/domain/repositories/MichinoekiRepository'
import { Middleware } from 'koa'
import {
  michinoekiJson,
  MichinoekiJson,
  MichinoekiInMemoryRepository,
} from '@api/infrastructure'
import { MichinoekiResolver } from '@api/presenter/graphql/Michinoeki'

export const createContainer = async () => {
  // repositories
  container.register<MichinoekiRepository>('MichinoekiRepository', {
    useClass: MichinoekiInMemoryRepository,
  })
  // resolvers
  container.register<MichinoekiResolver>('MichinoekiResolver', {
    useClass: MichinoekiResolver,
  })
  // values
  container.register<MichinoekiJson>('MichinoekiJson', {
    useValue: michinoekiJson,
  })

  const getMiddleware = (): Middleware => async (ctx, next) => {
    const child = container.createChildContainer()

    const requestId = ctx.request.headers['x-request-id'] as string | undefined

    child.register<string>('requestId', { useValue: requestId || 'unknown' })

    ctx.container = child
    await next()
  }

  return { container, getMiddleware }
}
