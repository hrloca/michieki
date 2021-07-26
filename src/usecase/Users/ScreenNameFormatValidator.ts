import { injectable } from 'tsyringe'
import {
  MichiekiUserScreenName,
  MichiekiUserScreenNameError,
} from '@app/domain'

@injectable()
export class ScreenNameFormatValidator {
  async validate(screenNamePlaneText: string) {
    try {
      new MichiekiUserScreenName(screenNamePlaneText)
      return {
        valid: true,
        massage: null,
      }
    } catch (e) {
      if (e instanceof MichiekiUserScreenNameError) {
        return {
          valid: true,
          // TODO: メッセージかく
          massages: [''],
        }
      }

      throw e
    }
  }
}
