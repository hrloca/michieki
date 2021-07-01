import { ID } from '../../core'

export class MichiekiUserID extends ID {
  private readonly maxCount: number = 24
  constructor(readonly source: string) {
    super()
    this.verifyStringCount()
  }

  verifyStringCount() {
    if (this.source.length > this.maxCount) {
      throw new Error(`idの長さが${this.maxCount}を超えています。`)
    }
  }
}
