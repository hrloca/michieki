import { inject, injectable } from 'tsyringe'
import { MichinoekiRepository } from '@app/domain'
import { FindAllMichinoekiUseCase } from './FindAllMichinoekiUseCase'

@injectable()
export class FindAllMichinoekiInteractor implements FindAllMichinoekiUseCase {
  constructor(
    @inject('MichinoekiRepository')
    readonly michinoekiRepos: MichinoekiRepository
  ) {}

  async execute() {
    return (await this.michinoekiRepos.findAll()) as any
  }
}
