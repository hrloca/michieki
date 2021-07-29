import 'reflect-metadata'
import {
  MichiekiAccountPassword,
  MichiekiAccountPasswordError,
  MichiekiAccountSecret,
} from './MichiekiAccountPassword'

describe('passwordのハッシュ化のテスト', () => {
  const secret = '12345678'
  const input = new MichiekiAccountSecret(secret)
  const pass = new MichiekiAccountPassword(input)

  it('パスワードが一致すれば、検証結果が成功する事', async () => {
    const result = pass.matches('12345678')
    expect(result).toBe(true)
  })

  it('パスワードが一致しなければ、検証結果が失敗する事', async () => {
    const result = pass.matches('12345678910')
    expect(result).toBe(false)
  })

  it('パスワードが一致しても、saltが違えばhash値は同一にならないこと', async () => {
    const testablePass = pass as any
    const hash = testablePass.hash
    const hash2 = new MichiekiAccountPassword(input)

    expect(hash).not.toBe(hash2)
  })
})

describe('passwordの形式のテスト', () => {
  it('パスワードが正常な形式である', async () => {
    const pass = new MichiekiAccountPassword(
      new MichiekiAccountSecret('hoge011111')
    )
    expect(!!pass).toBe(true)
  })

  it('パスワードの文字数が足りない', async () => {
    expect(() => {
      new MichiekiAccountPassword(new MichiekiAccountSecret('0000000'))
    }).toThrow(MichiekiAccountPasswordError)
  })

  it('パスワードの文字数が足りる', async () => {
    expect(
      !!new MichiekiAccountPassword(new MichiekiAccountSecret('00000000'))
    ).toBe(true)
  })

  it('パスワードの文字数が多い', async () => {
    expect(() => {
      new MichiekiAccountPassword(
        new MichiekiAccountSecret('aaaaaaaaaaaaaaaaaaaaaaaaa')
      )
    }).toThrow(MichiekiAccountPasswordError)
  })

  it('メールアドレスに使用不可な文字', async () => {
    expect(() => {
      new MichiekiAccountPassword(
        new MichiekiAccountSecret('あああああああああ')
      )
    }).toThrow(MichiekiAccountPasswordError)
  })
})
