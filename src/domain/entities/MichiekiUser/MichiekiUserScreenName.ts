import { StringConvertible, ValueObject } from '../../core'

export class MichiekiUserScreenNameMaxCountOverError extends Error {
  message: `idの長さが最大値を超えています。`
}

export class MichiekiUserScreenNameMinCountOverError extends Error {
  message: `idの長さが最小値を下回っています。`
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
    if (this.screenName.length > this.maxCount)
      throw new MichiekiUserScreenNameMaxCountOverError()

    if (this.screenName.length < this.minCount)
      throw new MichiekiUserScreenNameMinCountOverError()
  }
}
