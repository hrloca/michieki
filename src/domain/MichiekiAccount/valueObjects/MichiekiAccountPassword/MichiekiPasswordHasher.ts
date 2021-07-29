import { pbkdf2Sync } from 'crypto'

export class MichiekiPasswordHasher {
  private readonly iterations: number = 4000
  private readonly keylen: number = 64
  private readonly digest: string = 'sha512'

  hashing(secret: string, salt: string): string {
    return pbkdf2Sync(secret, salt, this.iterations, this.keylen, this.digest).toString('hex')
  }
}
