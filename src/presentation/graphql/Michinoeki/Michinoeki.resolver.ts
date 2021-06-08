import { Query, Resolver } from 'type-graphql'
import { injectable } from 'tsyringe'
import { FindAllMichinoekiInteractor } from '@app/usecase'
import { Michinoeki } from './Michinoeki'

@Resolver(Michinoeki)
@injectable()
export class MichinoekiResolver {
  constructor(readonly findAllMichinoeki: FindAllMichinoekiInteractor) {}

  @Query((returns) => [Michinoeki])
  async michinoekis() {
    const results = await this.findAllMichinoeki.execute()
    return results.map(Michinoeki.present)
  }
}
