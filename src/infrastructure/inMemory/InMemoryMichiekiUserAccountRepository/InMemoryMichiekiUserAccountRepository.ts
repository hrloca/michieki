import { inject, injectable } from 'tsyringe'

import {
  MichiekiUserAccountRepository,
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountEmailAddress,
} from '@app/domain'

export class InMemoryMichiekiUserAccountDS {
  constructor(readonly store: Map<string, MichiekiAccount>) {}
}

@injectable()
export class InMemoryMichiekiUserAccountRepository
  implements MichiekiUserAccountRepository
{
  constructor(
    @inject('InMemoryMichiekiUserAccountDS')
    private readonly data: InMemoryMichiekiUserAccountDS
  ) {}
  /**
   */
  async findById(id: MichiekiAccountID) {
    const user = this.data.store.get(id.source) || null
    return user
  }

  async findByEmailAddress(emailaddress: MichiekiAccountEmailAddress) {
    const emailaddressPlaneText = emailaddress.toString()
    for (let account of this.data.store.values()) {
      const accountEmailPlaneText = account.emailAddress.toString()
      if (emailaddressPlaneText === accountEmailPlaneText) return account
    }
    return null
  }

  async store(user: MichiekiAccount) {
    this.data.store.set(user.id.source, user)
    return user.id
  }
}
