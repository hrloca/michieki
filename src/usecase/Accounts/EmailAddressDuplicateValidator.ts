import { inject, injectable } from 'tsyringe'
import {
  MichiekiAccountRepository,
  MichiekiAccountEmailAddress,
} from '@app/domain'

@injectable()
export class EmailAddressDuplicateValidator {
  constructor(
    @inject('MichiekiAccountRepository')
    readonly accountRepos: MichiekiAccountRepository
  ) {}

  async validate(emailPlaneText: string) {
    const email = new MichiekiAccountEmailAddress(emailPlaneText)
    const account = await this.accountRepos.findByEmailAddress(email)
    const valid = !!account

    return {
      valid,
      massage: valid ? 'メールアドレスが使用できません。' : null,
    }
  }
}
