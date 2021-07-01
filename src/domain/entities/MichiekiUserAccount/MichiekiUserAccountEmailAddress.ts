import { StringConvertible } from '../../core'

export class MichiekiUserAccountEmailAddress implements StringConvertible {
  private readonly re: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
  body: string
  constructor(emailadressPlanetext: string) {
    this.verify(emailadressPlanetext)
    this.body = emailadressPlanetext
  }

  verify(planetext: string) {
    const result = this.re.test(planetext)
    if (!result) throw new Error('適切なメールアドレスの形式ではありません')
  }

  toString() {
    return this.body
  }
}
