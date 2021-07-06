import 'reflect-metadata'
import { MichiekiUserAccountPassword } from './MichiekiUserAccountPassword'

describe('passwordのハッシュ化のテスト', () => {
  const secret = '12345678'
  const pass = MichiekiUserAccountPassword.from(secret)

  it('パスワードが一致すれば、検証結果が成功する事', async () => {
    const result = pass.matches('12345678')
    expect(result).toBe(true)
  })

  it('パスワードが一致しなければ、検証結果が失敗する事', async () => {
    const result = pass.matches('1234')
    expect(result).toBe(false)
  })

  it('パスワードが一致しても、saltが違えばhash値は同一にならないこと', async () => {
    const testablePass = pass as any
    const hash = testablePass.hash
    const hash2 = MichiekiUserAccountPassword.from(secret)

    expect(hash).not.toBe(hash2)
  })
})
