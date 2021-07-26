import { injectable } from 'tsyringe'
import {
  MichiekiAccountEmailAddress,
  MichiekiAccountEmailAddressIllegalFormatError,
} from '@app/domain'

@injectable()
export class EmailAddressFormatValidator {
  async validate(emailPlaneText: string) {
    try {
      new MichiekiAccountEmailAddress(emailPlaneText)
      return {
        valid: true,
        massage: null,
      }
    } catch (e) {
      if (e instanceof MichiekiAccountEmailAddressIllegalFormatError) {
        return {
          valid: true,
          massages: ['適切なメールアドレスの形式ではありません。'],
        }
      }

      throw e
    }
  }
}
