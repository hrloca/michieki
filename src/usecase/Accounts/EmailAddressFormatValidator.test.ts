import 'reflect-metadata'
import { EmailAddressFormatValidator } from './EmailAddressFormatValidator'

describe('EmailAddressFormatValidator test.', () => {
  it('メールアドレスが正常な形式ならば true', async () => {
    const validator = new EmailAddressFormatValidator()
    const { valid } = await validator.validate('hoge@gmail.com')

    expect(valid).toBe(true)
  })

  it('メールアドレスが異常な形式ならば false', async () => {
    const validator = new EmailAddressFormatValidator()
    const { valid } = await validator.validate('hogegmail.com')

    expect(valid).toBe(false)
  })
})
