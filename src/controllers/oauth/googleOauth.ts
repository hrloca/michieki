import { createAppRouter } from '@app/core'
import { config } from '@app/config'
import { URL } from 'url'
import fetch from 'node-fetch'

export const googleOauthRouter = createAppRouter()

// authenticate
googleOauthRouter.get('/', async (ctx) => {
  const authURL = new URL('https://accounts.google.com/o/oauth2/auth')
  authURL.searchParams.set('client_id', config.googleOauthClientId)
  authURL.searchParams.set('redirect_uri', config.googleOauthRedirectUrl)
  authURL.searchParams.set('response_type', 'code')
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ]
  authURL.searchParams.set('scope', scopes.join(' '))

  const url = authURL.toString()
  ctx.redirect(url)
})

googleOauthRouter.get('/redirect', async (ctx) => {
  const { code } = ctx.query
  if (typeof code !== 'string')
    throw new Error('クエリパラメータのcodeが無いか文字列ではないようです。')

  const tokenURL = new URL('https://accounts.google.com/o/oauth2/token')
  tokenURL.searchParams.set('client_secret', config.googleOauthClientSecret)
  tokenURL.searchParams.set('client_id', config.googleOauthClientId)
  tokenURL.searchParams.set('redirect_uri', config.googleOauthRedirectUrl)
  tokenURL.searchParams.set('grant_type', 'authorization_code')
  tokenURL.searchParams.set('code', code)

  const res = await fetch(tokenURL.toString(), { method: 'post' })
  const tokens = await res.json()

  const userinfoURL = new URL('https://www.googleapis.com/oauth2/v1/userinfo')

  const resProfile = await fetch(userinfoURL.toString(), {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })

  ctx.body = await resProfile.json()
})
