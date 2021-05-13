import { MichinoekiRepository } from '@api/domain'
import { Route, AppRouter } from './types'

const michinoeki = (router: AppRouter) => {
  router.get('/michinoekis', async (ctx) => {
    const repos = ctx.container.resolve<MichinoekiRepository>(
      'MichinoekiRepository'
    )
    const list = await repos.findAll()

    ctx.body = {
      meta: {
        total: list.length,
      },
      body: list,
    }
  })

  return router
}

export const routes: Route[] = [michinoeki]
