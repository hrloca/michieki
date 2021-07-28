import { Entity } from '../../core'
import {
  MichiekiUserID,
  MichiekiUserDisplayName,
  MichiekiUserScreenName,
} from '../valueObjects'

export class MichiekiUser extends Entity<MichiekiUserID> {
  constructor(
    readonly id: MichiekiUserID,
    readonly displayName: MichiekiUserDisplayName,
    readonly screenName: MichiekiUserScreenName
  ) {
    super()
  }
}
