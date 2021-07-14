import 'reflect-metadata'
import {
  InMemoryMichiekiUserAccountRepository,
  InMemoryMichiekiUserAccountDS,
} from './InMemoryMichiekiUserAccountRepository'
import {
  MichiekiUserAccountID,
  MichiekiUserAccountPassword,
  MichiekiUserAccountEmailAddress,
  MichiekiAccount,
  MichiekiUserID,
} from '@app/domain'

describe('MichiekiUserAccountInMemoryRepository test.', () => {
  const account = new MichiekiAccount(
    new MichiekiUserAccountID('account'),
    new MichiekiUserID('user'),
    new MichiekiUserAccountPassword('hash', 'salt'),
    new MichiekiUserAccountEmailAddress('hoge@gmail.com')
  )

  it('MichiekiUserAccountを登録できる', async () => {
    const data = new InMemoryMichiekiUserAccountDS(
      new Map<string, MichiekiAccount>()
    )
    const repos = new InMemoryMichiekiUserAccountRepository(data)
    await repos.store(account)

    expect(data.store.get('account')).toBe(account)
  })

  it('IDで対象のMichiekiUserAccountが取得できる', async () => {
    const data = new InMemoryMichiekiUserAccountDS(
      new Map<string, MichiekiAccount>()
    )
    const repos = new InMemoryMichiekiUserAccountRepository(data)
    await repos.store(account)

    const acc = await repos.findById(new MichiekiUserAccountID('account'))
    expect(acc).toBe(account)
  })

  it('MichiekiUserAccountを更新できる', async () => {
    const data = new InMemoryMichiekiUserAccountDS(
      new Map<string, MichiekiAccount>()
    )
    const repos = new InMemoryMichiekiUserAccountRepository(data)
    await repos.store(account)

    const acc = await repos.findById(new MichiekiUserAccountID('account'))
    if (!acc) throw new Error('アカウントが取得できていない')

    const updatedAccount = new MichiekiAccount(
      acc.id,
      acc.userId,
      acc.password,
      new MichiekiUserAccountEmailAddress('hoge3@gmail.com')
    )

    await repos.store(updatedAccount)

    const maybeUpdatedAccount = await repos.findById(
      new MichiekiUserAccountID('account')
    )
    if (!maybeUpdatedAccount)
      throw new Error('更新後のアカウントが取得できていない')

    expect(maybeUpdatedAccount.emailAddress.toString()).toBe('hoge3@gmail.com')
  })
})
