import { createAppRouter } from '@app/core'
import { apiRouter } from './api'
import { oauthRouter } from './oauth'

const router = createAppRouter()

router.use(apiRouter.routes())
router.use(oauthRouter.routes())

export const createController = async () => {
  return {
    getMiddleware: () => {
      return router.routes()
    },
  }
}
