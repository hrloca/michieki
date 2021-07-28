import validator from 'validator'
import { StringConvertible, ValueObject } from '../../core'

export class MichiekiAccountEmailAddressError extends Error {}

export class MichiekiAccountEmailAddress
  implements ValueObject<MichiekiAccountEmailAddress>, StringConvertible
{
  private body: string
  constructor(emailadressPlanetext: string) {
    this.validate(emailadressPlanetext)
    this.body = emailadressPlanetext
  }

  equals(target: this): boolean {
    return this.body === target.body
  }

  toString(): string {
    return this.body
  }

  private validate(planetext: string) {
    const result = validator.isEmail(planetext)
    if (!result) throw new MichiekiAccountEmailAddressError()
  }
}
