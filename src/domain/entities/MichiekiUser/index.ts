import { Entity, ID } from '../../core'

export class MichiekiUserID implements ID {
  constructor(readonly source: string) {}

  equals(comparisonTaret: MichiekiUserID) {
    return this.source === comparisonTaret.source
  }
}
export class MichiekiUserName extends String {}

export class MichiekiUser extends Entity<MichiekiUserID> {
  constructor(readonly id: MichiekiUserID, readonly name: MichiekiUserName) {
    super()
  }
}
