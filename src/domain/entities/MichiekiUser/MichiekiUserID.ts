import { ID } from '../../core'

export class MichiekiUserID extends ID {
  readonly maxCount: number = 24
  readonly minCount: number = 4
  constructor(readonly source: string) {
    super()
    this.verifyStringCount()
  }

  verifyStringCount() {
    if (this.source.length > this.maxCount)
      throw new Error(`idの長さが最大値を超えています。`)

    if (this.source.length < this.minCount)
      throw new Error(`idの長さが最小値を下回っています。`)
  }
}
