import Router from 'koa-router'
import { InitializedAppContext } from '@api/types'

export type AppRouter = Router<{}, InitializedAppContext>
export type Route = (router: AppRouter) => AppRouter
