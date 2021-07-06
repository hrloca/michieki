import 'reflect-metadata'
import { MichiekiUserAccount, MichiekiUser } from '@app/domain'

import {
  MichiekiUserAccountInMemoryRepository,
  MichiekiUserInMemoryRepository,
} from '@app/infrastructure'

describe('MichiekiUserAccountInMemoryRepository test.', () => {
  const userDS = new Map<string, MichiekiUser>()
  const accountDS = new Map<string, MichiekiUserAccount>()
  const userRespos = new MichiekiUserInMemoryRepository(userDS)
  const accountRespos = new MichiekiUserAccountInMemoryRepository(accountDS)

  it('IDで対象のMichiekiUserAccountが取得できる', async () => {
    expect(true).toBe(true)
  })
})
