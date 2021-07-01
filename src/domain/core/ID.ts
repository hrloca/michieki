import { Equatable } from './Equatable'
import { StringConvertible } from './StringConvertible'

export abstract class ID implements Equatable<ID>, StringConvertible {
  constructor() {}
  abstract source: string
  equals(comparisonTaret: this) {
    return this.source === comparisonTaret.source
  }
}
