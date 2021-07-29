import { StringConvertible } from './StringConvertible'
import { ValueObject } from './ValueObject'

export abstract class ID implements ValueObject<ID>, StringConvertible {
  constructor() {}
  abstract value: string
  equals(comparisonTaret: this) {
    return this.value === comparisonTaret.value
  }

  toString() {
    return this.value
  }
}
