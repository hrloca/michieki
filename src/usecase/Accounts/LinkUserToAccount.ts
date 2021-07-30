import { inject, injectable } from 'tsyringe'
import { MichiekiAccountRepository, MichiekiAccountID, MichiekiUserID } from '@app/domain'

@injectable()
export class LinkUserToAccount {
  constructor(
    @inject('MichiekiAccountRepository')
    private readonly accountRepos: MichiekiAccountRepository
  ) {}

  async link(accountIdPlaneText: string, userIdPlaneText: string) {
    const id = new MichiekiAccountID(accountIdPlaneText)
    const account = await this.accountRepos.findById(id)

    if (!account) throw new Error('対象のアカウントが存在しません。')

    const updatedAccount = account.linkUser(new MichiekiUserID(userIdPlaneText))

    await this.accountRepos.store(updatedAccount)
  }
}
