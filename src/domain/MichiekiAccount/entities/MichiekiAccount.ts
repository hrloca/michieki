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
    readonly emailAddress: MichiekiAccountEmailAddress,
    readonly password: MichiekiAccountPassword,
    userId?: MichiekiUserID
  ) {
    super()
    this.userId = userId
  }

  auth(secret: string): boolean {
    return this.password.matches(secret)
  }

  link(userId: MichiekiUserID): MichiekiAccount {
    return new MichiekiAccount(this.id, this.emailAddress, this.password, userId)
  }
}
