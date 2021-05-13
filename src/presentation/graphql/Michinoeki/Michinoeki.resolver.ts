import { Query, Resolver } from 'type-graphql'
import { inject, injectable } from 'tsyringe'
import { MichinoekiRepository } from '@app/domain'
import { Michinoeki } from './Michinoeki'

@Resolver(Michinoeki)
@injectable()
export class MichinoekiResolver {
  constructor(
    @inject('MichinoekiRepository')
    readonly michinoekiRepos: MichinoekiRepository
  ) {}

  @Query((returns) => [Michinoeki])
  async michinoekis() {
    const results = await this.michinoekiRepos.findAll()
    return results.map(Michinoeki.fromEntitiy)
  }
}
