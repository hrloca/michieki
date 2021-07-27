import 'reflect-metadata'
import {
  MichiekiAccountPassword,
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
