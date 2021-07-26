import { injectable } from 'tsyringe'
import {
  MichiekiUserAccountService,
  MichiekiAccountEmailAddress,
} from '@app/domain'

import { SignUpUseCase } from './SignUpUseCase'
import { SignUpEmailAdressDuplicatedError } from './SignUpErrors'

@injectable()
export class SignUpInteractor implements SignUpUseCase {
  constructor(private readonly accountservice: MichiekiUserAccountService) {}
  async verifyEmailAddress(emailAddressPlaneText: string) {}
  async authenticationEmailAddress(emailAddressPlaneText: string) {}
  async authenticationEmailAddressByCode(code: string) {}
  async verifyPassword(passwordPlaneText: string) {}
}
