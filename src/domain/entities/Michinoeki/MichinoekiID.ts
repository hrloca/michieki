import { MichinoekiCoordinates } from './MichinoekiCoordinates'
import { ID } from '../../core'

export class MichinoekiID extends ID {
  constructor(readonly source: string) {
    super()
  }

  toString() {
    const buffer = Buffer.from(this.source)
    return buffer.toString('base64')
  }

  static stringify(id: MichinoekiID) {
    return id.toString()
  }

  static parse(maybeSerializeIdString: string): MichinoekiID {
    const deserializedString = Buffer.from(
      maybeSerializeIdString,
      'base64'
    ).toString()
    return new MichinoekiID(deserializedString)
  }

  static from(coordinates: MichinoekiCoordinates) {
    return new MichinoekiID(MichinoekiCoordinates.stringify(coordinates))
  }
}
