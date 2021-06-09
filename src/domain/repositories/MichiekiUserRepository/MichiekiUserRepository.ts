import { MichiekiUser, MichiekiUserID } from 'domain/entities/MichiekiUser'

export interface MichiekiUserRepository {
  findById(id: MichiekiUserID): Promise<MichiekiUser | null>
  store(user: MichiekiUser): Promise<MichiekiUserID>
}
