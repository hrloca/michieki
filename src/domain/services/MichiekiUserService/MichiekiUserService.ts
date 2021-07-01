import { inject, injectable } from 'tsyringe'
import { MichiekiUserRepository, MichiekiUserID } from '@app/domain'

@injectable()
export class MichiekiUserService {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async createUser() {}

  async isDuplicatedUserID(id: MichiekiUserID): Promise<boolean> {
    const account = await this.userRepos.findById(id)
    return !!account
  }
}
