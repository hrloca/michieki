import 'reflect-metadata'

import {
  MichiekiUserInMemoryRepository,
  MichiekiUserInMemoryDS,
} from './MichiekiUserInMemoryRepository'
import {
  MichiekiUserID,
  MichiekiUser,
  MichiekiUserDisplayName,
} from '@app/domain'

describe('MichiekiUserInMemoryRepository test.', () => {
  const ds = new MichiekiUserInMemoryDS(new Map<string, MichiekiUser>())

  const a = new MichiekiUser(
    new MichiekiUserID('asan'),
    new MichiekiUserDisplayName('a:san')
  )

  const b = new MichiekiUser(
    new MichiekiUserID('bsan'),
    new MichiekiUserDisplayName('b:san')
  )

  ds.store.set(a.id.source, a)
  ds.store.set(b.id.source, b)

  const repos = new MichiekiUserInMemoryRepository(ds)

  it('IDで対象のMichiekiUserが取得できる', async () => {
    const result = await repos.findById(new MichiekiUserID('asan'))

    if (!result) throw new Error('何かがおかしいです')

    expect(result.equals(a)).toBe(true)
    expect(result.equals(b)).toBe(false)
  })

  it('MichiekiUserを登録できる', async () => {
    const c = new MichiekiUser(
      new MichiekiUserID('csan'),
      new MichiekiUserDisplayName('c:san')
    )

    const result = await repos.store(c)
    if (!result) throw new Error('何かがおかしいです')

    expect(c.id.equals(new MichiekiUserID('csan'))).toBe(true)
    expect(c.displayName.toString()).toBe('c:san')
  })

  it('MichiekiUserを更新できる', async () => {
    const d = new MichiekiUser(
      new MichiekiUserID('dsan'),
      new MichiekiUserDisplayName('d:san')
    )

    const result = await repos.store(d)
    if (!result) throw new Error('何かがおかしいです')

    const new_d = new MichiekiUser(
      new MichiekiUserID('dsan'),
      new MichiekiUserDisplayName('d:sama')
    )

    const result2 = await repos.store(new_d)
    if (!result2) throw new Error('何かがおかしいです')

    const result3 = await repos.findById(new MichiekiUserID('dsan'))
    if (!result3) throw new Error('何かがおかしいです')

    expect(result3.displayName.toString()).toBe('d:sama')
  })
})
