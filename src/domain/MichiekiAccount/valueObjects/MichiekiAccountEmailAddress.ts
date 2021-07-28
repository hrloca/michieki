import validator from 'validator'
import { StringConvertible, ValueObject } from '../../core'

export class MichiekiAccountEmailAddressError extends Error {}

export class MichiekiAccountEmailAddress
  implements ValueObject<MichiekiAccountEmailAddress>, StringConvertible
{
  private value: string
  constructor(emailadressPlanetext: string) {
    this.validate(emailadressPlanetext)
    this.value = emailadressPlanetext
  }

  equals(target: this): boolean {
    return this.value === target.value
  }

  toString(): string {
    return this.value
  }

  private validate(planetext: string) {
    const result = validator.isEmail(planetext)
    if (!result) throw new MichiekiAccountEmailAddressError()
  }
}
