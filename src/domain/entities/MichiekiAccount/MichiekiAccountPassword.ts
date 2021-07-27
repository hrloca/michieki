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

export class MichiekiAccountPasswordError extends Error {
  constructor(
    readonly illegalFormat: boolean,
    readonly overMinCount: boolean,
    readonly overMaxCount: boolean
  ) {
    super()
  }
}

export class MichiekiAccountSecret {
  constructor(readonly secret: string) {}
}

export class MichiekiAccountPasswordInputForRestore {
  constructor(readonly hash: string, readonly salt: string) {}
}

export class MichiekiAccountPassword
  implements ValueObject<MichiekiAccountPassword>, StringConvertible
{
  private hash: string
  private salt: string
  private maxLength: number = 24
  private minLength: number = 8
  private properCharacter: RegExp = /^[0-9a-zA-Z]*$/

  constructor(
    input: MichiekiAccountSecret | MichiekiAccountPasswordInputForRestore
  ) {
    if (input instanceof MichiekiAccountPasswordInputForRestore) {
      this.hash = input.hash
      this.salt = input.salt
      return
    }

    if (input instanceof MichiekiAccountSecret) {
      this.createHashAndSaltFrom(input.secret)
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
    const overMaxCoun = this.isOverMaxLength(secret)
    const overMinCount = this.isLessThanMinLength(secret)
    const illegalFormat = !this.properCharacter.test(secret)
    if (overMaxCoun || overMinCount || illegalFormat) {
      throw new MichiekiAccountPasswordError(
        illegalFormat,
        overMinCount,
        overMaxCoun
      )
    }
  }

  private createHashAndSaltFrom(secret: string) {
    this.verifySecret(secret)
    this.salt = randomUUID()
    const hasher = new PasswordHasher()
    this.hash = hasher.hashing(secret, this.salt)
  }
}
