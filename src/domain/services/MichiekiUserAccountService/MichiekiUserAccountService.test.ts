import 'reflect-metadata'
import {
  MichiekiUserAccountEmailAddress,
  MichiekiUserAccount,
  MichiekiUserID,
} from '@app/domain'

import {
  MichiekiUserAccountInMemoryRepository,
  MichiekiUserAccountInMemoryDS,
} from '@app/infrastructure'

import { MichiekiUserAccountService } from './MichiekiUserAccountService'

const createService = () => {
  const accountDS = new MichiekiUserAccountInMemoryDS(
    new Map<string, MichiekiUserAccount>()
  )

  const accountRespos = new MichiekiUserAccountInMemoryRepository(accountDS)
  return new MichiekiUserAccountService(accountRespos)
}

const createAccounts = async (service: MichiekiUserAccountService) => {
  const account1 = await service.storeUserAccount({
    secret: '12345678',
    emailadressPlaneText: 'hoge@gmail.com',
    userId: new MichiekiUserID('hoge'),
  })

  const account2 = await service.storeUserAccount({
    secret: '12345678',
    emailadressPlaneText: 'hoge2@gmail.com',
    userId: new MichiekiUserID('hoge2'),
  })

  return [account1, account2]
}

describe('MichiekiUserAccountService test.', () => {
  it('idの重複をチェックできる', async () => {
    const service = createService()
    const [account1, account2] = await createAccounts(service)

    const isDuplicated = await service.isDuplicatedAccountId(account1.id)
    const isDuplicated2 = await service.isDuplicatedAccountId(account2.id)

    expect(isDuplicated).toBe(true)
    expect(isDuplicated2).toBe(true)
  })

  it('emailaddressの重複をチェックできる', async () => {
    const service = createService()
    await createAccounts(service)

    const isDuplicated = await service.isDuplicatedEmailAddress(
      new MichiekiUserAccountEmailAddress('hoge@gmail.com')
    )

    const isDuplicated2 = await service.isDuplicatedEmailAddress(
      new MichiekiUserAccountEmailAddress('hoge2@gmail.com')
    )

    const isDuplicated3 = await service.isDuplicatedEmailAddress(
      new MichiekiUserAccountEmailAddress('hog@gmail.com')
    )

    expect(isDuplicated).toBe(true)
    expect(isDuplicated2).toBe(true)
    expect(isDuplicated3).toBe(false)
  })
})