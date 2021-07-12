import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import {
  MichiekiUserRepository,
  MichiekiUserID,
  MichiekiUserDisplayName,
  MichiekiUser,
  MichiekiUserScreenName,
} from '@app/domain'

interface CreateUserInput {
  displayNamePlateText: string
  screenNamePlateText: string
}

@injectable()
export class MichiekiUserService {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async createUser(input: CreateUserInput) {
    const id = new MichiekiUserID(randomUUID())
    const displayName = new MichiekiUserDisplayName(input.displayNamePlateText)
    const screenName = new MichiekiUserScreenName(input.screenNamePlateText)
    return new MichiekiUser(id, displayName, screenName)
  }

  async isDuplicatedUserID(id: MichiekiUserID): Promise<boolean> {
    const account = await this.userRepos.findById(id)
    return !!account
  }
}
