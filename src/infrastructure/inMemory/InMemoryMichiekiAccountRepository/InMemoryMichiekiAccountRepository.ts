import { singleton } from 'tsyringe'

import {
  MichiekiAccountRepository,
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountEmailAddress,
} from '@app/domain'

@singleton()
export class InMemoryMichiekiAccountRepository
  implements MichiekiAccountRepository
{
  readonly ds: Map<string, MichiekiAccount>
  constructor() {
    this.ds = new Map<string, MichiekiAccount>()
  }
  /**
   */
  async findById(id: MichiekiAccountID) {
    const user = this.ds.get(id.source) || null
    return user
  }

  async findByEmailAddress(emailaddress: MichiekiAccountEmailAddress) {
    const emailaddressPlaneText = emailaddress.toString()
    for (let account of this.ds.values()) {
      const accountEmailPlaneText = account.emailAddress.toString()
      if (emailaddressPlaneText === accountEmailPlaneText) return account
    }
    return null
  }

  async store(user: MichiekiAccount) {
    this.ds.set(user.id.source, user)
    return user.id
  }
}
