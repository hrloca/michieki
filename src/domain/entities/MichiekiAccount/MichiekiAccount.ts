import { Entity } from '../../core'
import { MichiekiUserID } from '../MichiekiUser'
import { MichiekiAccountPassword } from './MichiekiAccountPassword'
import { MichiekiAccountEmailAddress } from './MichiekiAccountEmailAddress'
import { MichiekiAccountID } from './MichiekiAccountID'

export interface MichiekiUserAccountCreateInput {
  secret: string
  emailadressPlaneText: string
  userId: MichiekiUserID
}

export class MichiekiAccount extends Entity<MichiekiAccountID> {
  constructor(
    readonly id: MichiekiAccountID,
    readonly userId: MichiekiUserID,
    readonly password: MichiekiAccountPassword,
    readonly emailAddress: MichiekiAccountEmailAddress
  ) {
    super()
  }

  authentication(secret: string): boolean {
    return this.password.matches(secret)
  }
}
