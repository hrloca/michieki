import { Entity } from '../../core'
import { MichiekiUserID } from './MichiekiUserID'
import { MichiekiUserDisplayName } from './MichiekiUserDisplayName'

export class MichiekiUser extends Entity<MichiekiUserID> {
  constructor(
    readonly id: MichiekiUserID,
    readonly displayName: MichiekiUserDisplayName
  ) {
    super()
  }
}
