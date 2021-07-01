import 'reflect-metadata'
import { MichiekiUserAccountPasswordInitialCreator } from './MichiekiUserAccountPassword'

describe('passwordのハッシュ化のテスト', () => {
  const secret = '12345678'
  const pass = new MichiekiUserAccountPasswordInitialCreator().from(secret)

  it('パスワードが一致すれば、検証結果が成功する事', async () => {
    const result = pass.verify('12345678')
    expect(result).toBe(true)
  })

  it('パスワードが一致しなければ、検証結果が失敗する事', async () => {
    const result = pass.verify('1234')
    expect(result).toBe(false)
  })

  it('パスワードが一致しても、saltが違えばhash値は同一にならないこと', async () => {
    const hash = pass.hash
    const hash2 = new MichiekiUserAccountPasswordInitialCreator().from(
      secret
    ).hash

    expect(hash).not.toBe(hash2)
  })
})
