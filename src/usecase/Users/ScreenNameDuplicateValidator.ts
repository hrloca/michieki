import { inject, injectable } from 'tsyringe'
import { MichiekiUserRepository, MichiekiUserScreenName } from '@app/domain'

@injectable()
export class ScreenNameDuplicateValidator {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async validate(screenNamePlaneText: string) {
    const screenName = new MichiekiUserScreenName(screenNamePlaneText)
    const valid = false

    return {
      valid,
      massage: valid ? 'TODO' : null,
    }
  }
}
