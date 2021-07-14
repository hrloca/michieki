import {
  Michinoeki,
  MichinoekiID,
  MichinoekiName,
  MichinoekiPrefecture,
  MichinoekiMunicipality,
  MichinoekiHomePage,
  MichinoekiCoordinates,
  MichinoekiFacility,
} from '@app/domain/entities/Michinoeki'

import { michinoekiJson } from '../resources'

const hasFacilityFromFeature = (flg: number) => flg === 1

export const createMichinoekiFromFeature = (
  feature: typeof michinoekiJson.features[0]
) => {
  const coordinates = new MichinoekiCoordinates(
    feature.properties.P35_001,
    feature.properties.P35_002
  )
  const id = MichinoekiID.from(coordinates)

  const name = new MichinoekiName(feature.properties.P35_006)

  const prefecture = new MichinoekiPrefecture(feature.properties.P35_003)

  const municipality = new MichinoekiMunicipality(feature.properties.P35_004)

  const homepage = new MichinoekiHomePage(feature.properties.P35_007)

  const facility = new MichinoekiFacility(
    hasFacilityFromFeature(feature.properties.P35_011),
    hasFacilityFromFeature(feature.properties.P35_012),
    hasFacilityFromFeature(feature.properties.P35_013),
    hasFacilityFromFeature(feature.properties.P35_014),
    hasFacilityFromFeature(feature.properties.P35_015),
    hasFacilityFromFeature(feature.properties.P35_016),
    hasFacilityFromFeature(feature.properties.P35_017),
    hasFacilityFromFeature(feature.properties.P35_018),
    hasFacilityFromFeature(feature.properties.P35_019),
    hasFacilityFromFeature(feature.properties.P35_020),
    hasFacilityFromFeature(feature.properties.P35_021),
    hasFacilityFromFeature(feature.properties.P35_022),
    hasFacilityFromFeature(feature.properties.P35_023),
    hasFacilityFromFeature(feature.properties.P35_024),
    hasFacilityFromFeature(feature.properties.P35_025),
    hasFacilityFromFeature(feature.properties.P35_026),
    hasFacilityFromFeature(feature.properties.P35_027),
    hasFacilityFromFeature(feature.properties.P35_028)
  )

  return new Michinoeki(
    id,
    name,
    prefecture,
    municipality,
    homepage,
    coordinates,
    facility
  )
}
