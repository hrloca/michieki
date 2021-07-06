import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import { PasswordHasher, MichiekiUserAccountPassword } from '@app/domain'

import {
  MichiekiUserAccountRepository,
  MichiekiUserAccountEmailAddress,
  MichiekiUserAccountID,
  MichiekiUserAccount,
  MichiekiUserID,
} from '@app/domain'

@injectable()
export class MichiekiUserAccountService {
  constructor(
    @inject('MichiekiUserAccountRepository')
    readonly accountRepos: MichiekiUserAccountRepository
  ) {}

  async createUserAccount(
    secret: string,
    emailadressPlaneText: string,
    userId: MichiekiUserID
  ) {
    const password = this.passwordInitialCreate(secret)
    const email = new MichiekiUserAccountEmailAddress(emailadressPlaneText)
    const id = new MichiekiUserAccountID(randomUUID())
    return new MichiekiUserAccount(id, userId, password, email)
  }

  private passwordInitialCreate(secret: string) {
    const salt = randomUUID()
    const hasher = new PasswordHasher()
    const hash = hasher.hashing(secret, salt)

    return new MichiekiUserAccountPassword(hash, salt)
  }

  async isDuplicatedEmailAddress(
    emailAddress: MichiekiUserAccountEmailAddress
  ): Promise<boolean> {
    const account = await this.accountRepos.findByEmailAddress(emailAddress)
    return !!account
  }
}
