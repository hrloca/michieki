import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import {
  MichiekiUser,
  MichiekiUserID,
  MichiekiUserDisplayName,
  MichiekiUserScreenName,
  MichiekiUserRepository,
} from '@app/domain'

@injectable()
export class UserRegister {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async register(displayNamePlaneText: string, screenNamePlaneText: string) {
    const id = new MichiekiUserID(randomUUID())
    const displayName = new MichiekiUserDisplayName(displayNamePlaneText)
    const screenName = new MichiekiUserScreenName(screenNamePlaneText)

    const user = new MichiekiUser(id, displayName, screenName)

    await this.userRepos.store(user)

    return id.toString()
  }
}
