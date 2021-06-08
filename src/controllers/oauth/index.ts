import { googleOauthRouter } from './googleOauth'
import { createAppRouter } from '@app/core'

export const oauthRouter = createAppRouter({
  prefix: '/oauth',
})

oauthRouter.use(googleOauthRouter.routes())
