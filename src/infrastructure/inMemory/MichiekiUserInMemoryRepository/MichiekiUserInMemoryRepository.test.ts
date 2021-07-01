import 'reflect-metadata'

import { MichiekiUserInMemoryRepository } from './MichiekiUserInMemoryRepository'
import {
  MichiekiUserID,
  MichiekiUser,
  MichiekiUserDisplayName,
  MichiekiUserAccountID,
} from '@app/domain'

describe('MichiekiUserInMemoryRepository test.', () => {
  const dataSource = new Map<string, MichiekiUser>()

  const a = new MichiekiUser(
    new MichiekiUserID('a'),
    new MichiekiUserDisplayName('a:san'),
    new MichiekiUserAccountID('account1')
  )

  const b = new MichiekiUser(
    new MichiekiUserID('b'),
    new MichiekiUserDisplayName('b:san'),
    new MichiekiUserAccountID('account')
  )

  dataSource.set(a.id.source, a)
  dataSource.set(b.id.source, b)

  const repos = new MichiekiUserInMemoryRepository(dataSource)

  it('IDで対象のMichiekiUserが取得できる', async () => {
    const result = await repos.findById(new MichiekiUserID('a'))

    if (!result) throw new Error('何かがおかしいです')

    expect(result.equals(a)).toBe(true)
    expect(result.equals(b)).toBe(false)
  })

  it('MichiekiUserを登録できる', async () => {
    const c = new MichiekiUser(
      new MichiekiUserID('c'),
      new MichiekiUserDisplayName('c:san'),
      new MichiekiUserAccountID('account:c')
    )

    const result = await repos.store(c)
    if (!result) throw new Error('何かがおかしいです')

    expect(c.id.equals(new MichiekiUserID('c'))).toBe(true)
    expect(c.displayName.toString()).toBe('c:san')
  })

  it('MichiekiUserを更新できる', async () => {
    const d = new MichiekiUser(
      new MichiekiUserID('d'),
      new MichiekiUserDisplayName('d:san'),
      new MichiekiUserAccountID('account:d')
    )

    const result = await repos.store(d)
    if (!result) throw new Error('何かがおかしいです')

    const new_d = new MichiekiUser(
      new MichiekiUserID('d'),
      new MichiekiUserDisplayName('d:sama'),
      new MichiekiUserAccountID('account:d')
    )

    const result2 = await repos.store(new_d)
    if (!result2) throw new Error('何かがおかしいです')

    const result3 = await repos.findById(new MichiekiUserID('d'))
    if (!result3) throw new Error('何かがおかしいです')

    expect(result3.displayName.toString()).toBe('d:sama')
  })
})
