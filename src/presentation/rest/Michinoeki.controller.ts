import { Controller, Get, Ctx, QueryParam } from 'routing-controllers'
import { InitializedAppContext } from '@app/types'
import { MichinoekiRepository } from '@app/domain'

@Controller()
export class MichinoekiController {
  @Get('/michinoekis')
  async getMichinoeki(
    @Ctx() ctx: InitializedAppContext,
    @QueryParam('pref') pref: string
  ) {
    if (pref) {
      return await this.getByPrefecture(ctx, pref)
    }

    return await this.getAll(ctx)
  }

  async getAll(@Ctx() ctx: InitializedAppContext) {
    const { container, logger } = ctx
    logger.info('Called MichinoekiController.getAll()')
    const repos = container.resolve<MichinoekiRepository>(
      'MichinoekiRepository'
    )

    const list = await repos.findAll()
    return { body: list }
  }

  async getByPrefecture(
    { logger, container }: InitializedAppContext,
    pref: string
  ) {
    logger.info('called MichinoekiController.getByPrefecture()')
    const repos = container.resolve<MichinoekiRepository>(
      'MichinoekiRepository'
    )

    const list = await repos.findByPrefecture(pref)

    return {
      meta: {
        total: list.length,
      },
      body: list,
    }
  }
}
