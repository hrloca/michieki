import { randomUUID } from 'crypto'
import { Entity } from '../../core'
import { MichiekiUserID } from '../MichiekiUser'
import { MichiekiUserAccountPassword } from './MichiekiUserAccountPassword'
import { MichiekiUserAccountEmailAddress } from './MichiekiUserAccountEmailAddress'
import { MichiekiUserAccountID } from './MichiekiUserAccountID'

export interface MichiekiUserAccountCreateInput {
  secret: string
  emailadressPlaneText: string
  userId: MichiekiUserID
}

export class MichiekiUserAccount extends Entity<MichiekiUserAccountID> {
  constructor(
    readonly id: MichiekiUserAccountID,
    readonly userId: MichiekiUserID,
    readonly password: MichiekiUserAccountPassword,
    readonly MailAddress: MichiekiUserAccountEmailAddress
  ) {
    super()
  }

  authentication(secret: string): boolean {
    return this.password.matches(secret)
  }
}
