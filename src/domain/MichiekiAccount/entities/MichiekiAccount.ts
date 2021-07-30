import { Entity } from '../../core'
import { MichiekiUserID } from '../../MichiekiUser'
import {
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccountID,
} from '../valueObjects'

export class MichiekiAccount extends Entity<MichiekiAccountID> {
  userId?: MichiekiUserID
  constructor(
    readonly id: MichiekiAccountID,
    // TODO: toPrivate..
    readonly emailAddress: MichiekiAccountEmailAddress,
    readonly password: MichiekiAccountPassword,
    userId?: MichiekiUserID
  ) {
    super()
    this.userId = userId
  }

  isLinkedUser() {
    return !!this.userId
  }

  auth(secret: string): boolean {
    return this.password.matches(secret)
  }

  linkUser(userId: MichiekiUserID): MichiekiAccount {
    return new MichiekiAccount(this.id, this.emailAddress, this.password, userId)
  }

  changeEmailAddress(email: MichiekiAccountEmailAddress): MichiekiAccount {
    return new MichiekiAccount(this.id, email, this.password, this.userId)
  }

  changePassword(password: MichiekiAccountPassword): MichiekiAccount {
    return new MichiekiAccount(this.id, this.emailAddress, password, this.userId)
  }
}
