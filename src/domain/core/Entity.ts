import { ID } from './ID'
import { Identifiable } from './Identifiable'

export abstract class Entity<I extends ID> implements Identifiable<I> {
  abstract id: I
  equals(comparisonTaret: this) {
    return (
      this.constructor === comparisonTaret.constructor &&
      this.id.equals(comparisonTaret.id)
    )
  }
}
