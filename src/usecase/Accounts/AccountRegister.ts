import { randomUUID } from 'crypto'
import { inject, injectable } from 'tsyringe'
import {
  MichiekiAccountRepository,
  MichiekiAccountEmailAddress,
  MichiekiAccountID,
  MichiekiAccountPassword,
  MichiekiAccountSecret,
  MichiekiAccount,
  MichiekiUserID,
} from '@app/domain'

@injectable()
export class AccountRegister {
  constructor(
    @inject('MichiekiAccountRepository')
    readonly accountRepos: MichiekiAccountRepository
  ) {}

  async register(emailPlaneText: string, passwordPlaneText: string) {
    const id = new MichiekiAccountID(randomUUID())
    const email = new MichiekiAccountEmailAddress(emailPlaneText)
    const password = new MichiekiAccountPassword(
      new MichiekiAccountSecret(passwordPlaneText)
    )

    const account = new MichiekiAccount(id, email, password)

    await this.accountRepos.store(account)

    return id.toString()
  }

  async linkUser(accountIdPlaneText: string, userIdPlaneText: string) {
    const id = new MichiekiAccountID(accountIdPlaneText)
    const account = await this.accountRepos.findById(id)

    if (!account) throw new Error('対象のアカウントが存在しません。')

    const updatedAccount = account.link(new MichiekiUserID(userIdPlaneText))

    await this.accountRepos.store(updatedAccount)
  }
}
