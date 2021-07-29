import 'reflect-metadata'
import { LinkUserToAccount } from './LinkUserToAccount'
import {
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccountSecret,
} from '@app/domain'
import { InMemoryMichiekiAccountRepository } from '@app/infrastructure'

const createMock = async () => {
  const repos = new InMemoryMichiekiAccountRepository()
  await repos.store(
    new MichiekiAccount(
      new MichiekiAccountID('accountid'),
      new MichiekiAccountEmailAddress('hoge@gmail.com'),
      new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
    )
  )

  return {
    repos,
    linker: new LinkUserToAccount(repos),
  }
}

describe('AccountRegister test.', () => {
  it('アカウントにユーザーを紐付けられる', async () => {
    const { repos, linker } = await createMock()

    await linker.link('accountid', 'userid')

    const account = await repos.findByEmailAddress(
      new MichiekiAccountEmailAddress('hoge@gmail.com')
    )

    if (!account) throw new Error('おかしいです')
    if (!account.userId) throw new Error('おかしいです')

    expect(account.userId.toString()).toBe('userid')
  })
})
