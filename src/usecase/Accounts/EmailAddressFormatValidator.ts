import { injectable } from 'tsyringe'
import { MichiekiAccountEmailAddress, MichiekiAccountEmailAddressError } from '@app/domain'

@injectable()
export class EmailAddressFormatValidator {
  constructor() {}

  async validate(emailPlaneText: string) {
    if (!(await this.validateFormat(emailPlaneText))) {
      return {
        valid: false,
        massages: ['適切なメールアドレスの形式ではありません。'],
      }
    }

    return {
      valid: true,
      massages: [],
    }
  }

  private async validateFormat(emailPlaneText: string) {
    try {
      new MichiekiAccountEmailAddress(emailPlaneText)
      return true
    } catch (e) {
      if (e instanceof MichiekiAccountEmailAddressError) {
        return false
      }

      throw e
    }
  }
}
