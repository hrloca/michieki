import { StringConvertible } from './StringConvertible'
import { ValueObject } from './ValueObject'

export abstract class ID implements ValueObject<ID>, StringConvertible {
  constructor() {}
  abstract source: string
  equals(comparisonTaret: this) {
    return this.source === comparisonTaret.source
  }

  toString() {
    return this.source
  }
}
