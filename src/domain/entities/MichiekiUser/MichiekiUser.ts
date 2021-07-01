import { Entity } from '../../core'
import { MichiekiUserID } from './MichiekiUserID'
import { MichiekiUserDisplayName } from './MichiekiUserDisplayName'
import { MichiekiUserAccountID } from '../MichiekiUserAccount'

export class MichiekiUser extends Entity<MichiekiUserID> {
  constructor(
    readonly id: MichiekiUserID,
    readonly displayName: MichiekiUserDisplayName,
    readonly accountId: MichiekiUserAccountID
  ) {
    super()
  }
}
