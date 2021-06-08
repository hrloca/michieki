import { google } from 'googleapis'
import { createAppRouter } from '@app/core'
import { config } from '@app/config'

const oauth2Client = new google.auth.OAuth2(
  config.googleOauthClientId,
  config.googleOauthClientSecret,
  config.googleOauthRedirectUrl
)

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
]

const url = oauth2Client.generateAuthUrl({
  scope: scopes,
})

export const googleOauthRouter = createAppRouter()

// authenticate
googleOauthRouter.get('/', async (ctx) => {
  ctx.redirect(url)
})

googleOauthRouter.get('/redirect', async (ctx) => {
  const { code } = ctx.query
  if (typeof code !== 'string') throw new Error()
  const { tokens } = await oauth2Client.getToken(code)

  console.log('code', code)
  console.log('tokens', tokens)
  oauth2Client.setCredentials(tokens)
  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log('tokens.refresh_token', tokens.refresh_token)
    }
    console.log('tokens.access_token', tokens.access_token)
  })

  ctx.body = tokens
})
