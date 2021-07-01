import { randomUUID, pbkdf2Sync } from 'crypto'

/**
 * パスワードのハッシュ化
 */
export class PasswordHasher {
  private readonly iterations: number = 4000
  private readonly keylen: number = 64
  private readonly digest: string = 'sha512'

  hashing(secret: string, salt: string): string {
    return pbkdf2Sync(
      secret,
      salt,
      this.iterations,
      this.keylen,
      this.digest
    ).toString('hex')
  }
}

/**
 * パスワードの同一性の検証
 */
export class MichiekiUserAccountPassword {
  constructor(readonly hash: string, readonly salt: string) {}

  verify(secret: string): boolean {
    const hasher = new PasswordHasher()
    const hash = hasher.hashing(secret, this.salt)
    return hash === this.hash
  }
}

/**
 * パスワードの初期生成
 */
export class MichiekiUserAccountPasswordInitialCreator {
  from(secret: string) {
    const salt = randomUUID()
    const hasher = new PasswordHasher()
    const hash = hasher.hashing(secret, salt)

    return new MichiekiUserAccountPassword(hash, salt)
  }
}
