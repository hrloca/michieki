import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import { MichiekiAccountPassword } from '@app/domain'

import {
  MichiekiAccountRepository,
  MichiekiAccountEmailAddress,
  MichiekiAccountID,
  MichiekiAccount,
  MichiekiUserID,
} from '@app/domain'

interface CreateUserAccountInput {
  secret: string
  emailadressPlaneText: string
  userId: MichiekiUserID
}

@injectable()
export class MichiekiUserAccountService {
  constructor(
    @inject('MichiekiUserAccountRepository')
    readonly accountRepos: MichiekiAccountRepository
  ) {}

  private createUserAccount(input: CreateUserAccountInput) {
    const password = new MichiekiAccountPassword(input.secret)
    const email = new MichiekiAccountEmailAddress(input.emailadressPlaneText)
    const id = new MichiekiAccountID(randomUUID())

    return new MichiekiAccount(id, input.userId, password, email)
  }

  async storeUserAccount(input: CreateUserAccountInput) {
    const account = this.createUserAccount(input)
    await this.accountRepos.store(account)
    return account
  }

  async isDuplicatedEmailAddress(
    emailAddress: MichiekiAccountEmailAddress
  ): Promise<boolean> {
    const account = await this.accountRepos.findByEmailAddress(emailAddress)
    return !!account
  }

  async isDuplicatedAccountId(id: MichiekiAccountID): Promise<boolean> {
    const account = await this.accountRepos.findById(id)
    return !!account
  }
}
