import { StringConvertible, ValueObject } from '../../core'

export class MichiekiUserScreenNameError extends Error {
  constructor(readonly overMinCount: boolean, readonly overMaxCoun: boolean) {
    super()
  }
}

export class MichiekiUserScreenName
  implements ValueObject<MichiekiUserScreenName>, StringConvertible
{
  private readonly maxCount: number = 24
  private readonly minCount: number = 4
  constructor(private readonly value: string) {}

  equals(target: MichiekiUserScreenName) {
    return this.value === target.value
  }

  toString() {
    return this.value
  }

  verifyScreenName() {
    const overMinCount = this.value.length > this.maxCount
    const overMaxCoun = this.value.length < this.minCount

    if (overMinCount || overMaxCoun) {
      throw new MichiekiUserScreenNameError(overMinCount, overMaxCoun)
    }
  }
}
