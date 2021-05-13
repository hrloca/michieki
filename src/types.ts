import { Context } from 'koa'
import { DependencyContainer } from 'tsyringe'
import { Logger } from 'winston'

export interface InitializedAppContext extends Context {
  container: DependencyContainer
  logger: Logger
  requestId: string
}
