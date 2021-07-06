import { Entity } from '../../core'
import { MichiekiUserID } from './MichiekiUserID'
import { MichiekiUserDisplayName } from './MichiekiUserDisplayName'
import { MichiekiUserScreenName } from './MichiekiUserScreenName'

export class MichiekiUser extends Entity<MichiekiUserID> {
  constructor(
    readonly id: MichiekiUserID,
    readonly displayName: MichiekiUserDisplayName,
    readonly screenName: MichiekiUserScreenName
  ) {
    super()
  }
}
