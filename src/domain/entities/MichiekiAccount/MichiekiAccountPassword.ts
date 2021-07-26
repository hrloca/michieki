import { randomUUID, pbkdf2Sync } from 'crypto'
import { StringConvertible, ValueObject } from '../../core'

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

export class MichiekiAccountPasswordIllegalFormatError extends Error {
  message: 'パスワードに不正な文字が含まれています。'
}
export class MichiekiAccountPasswordMaxCountOverError extends Error {
  message: 'パスワード長の最大値を超えています。'
}
export class MichiekiAccountPasswordMinCountOverError extends Error {
  message: 'パスワード長の最小値を下回っています。'
}

export class MichiekiAccountPassword
  implements ValueObject<MichiekiAccountPassword>, StringConvertible
{
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

  equals(target: this): boolean {
    return this.hash === target.hash && this.salt === this.salt
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
      throw new MichiekiAccountPasswordIllegalFormatError()

    if (this.isLessThanMinLength(secret))
      throw new MichiekiAccountPasswordMinCountOverError()

    if (this.isOverMaxLength(secret))
      throw new MichiekiAccountPasswordMaxCountOverError()
  }

  private createHashAndSaltFrom(secret: string) {
    this.verifySecret(secret)
    this.salt = randomUUID()
    const hasher = new PasswordHasher()
    this.hash = hasher.hashing(secret, this.salt)
  }
}
