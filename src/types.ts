import { Context, Middleware } from 'koa'
import { DependencyContainer } from 'tsyringe'
import { Logger } from 'winston'

export interface AppContext extends Context {
  container: DependencyContainer
  logger: Logger
  requestId: string
}

export type AppMiddleware = Middleware<AppContext>
