import { inject, injectable } from 'tsyringe'
import {
  MichiekiAccountRepository,
  MichiekiAccountFactory,
  MichiekiAccountService,
} from '@app/domain'

@injectable()
export class AccountRegister {
  constructor(
    @inject('MichiekiAccountRepository')
    readonly accountRepos: MichiekiAccountRepository,
    @inject('MichiekiAccountFactory')
    readonly accountFactory: MichiekiAccountFactory,
    readonly accountService: MichiekiAccountService
  ) {}

  async register(emailPlaneText: string, passwordPlaneText: string) {
    const account = this.accountFactory.create(
      emailPlaneText,
      passwordPlaneText
    )

    if (this.accountService.exists(account))
      throw new Error('すでにアカウントが存在します。')

    await this.accountRepos.store(account)

    return account.id.toString()
  }
}
