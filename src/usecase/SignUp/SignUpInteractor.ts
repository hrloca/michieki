import { injectable } from 'tsyringe'
import {
  MichiekiUserAccountService,
  MichiekiUserService,
  MichiekiUserAccountEmailAddress,
} from '@app/domain'

import { SignUpUseCase } from './SignUpUseCase'
import {
  SignUpEmailAdressDuplicatedError,
  SignUpUserScreenNameDuplicatedError,
} from './SignUpErrors'

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
    if (isDuplicated) throw new SignUpEmailAdressDuplicatedError()

    return null
  }
}
