import 'reflect-metadata'
import { MichiekiUserAccountInMemoryRepository } from './MichiekiUserAccountInMemoryRepository'
import {
  MichiekiUserAccountID,
  MichiekiUserAccountPassword,
  MichiekiUserAccountEmailAddress,
  MichiekiUserAccount,
  MichiekiUserID,
} from '@app/domain'

describe('MichiekiUserAccountInMemoryRepository test.', () => {
  const account = new MichiekiUserAccount(
    new MichiekiUserAccountID('account'),
    new MichiekiUserID('user'),
    new MichiekiUserAccountPassword('hash', 'salt'),
    new MichiekiUserAccountEmailAddress('hoge@gmail.com')
  )

  it('MichiekiUserAccountを登録できる', async () => {
    const dataSource = new Map<string, MichiekiUserAccount>()
    const repos = new MichiekiUserAccountInMemoryRepository(dataSource)
    await repos.store(account)

    expect(dataSource.get('account')).toBe(account)
  })

  it('IDで対象のMichiekiUserAccountが取得できる', async () => {
    const dataSource = new Map<string, MichiekiUserAccount>()
    const repos = new MichiekiUserAccountInMemoryRepository(dataSource)
    await repos.store(account)

    const acc = await repos.findById(new MichiekiUserAccountID('account'))
    expect(acc).toBe(account)
  })

  it('MichiekiUserAccountを更新できる', async () => {
    const dataSource = new Map<string, MichiekiUserAccount>()
    const repos = new MichiekiUserAccountInMemoryRepository(dataSource)
    await repos.store(account)

    const acc = await repos.findById(new MichiekiUserAccountID('account'))
    if (!acc) throw new Error('アカウントが取得できていない')

    const updatedAccount = new MichiekiUserAccount(
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

    expect(maybeUpdatedAccount.MailAddress.toString()).toBe('hoge3@gmail.com')
  })
})
