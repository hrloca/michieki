import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import { MichiekiUserAccountPassword } from '@app/domain'

import {
  MichiekiUserAccountRepository,
  MichiekiUserAccountEmailAddress,
  MichiekiUserAccountID,
  MichiekiUserAccount,
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
    readonly accountRepos: MichiekiUserAccountRepository
  ) {}

  private createUserAccount(input: CreateUserAccountInput) {
    const password = new MichiekiUserAccountPassword(input.secret)
    const email = new MichiekiUserAccountEmailAddress(
      input.emailadressPlaneText
    )
    const id = new MichiekiUserAccountID(randomUUID())

    return new MichiekiUserAccount(id, input.userId, password, email)
  }

  async storeUserAccount(input: CreateUserAccountInput) {
    const account = this.createUserAccount(input)
    await this.accountRepos.store(account)
    return account
  }

  async isDuplicatedEmailAddress(
    emailAddress: MichiekiUserAccountEmailAddress
  ): Promise<boolean> {
    const account = await this.accountRepos.findByEmailAddress(emailAddress)
    return !!account
  }

  async isDuplicatedAccountId(id: MichiekiUserAccountID): Promise<boolean> {
    const account = await this.accountRepos.findById(id)
    return !!account
  }
}