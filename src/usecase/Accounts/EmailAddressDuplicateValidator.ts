import { injectable } from 'tsyringe'
import {
  MichiekiAccountService,
  MichiekiAccountEmailAddress,
} from '@app/domain'

@injectable()
export class EmailAddressDuplicateValidator {
  constructor(private readonly accountService: MichiekiAccountService) {}

  async validate(emailPlaneText: string) {
    const email = new MichiekiAccountEmailAddress(emailPlaneText)
    const valid = !(await this.accountService.duplicated(email))

    return {
      valid,
      massage: valid ? 'メールアドレスが使用できません。' : null,
    }
  }
}
