import { StringConvertible, ValueObject } from '../../core'

export class MichiekiUserScreenNameError extends Error {
  constructor(readonly overMinCount: boolean, readonly overMaxCoun: boolean) {
    super()
  }
}

export class MichiekiUserScreenName
  implements ValueObject<MichiekiUserScreenName>, StringConvertible
{
  readonly maxCount: number = 24
  readonly minCount: number = 4
  constructor(readonly screenName: string) {}

  equals(target: MichiekiUserScreenName) {
    return this.screenName === target.screenName
  }

  toString() {
    return this.screenName
  }

  verifyScreenName() {
    const overMinCount = this.screenName.length > this.maxCount
    const overMaxCoun = this.screenName.length < this.minCount

    if (overMinCount || overMaxCoun) {
      throw new MichiekiUserScreenNameError(overMinCount, overMaxCoun)
    }
  }
}
