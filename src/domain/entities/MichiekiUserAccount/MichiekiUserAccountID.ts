import { ID } from '../../core'

export class MichiekiUserAccountID extends ID {
  constructor(readonly source: string) {
    super()
  }
}
