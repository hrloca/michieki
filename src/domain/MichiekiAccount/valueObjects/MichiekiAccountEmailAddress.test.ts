import 'reflect-metadata'
import {
  MichiekiAccountEmailAddress,
  MichiekiAccountEmailAddressError,
} from './MichiekiAccountEmailAddress'

describe('MichiekiAccountEmailAddress test.', () => {
  it('メールアドレスオブジェクトを正常に作成できる', async () => {
    const email = new MichiekiAccountEmailAddress('hoge@gmail.com')
    expect(!!email).toBe(true)
  })

  it('異常な形式の場合はエラーを投げる', async () => {
    expect(() => {
      new MichiekiAccountEmailAddress('hogemail.com')
    }).toThrow(MichiekiAccountEmailAddressError)

    expect(() => {
      new MichiekiAccountEmailAddress('hoge@mail')
      new MichiekiAccountEmailAddress('@mail.com')
    }).toThrow(MichiekiAccountEmailAddressError)
  })
})
