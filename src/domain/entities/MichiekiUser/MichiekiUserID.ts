import { ID } from '../../core'

export class MichiekiUserID extends ID {
  constructor(readonly source: string) {
    super()
  }
}
