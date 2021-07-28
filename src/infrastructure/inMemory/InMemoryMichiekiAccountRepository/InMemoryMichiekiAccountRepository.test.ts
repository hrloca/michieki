import 'reflect-metadata'
import {
  InMemoryMichiekiAccountRepository,
  InMemoryMichiekiAccountDS,
} from './InMemoryMichiekiAccountRepository'
import {
  MichiekiAccountID,
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccount,
  MichiekiAccountPasswordInputForRestore,
  MichiekiUserID,
} from '@app/domain'

describe('MichiekiUserAccountInMemoryRepository test.', () => {
  const account = new MichiekiAccount(
    new MichiekiAccountID('account'),
    new MichiekiAccountEmailAddress('hoge@gmail.com'),
    new MichiekiAccountPassword(
      new MichiekiAccountPasswordInputForRestore('hash', 'salt')
    ),
    new MichiekiUserID('user')
  )

  it('MichiekiUserAccountを登録できる', async () => {
    const data = new InMemoryMichiekiAccountDS(
      new Map<string, MichiekiAccount>()
    )
    const repos = new InMemoryMichiekiAccountRepository(data)
    await repos.store(account)

    expect(data.store.get('account')).toBe(account)
  })

  it('IDで対象のMichiekiUserAccountが取得できる', async () => {
    const data = new InMemoryMichiekiAccountDS(
      new Map<string, MichiekiAccount>()
    )
    const repos = new InMemoryMichiekiAccountRepository(data)
    await repos.store(account)

    const acc = await repos.findById(new MichiekiAccountID('account'))
    expect(acc).toBe(account)
  })

  it('MichiekiUserAccountを更新できる', async () => {
    const data = new InMemoryMichiekiAccountDS(
      new Map<string, MichiekiAccount>()
    )
    const repos = new InMemoryMichiekiAccountRepository(data)
    await repos.store(account)

    const acc = await repos.findById(new MichiekiAccountID('account'))
    if (!acc) throw new Error('アカウントが取得できていない')

    const updatedAccount = new MichiekiAccount(
      acc.id,
      new MichiekiAccountEmailAddress('hoge3@gmail.com'),
      acc.password,
      acc.userId
    )

    await repos.store(updatedAccount)

    const maybeUpdatedAccount = await repos.findById(
      new MichiekiAccountID('account')
    )
    if (!maybeUpdatedAccount)
      throw new Error('更新後のアカウントが取得できていない')

    expect(maybeUpdatedAccount.emailAddress.toString()).toBe('hoge3@gmail.com')
  })
})
