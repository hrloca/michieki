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

export class MichiekiUserAccountPasswordIllegalFormatError extends Error {
  message: 'パスワードに不正な文字が含まれています。'
}
export class MichiekiUserAccountPasswordMaxCountOverError extends Error {
  message: 'パスワード長の最大値を超えています。'
}
export class MichiekiUserAccountPasswordMinCountOverError extends Error {
  message: 'パスワード長の最小値を下回っています。'
}

export class MichiekiUserAccountPassword {
  private hash: string
  private salt: string
  private maxLength: number = 24
  private minLength: number = 8
  private properCharacter: RegExp = /^[0-9a-zA-Z]*$/

  constructor(secret: string)
  constructor(hash: string, salt: string)

  constructor(hashOrSecret: string, salt?: string) {
    if (hashOrSecret && salt) {
      this.hash = hashOrSecret
      this.salt = salt
      return
    }

    if (hashOrSecret) {
      this.createHashAndSaltFrom(hashOrSecret)
      return
    }
  }

  matches(secret: string): boolean {
    const hasher = new PasswordHasher()
    const hash = hasher.hashing(secret, this.salt)
    return hash === this.hash
  }

  private isOverMaxLength(secret: string) {
    return secret.length < this.minLength
  }

  private isLessThanMinLength(secret: string) {
    return secret.length > this.maxLength
  }

  private verifySecret(secret: string) {
    if (!this.properCharacter.test(secret))
      throw new MichiekiUserAccountPasswordIllegalFormatError()

    if (this.isLessThanMinLength(secret))
      throw new MichiekiUserAccountPasswordMinCountOverError()

    if (this.isOverMaxLength(secret))
      throw new MichiekiUserAccountPasswordMaxCountOverError()
  }

  private createHashAndSaltFrom(secret: string) {
    this.verifySecret(secret)
    this.salt = randomUUID()
    const hasher = new PasswordHasher()
    this.hash = hasher.hashing(secret, this.salt)
  }
}
