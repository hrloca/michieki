import { inject, injectable } from 'tsyringe'
import {
  MichiekiUserRepository,
  MichiekiUserID,
  MichiekiUser,
  MichiekiUserScreenName,
} from '@app/domain'

@injectable()
export class MichiekiUserService {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async exists(user: MichiekiUser): Promise<boolean> {
    if (await this.duplicatedScreenName(user.screenName)) return true
    if (await this.duplicatedId(user.id)) return true

    return false
  }

  duplicated(screenName: MichiekiUserScreenName): Promise<boolean>
  duplicated(id: MichiekiUserID): Promise<boolean>
  async duplicated(target: MichiekiUserScreenName | MichiekiUserID) {
    if (target instanceof MichiekiUserScreenName) {
      return this.duplicatedScreenName(target)
    }
    return this.duplicatedId(target)
  }

  private async duplicatedScreenName(
    screenName: MichiekiUserScreenName
  ): Promise<boolean> {
    const user = await this.userRepos.findByScreenName(screenName)
    return !!user
  }

  private async duplicatedId(id: MichiekiUserID): Promise<boolean> {
    const user = await this.userRepos.findById(id)
    return !!user
  }
}
