import { inject, injectable } from 'tsyringe'

import {
  MichiekiUserAccountRepository,
  MichiekiUserAccount,
  MichiekiUserAccountID,
  MichiekiUserAccountEmailAddress,
} from '@app/domain'

@injectable()
export class MichiekiUserAccountInMemoryRepository
  implements MichiekiUserAccountRepository
{
  constructor(
    @inject('MichiekiUserInMemoryRepositoryDS')
    private readonly dataSource: Map<string, MichiekiUserAccount>
  ) {}
  /**
   */
  async findById(id: MichiekiUserAccountID) {
    const user = this.dataSource.get(id.source) || null
    return user
  }

  async findByEmailAddress(emailaddress: MichiekiUserAccountEmailAddress) {
    const emailaddressPlaneText = emailaddress.toString()
    for (let account of this.dataSource.values()) {
      const accountEmailPlaneText = account.MailAddress.toString()
      if (emailaddressPlaneText === accountEmailPlaneText) return account
    }
    return null
  }

  async store(user: MichiekiUserAccount) {
    this.dataSource.set(user.id.source, user)
    return user.id
  }
}
