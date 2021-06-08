import { FindAllMichinoekiInteractor } from '@app/usecase'
import { createAppRouter } from '@app/core'
import { AppContext } from '@api/types'

export const michinoekiRouter = createAppRouter()

const resolveModules = (ctx: AppContext) => {
  const findAllMichinoeki = ctx.container.resolve(FindAllMichinoekiInteractor)
  return {
    findAllMichinoeki,
  }
}

michinoekiRouter.get('/michinoekis', async (ctx) => {
  const { findAllMichinoeki } = resolveModules(ctx)
  ctx.body = await findAllMichinoeki.execute({})
})
