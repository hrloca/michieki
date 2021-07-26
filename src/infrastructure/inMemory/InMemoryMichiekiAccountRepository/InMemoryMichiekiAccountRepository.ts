import { inject, injectable } from 'tsyringe'

import {
  MichiekiAccountRepository,
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountEmailAddress,
} from '@app/domain'

export class InMemoryMichiekiAccountDS {
  constructor(readonly store: Map<string, MichiekiAccount>) {}
}

@injectable()
export class InMemoryMichiekiAccountRepository
  implements MichiekiAccountRepository
{
  constructor(
    @inject('InMemoryMichiekiUserAccountDS')
    private readonly data: InMemoryMichiekiAccountDS
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
