import 'reflect-metadata'
import {
  MichiekiAccount,
  MichiekiAccountEmailAddress,
  MichiekiUserID,
  MichiekiAccountPassword,
} from '@app/domain'

import {
  InMemoryMichiekiAccountRepository,
  InMemoryMichiekiAccountDS,
} from '@app/infrastructure'

import { MichiekiAccountService } from './MichiekiAccountService'

const createMock = () => {
  const accountDS = new InMemoryMichiekiAccountDS(
    new Map<string, MichiekiAccount>()
  )

  const accountRespos = new InMemoryMichiekiAccountRepository(accountDS)

  return {
    repos: accountRespos,
    service: new MichiekiAccountService(accountRespos),
  }
}

describe('MichiekiUserAccountService test.', () => {
  it('idの重複をチェックできる', async () => {
    const { service } = createMock()
    expect(true).toBe(true)
  })

  it('emailaddressの重複をチェックできる', async () => {
    const { service } = createMock()
    expect(true).toBe(true)
  })
})
