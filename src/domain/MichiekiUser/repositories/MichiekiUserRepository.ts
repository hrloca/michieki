import {
  MichiekiUser,
  MichiekiUserID,
  MichiekiUserScreenName,
} from '@app/domain'

export interface MichiekiUserRepository {
  findById(id: MichiekiUserID): Promise<MichiekiUser | null>
  findByScreenName(
    screenName: MichiekiUserScreenName
  ): Promise<MichiekiUser | null>
  store(user: MichiekiUser): Promise<MichiekiUserID>
}
