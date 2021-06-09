import 'reflect-metadata'

import { MichiekiUserInMemoryRepository } from './MichiekiUserInMemoryRepository'
import { MichiekiUserID, MichiekiUser, MichiekiUserName } from '@app/domain'

describe('MichiekiUserInMemoryRepository test.', () => {
  const dataSource = new Map<string, MichiekiUser>()

  const a = new MichiekiUser(
    new MichiekiUserID('a'),
    new MichiekiUserName('a:san')
  )

  const b = new MichiekiUser(
    new MichiekiUserID('b'),
    new MichiekiUserName('b:san')
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
      new MichiekiUserName('c:san')
    )

    const result = await repos.store(c)
    if (!result) throw new Error('何かがおかしいです')

    expect(c.id.equals(new MichiekiUserID('c'))).toBe(true)
    expect(c.name.toString()).toBe('c:san')
  })

  it('MichiekiUserを更新できる', async () => {
    const d = new MichiekiUser(
      new MichiekiUserID('d'),
      new MichiekiUserName('d:san')
    )

    const result = await repos.store(d)
    if (!result) throw new Error('何かがおかしいです')

    const new_d = new MichiekiUser(
      new MichiekiUserID('d'),
      new MichiekiUserName('d:sama')
    )
    const result2 = await repos.store(new_d)
    if (!result2) throw new Error('何かがおかしいです')

    const result3 = await repos.findById(new MichiekiUserID('d'))
    if (!result3) throw new Error('何かがおかしいです')

    expect(result3.name.toString()).toBe('d:sama')
  })
})
