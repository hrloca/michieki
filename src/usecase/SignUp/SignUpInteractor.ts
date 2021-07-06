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
    const mailaddress = new MichiekiUserAccountEmailAddress(
      emailAdressPlaneText
    )
    const isDuplicated = await this.accountservice.isDuplicatedEmailAddress(
      mailaddress
    )
    if (isDuplicated) throw new Error('メールアドレスが重複しています')

    return null
  }

  async verifyUserId(idPlaneText: string): Promise<null | Error> {
    const id = new MichiekiUserID(idPlaneText)
    const isDuplicated = await this.userservice.isDuplicatedUserID(id)
    if (isDuplicated) throw new Error('idが重複しています')

    return null
  }
}
