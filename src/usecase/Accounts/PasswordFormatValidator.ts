import { injectable } from 'tsyringe'
import {
  MichiekiAccountPassword,
  MichiekiAccountPasswordError,
} from '@app/domain'

@injectable()
export class PasswordFormatValidator {
  async validate(emailPlaneText: string) {
    try {
      new MichiekiAccountPassword(emailPlaneText)
      return {
        valid: true,
        massage: null,
      }
    } catch (e) {
      if (e instanceof MichiekiAccountPasswordError) {
        return {
          valid: false,
          massages: [
            e.illegalFormat && '有効なパスワードの形式ではありません。',
            e.overMinCount && 'パスワードの最小値を超えています。',
            e.overMaxCount && 'パスワードの最大値を超えています。',
          ].filter((v) => v),
        }
      }

      throw e
    }
  }
}
