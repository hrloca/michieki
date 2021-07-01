import { inject, injectable } from 'tsyringe'
import {
  MichiekiUserAccountRepository,
  MichiekiUserAccountEmailAddress,
} from '@app/domain'

@injectable()
export class MichiekiUserAccountService {
  constructor(
    @inject('MichiekiUserAccountRepository')
    readonly accountRepos: MichiekiUserAccountRepository
  ) {}

  async createUserAccount() {}

  async isDuplicatedEmailAddress(
    emailAddress: MichiekiUserAccountEmailAddress
  ): Promise<boolean> {
    const account = await this.accountRepos.findByEmailAddress(emailAddress)
    return !!account
  }
}
