import { Entity } from '../../core'
import { MichinoekiID } from './MichinoekiID'
import { MichinoekiFacility } from './MichinoekiFacility'
import { MichinoekiCoordinates } from './MichinoekiCoordinates'

export class MichinoekiName extends String {}
export class MichinoekiPrefecture extends String {}
export class MichinoekiMunicipality extends String {}
export class MichinoekiHomePage extends String {}

export class Michinoeki extends Entity<MichinoekiID> {
  constructor(
    readonly id: MichinoekiID,
    readonly name: MichinoekiName,
    readonly prefecture: MichinoekiPrefecture,
    readonly municipality: MichinoekiMunicipality,
    readonly homePage: MichinoekiHomePage,
    readonly coordinates: MichinoekiCoordinates,
    readonly facility: MichinoekiFacility
  ) {
    super()
  }
}
