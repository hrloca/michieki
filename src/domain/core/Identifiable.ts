import { Equatable } from './Equatable'
import { ID } from './ID'

export interface Identifiable<I extends ID> extends Equatable<Identifiable<I>> {
  id: I
}
