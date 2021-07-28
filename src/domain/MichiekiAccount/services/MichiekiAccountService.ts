import { inject, injectable } from 'tsyringe'

import {
  MichiekiAccountRepository,
  MichiekiAccountEmailAddress,
  MichiekiAccountID,
  MichiekiAccount,
} from '@app/domain'

@injectable()
export class MichiekiAccountService {
  constructor(
    @inject('MichiekiUserAccountRepository')
    readonly accountRepos: MichiekiAccountRepository
  ) {}

  async exists(account: MichiekiAccount): Promise<boolean> {
    if (await this.duplicatedEmailAddress(account.emailAddress)) return true
    if (await this.duplicatedId(account.id)) return true

    return false
  }

  async duplicatedEmailAddress(
    emailAddress: MichiekiAccountEmailAddress
  ): Promise<boolean> {
    const account = await this.accountRepos.findByEmailAddress(emailAddress)
    return !!account
  }

  async duplicatedId(id: MichiekiAccountID): Promise<boolean> {
    const account = await this.accountRepos.findById(id)
    return !!account
  }
}
