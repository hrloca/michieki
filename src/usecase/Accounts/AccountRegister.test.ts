import 'reflect-metadata'
import { AccountRegister } from './AccountRegister'
import {
  MichiekiAccountService,
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccountSecret,
  MichiekiAccountFactoryFromUUID,
} from '@app/domain'
import { InMemoryMichiekiAccountRepository } from '@app/infrastructure'

const createMock = async () => {
  const repos = new InMemoryMichiekiAccountRepository()
  await repos.store(
    new MichiekiAccount(
      new MichiekiAccountID('0000'),
      new MichiekiAccountEmailAddress('hoge@gmail.com'),
      new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
    )
  )

  const service = new MichiekiAccountService(repos)
  const factory = new MichiekiAccountFactoryFromUUID()

  return {
    repos,
    register: new AccountRegister(repos, factory, service),
  }
}

describe('AccountRegister test.', () => {
  it('アカウントが登録できる。', async () => {
    const { register, repos } = await createMock()

    const blank = await repos.findByEmailAddress(
      new MichiekiAccountEmailAddress('huga@gmail.com')
    )

    await register.register('huga@gmail.com', '00000000')

    const account = await repos.findByEmailAddress(
      new MichiekiAccountEmailAddress('huga@gmail.com')
    )

    if (!account) throw new Error('おかしいです')

    expect(blank).toBe(null)
    expect(account.emailAddress.toString()).toBe('huga@gmail.com')
  })
})
