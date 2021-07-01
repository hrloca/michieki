import { injectable } from 'tsyringe'
import {
  MichiekiUserAccountService,
  MichiekiUserService,
  MichiekiUserAccountEmailAddress,
  MichiekiUserID,
} from '@app/domain'

import { SignUpUseCase } from './SignUpUseCase'

@injectable()
export class SignUpInteractor implements SignUpUseCase {
  constructor(
    private readonly accountservice: MichiekiUserAccountService,
    private readonly userservice: MichiekiUserService
  ) {}

  async verifyMailAdress(emailAdressPlaneText: string): Promise<null | Error> {
    try {
      const mailaddress = new MichiekiUserAccountEmailAddress(
        emailAdressPlaneText
      )

      const IsDuplicated = await this.accountservice.isDuplicatedEmailAddress(
        mailaddress
      )

      if (IsDuplicated) throw new Error('メールアドレスが重複しています')

      return null
    } catch (e) {
      return e
    }
  }

  async verifyUserId(idPlaneText: string): Promise<null | Error> {
    try {
      const id = new MichiekiUserID(idPlaneText)

      const IsDuplicated = await this.userservice.isDuplicatedUserID(id)

      if (IsDuplicated) throw new Error('idが重複しています')

      return null
    } catch (e) {
      return e
    }
  }
}
