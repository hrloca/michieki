import { StringConvertible } from '../../core'

export class MichiekiUserScreenName implements StringConvertible {
  readonly maxCount: number = 24
  readonly minCount: number = 4
  constructor(readonly screenName: string) {}

  toString() {
    return this.screenName
  }

  verifyScreenName() {
    if (this.screenName.length > this.maxCount)
      throw new Error(`idの長さが最大値を超えています。`)

    if (this.screenName.length < this.minCount)
      throw new Error(`idの長さが最小値を下回っています。`)
  }
}
