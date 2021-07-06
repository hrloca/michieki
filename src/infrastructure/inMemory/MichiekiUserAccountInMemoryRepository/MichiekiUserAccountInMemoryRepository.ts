import { inject, injectable } from 'tsyringe'

import {
  MichiekiUserAccountRepository,
  MichiekiUserAccount,
  MichiekiUserAccountID,
  MichiekiUserAccountEmailAddress,
} from '@app/domain'

export class MichiekiUserAccountInMemoryDS {
  constructor(readonly store: Map<string, MichiekiUserAccount>) {}
}

@injectable()
export class MichiekiUserAccountInMemoryRepository
  implements MichiekiUserAccountRepository
{
  constructor(
    @inject('MichiekiUserInMemoryRepositoryDS')
    private readonly data: MichiekiUserAccountInMemoryDS
  ) {}
  /**
   */
  async findById(id: MichiekiUserAccountID) {
    const user = this.data.store.get(id.source) || null
    return user
  }

  async findByEmailAddress(emailaddress: MichiekiUserAccountEmailAddress) {
    const emailaddressPlaneText = emailaddress.toString()
    for (let account of this.data.store.values()) {
      const accountEmailPlaneText = account.MailAddress.toString()
      if (emailaddressPlaneText === accountEmailPlaneText) return account
    }
    return null
  }

  async store(user: MichiekiUserAccount) {
    this.data.store.set(user.id.source, user)
    return user.id
  }
}
