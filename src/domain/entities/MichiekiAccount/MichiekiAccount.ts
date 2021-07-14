import { Entity } from '../../core'
import { MichiekiUserID } from '../MichiekiUser'
import { MichiekiUserAccountPassword } from './MichiekiAccountPassword'
import { MichiekiUserAccountEmailAddress } from './MichiekiAccountEmailAddress'
import { MichiekiUserAccountID } from './MichiekiAccountID'

export interface MichiekiUserAccountCreateInput {
  secret: string
  emailadressPlaneText: string
  userId: MichiekiUserID
}

export class MichiekiAccount extends Entity<MichiekiUserAccountID> {
  constructor(
    readonly id: MichiekiUserAccountID,
    readonly userId: MichiekiUserID,
    readonly password: MichiekiUserAccountPassword,
    readonly emailAddress: MichiekiUserAccountEmailAddress
  ) {
    super()
  }

  authentication(secret: string): boolean {
    return this.password.matches(secret)
  }
}
