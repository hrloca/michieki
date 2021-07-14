import { StringConvertible, ValueObject } from '../../core'

export class MichiekiUserAccountEmailAddressIllegalFormatError extends Error {
  message: '適切なメールアドレスの形式ではありません'
}

export class MichiekiUserAccountEmailAddress
  implements ValueObject<MichiekiUserAccountEmailAddress>, StringConvertible
{
  private readonly re: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
  private body: string
  constructor(emailadressPlanetext: string) {
    this.verify(emailadressPlanetext)
    this.body = emailadressPlanetext
  }

  equals(target: this): boolean {
    return this.body === target.body
  }

  toString(): string {
    return this.body
  }

  verify(planetext: string) {
    const result = this.re.test(planetext)
    if (!result) throw new MichiekiUserAccountEmailAddressIllegalFormatError()
  }
}
