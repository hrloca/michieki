import { Controller, Get, Ctx } from 'routing-controllers'
import { InitializedAppContext } from '@app/types'
import { FindAllMichinoekiInteractor } from '@app/usecase'

@Controller()
export class MichinoekiController {
  @Get('/michinoekis')
  async getMichinoeki(@Ctx() ctx: InitializedAppContext) {
    return await this.getAll(ctx)
  }

  async getAll(@Ctx() ctx: InitializedAppContext) {
    const { container, logger } = ctx
    logger.info('MichinoekiController.getAll()')
    const findAllMichinoeki = container.resolve(FindAllMichinoekiInteractor)

    const list = await findAllMichinoeki.execute({})
    return { body: list }
  }
}
