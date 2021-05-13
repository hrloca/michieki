import { Context } from 'koa'
import { DependencyContainer } from 'tsyringe'

export interface InitializedAppContext extends Context {
  container: DependencyContainer
}
