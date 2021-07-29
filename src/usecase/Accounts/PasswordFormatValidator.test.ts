import 'reflect-metadata'
import { PasswordFormatValidator } from './PasswordFormatValidator'

describe('test.', () => {
  const validator = new PasswordFormatValidator()
  it('パスワードが正常な形式である', async () => {
    const { valid } = await validator.validate('hoge011111')

    expect(valid).toBe(true)
  })

  it('パスワードの文字数が足りない', async () => {
    expect((await validator.validate('0000000')).valid).toBe(false)
  })

  it('パスワードの文字数が足りる', async () => {
    expect((await validator.validate('00000000')).valid).toBe(true)
  })

  it('パスワードの文字数が多い', async () => {
    expect((await validator.validate('aaaaaaaaaaaaaaaaaaaaaaaaa')).valid).toBe(false)
  })

  it('メールアドレスに使用不可な文字', async () => {
    expect((await validator.validate('あああああああああ')).valid).toBe(false)
  })
})
