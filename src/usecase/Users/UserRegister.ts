import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import {
  MichiekiUser,
  MichiekiUserID,
  MichiekiUserDisplayName,
  MichiekiUserScreenName,
  MichiekiUserRepository,
} from '@app/domain'

export interface UserRegisterInput {
  displayName: string
  screenName: string
}

@injectable()
export class UserRegister {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async register(input: UserRegisterInput) {
    const id = new MichiekiUserID(randomUUID())
    const displayName = new MichiekiUserDisplayName(input.displayName)
    const screenName = new MichiekiUserScreenName(input.screenName)

    const user = new MichiekiUser(id, displayName, screenName)

    await this.userRepos.store(user)

    return id.toString()
  }
}
