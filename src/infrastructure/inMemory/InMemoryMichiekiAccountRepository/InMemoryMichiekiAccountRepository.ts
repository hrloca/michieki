import { injectable } from 'tsyringe'

import {
  MichiekiAccountRepository,
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountEmailAddress,
} from '@app/domain'

const ds = new Map<string, MichiekiAccount>()

@injectable()
export class InMemoryMichiekiAccountRepository implements MichiekiAccountRepository {
  readonly ds: Map<string, MichiekiAccount>
  constructor() {
    this.ds = ds
  }
  /**
   */
  async findById(id: MichiekiAccountID) {
    const user = this.ds.get(id.value) || null
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
    this.ds.set(user.id.value, user)
    return user.id
  }
}
