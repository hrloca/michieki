import { ID } from '../../core'

export class MichiekiAccountID extends ID {
  constructor(readonly source: string) {
    super()
  }
}
