import 'reflect-metadata'
import { randomUUID } from 'crypto'
import {
  InMemoryMichiekiUserRepository,
  InMemoryMichiekiUserDS,
} from './InMemoryMichiekiUserRepository'
import {
  MichiekiUserID,
  MichiekiUser,
  MichiekiUserDisplayName,
  MichiekiUserScreenName,
} from '@app/domain'

describe('MichiekiUserInMemoryRepository test.', () => {
  const ds = new InMemoryMichiekiUserDS(new Map<string, MichiekiUser>())

  const aIdSource = randomUUID()
  const a = new MichiekiUser(
    new MichiekiUserID(aIdSource),
    new MichiekiUserDisplayName('a:san'),
    new MichiekiUserScreenName('asan')
  )

  const bIdSource = randomUUID()
  const b = new MichiekiUser(
    new MichiekiUserID(bIdSource),
    new MichiekiUserDisplayName('b:san'),
    new MichiekiUserScreenName('bsan')
  )

  ds.store.set(a.id.source, a)
  ds.store.set(b.id.source, b)

  const repos = new InMemoryMichiekiUserRepository(ds)

  it('IDで対象のMichiekiUserが取得できる', async () => {
    const result = await repos.findById(new MichiekiUserID(aIdSource))

    if (!result) throw new Error('何かがおかしいです')

    expect(result.equals(a)).toBe(true)
    expect(result.equals(b)).toBe(false)
  })

  it('MichiekiUserを登録できる', async () => {
    const cIdSource = randomUUID()
    const c = new MichiekiUser(
      new MichiekiUserID(cIdSource),
      new MichiekiUserDisplayName('c:san'),
      new MichiekiUserScreenName('csan')
    )

    const result = await repos.store(c)
    if (!result) throw new Error('何かがおかしいです')

    expect(c.id.equals(new MichiekiUserID(cIdSource))).toBe(true)
    expect(c.displayName.toString()).toBe('c:san')
  })

  it('MichiekiUserを更新できる', async () => {
    const dIdSource = randomUUID()
    const d = new MichiekiUser(
      new MichiekiUserID(dIdSource),
      new MichiekiUserDisplayName('d:san'),
      new MichiekiUserScreenName('dsan')
    )

    const result = await repos.store(d)
    if (!result) throw new Error('何かがおかしいです')

    const new_d = new MichiekiUser(
      new MichiekiUserID(dIdSource),
      new MichiekiUserDisplayName('d:sama'),
      new MichiekiUserScreenName('dsan')
    )

    const result2 = await repos.store(new_d)
    if (!result2) throw new Error('何かがおかしいです')

    const result3 = await repos.findById(new MichiekiUserID(dIdSource))
    if (!result3) throw new Error('何かがおかしいです')

    expect(result3.displayName.toString()).toBe('d:sama')
  })
})
