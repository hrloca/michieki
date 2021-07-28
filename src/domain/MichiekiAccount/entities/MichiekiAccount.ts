import { Entity } from '../../core'
import { MichiekiUserID } from '../../MichiekiUser'
import {
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccountID,
} from '../valueObjects'

export interface MichiekiUserAccountCreateInput {
  secret: string
  emailadressPlaneText: string
  userId: MichiekiUserID
}

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

  authentication(secret: string): boolean {
    return this.password.matches(secret)
  }

  link(userId: MichiekiUserID) {
    return new MichiekiAccount(
      this.id,
      this.emailAddress,
      this.password,
      userId
    )
  }
}
