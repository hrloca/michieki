import { MichinoekiCoordinates } from './MichinoekiCoordinates'

export class MichinoekiID {
  constructor(private readonly originalIdentificationSource: string) {}

  private equal(compare: MichinoekiID, compared: MichinoekiID) {
    return (
      compare.originalIdentificationSource ===
      compared.originalIdentificationSource
    )
  }

  toString() {
    const buffer = Buffer.from(this.originalIdentificationSource)
    return buffer.toString('base64')
  }

  isEqualTo(id: MichinoekiID) {
    return this.equal(this, id)
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
