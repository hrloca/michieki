import 'reflect-metadata'
import {
  MichiekiAccount,
  MichiekiAccountEmailAddress,
  MichiekiUserID,
  MichiekiAccountID,
  MichiekiAccountPassword,
  MichiekiAccountSecret,
  MichiekiAccountRepository,
} from '@app/domain'

import { InMemoryMichiekiAccountRepository } from '@app/infrastructure'

import { MichiekiAccountService } from './MichiekiAccountService'

const storeMockAccount = async (repos: MichiekiAccountRepository) => {
  await repos.store(
    new MichiekiAccount(
      new MichiekiUserID('0000'),
      new MichiekiAccountEmailAddress('hoge@gmail.com'),
      new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
    )
  )
  await repos.store(
    new MichiekiAccount(
      new MichiekiUserID('1111'),
      new MichiekiAccountEmailAddress('huga@gmail.com'),
      new MichiekiAccountPassword(new MichiekiAccountSecret('11111111'))
    )
  )
}

const createMock = async () => {
  const accountRespos = new InMemoryMichiekiAccountRepository()
  await storeMockAccount(accountRespos)

  return {
    repos: accountRespos,
    service: new MichiekiAccountService(accountRespos),
  }
}

describe('MichiekiUserAccountService test.', () => {
  it('idの重複をチェックできる', async () => {
    const { service } = await createMock()
    const isDeplicated = await service.duplicated(new MichiekiAccountID('0000'))

    const isDeplicated2 = await service.duplicated(
      new MichiekiAccountID('2222')
    )
    expect(isDeplicated).toBe(true)
    expect(isDeplicated2).toBe(false)
  })

  it('emailaddressの重複をチェックできる', async () => {
    const { service } = await createMock()
    const isDeplicated = await service.duplicated(
      new MichiekiAccountEmailAddress('hoge@gmail.com')
    )

    const isDeplicated2 = await service.duplicated(
      new MichiekiAccountEmailAddress('moge@gmail.com')
    )
    expect(isDeplicated).toBe(true)
    expect(isDeplicated2).toBe(false)
  })

  it('accountの重複をチェックできる', async () => {
    const { service } = await createMock()
    const isExist = await service.exists(
      new MichiekiAccount(
        new MichiekiUserID('0000'),
        new MichiekiAccountEmailAddress('hoge@gmail.com'),
        new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
      )
    )

    const isExist2 = await service.exists(
      new MichiekiAccount(
        new MichiekiUserID('2222'),
        new MichiekiAccountEmailAddress('moge@gmail.com'),
        new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
      )
    )

    expect(isExist).toBe(true)
    expect(isExist2).toBe(false)
  })
})
