import { michinoekiRouter } from './michinoeki'
import { createAppRouter } from '@app/core'

export const apiRouter = createAppRouter({
  prefix: '/api',
})

apiRouter.use(michinoekiRouter.routes())
