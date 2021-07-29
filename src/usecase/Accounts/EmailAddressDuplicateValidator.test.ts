import 'reflect-metadata'
import { EmailAddressDuplicateValidator } from './EmailAddressDuplicateValidator'
import {
  MichiekiAccountService,
  MichiekiAccountRepository,
  MichiekiAccount,
  MichiekiAccountID,
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccountSecret,
} from '@app/domain'
import { InMemoryMichiekiAccountRepository } from '@app/infrastructure'

const createMock = async () => {
  const repos: MichiekiAccountRepository =
    new InMemoryMichiekiAccountRepository()
  await repos.store(
    new MichiekiAccount(
      new MichiekiAccountID('0000'),
      new MichiekiAccountEmailAddress('hoge@gmail.com'),
      new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
    )
  )
  const service = new MichiekiAccountService(repos)
  return {
    validator: new EmailAddressDuplicateValidator(service),
  }
}

describe('test.', () => {
  it('メールアドレスが使用可能か検証できる', async () => {
    const { validator } = await createMock()
    const { valid } = await validator.validate('hoge@gmail.com')
    const { valid: valid2 } = await validator.validate('moge@gmail.com')

    expect(valid).toBe(false)
    expect(valid2).toBe(true)
  })
})
