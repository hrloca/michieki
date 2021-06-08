import { ObjectType, Field, ID } from 'type-graphql'
import { Michinoeki as MichinoekiEntity } from '@app/domain'

@ObjectType()
export class MichinoekiFacility {
  @Field()
  hasATM: boolean
  @Field()
  hasBabyBed: boolean
  @Field()
  hasRestaurant: boolean
  @Field()
  hasCafe: boolean
  @Field()
  hasHotel: boolean
  @Field()
  hasHotSpring: boolean
  @Field()
  hasCampSite: boolean
  @Field()
  hasPark: boolean
  @Field()
  hasObservatory: boolean
  @Field()
  hasMuseums: boolean
  @Field()
  hasGasStation: boolean
  @Field()
  hasEVChargingFacility: boolean
  @Field()
  hasWifi: boolean
  @Field()
  hasShower: boolean
  @Field()
  hasExperienceFacility: boolean
  @Field()
  hasTouristInformation: boolean
  @Field()
  hasToiletForThePhysicallyChallenged: boolean
  @Field()
  hasShop: boolean
}

@ObjectType()
export class Michinoeki {
  @Field((type) => ID)
  id: string

  @Field()
  name: string

  @Field()
  prefecture: string

  @Field()
  municipality: string

  @Field()
  homePage: string

  @Field()
  lat: number

  @Field()
  lng: number

  @Field((type) => MichinoekiFacility)
  facility: MichinoekiFacility

  static present(eki: MichinoekiEntity): Michinoeki {
    return {
      id: eki.id.toString(),
      name: eki.name.toString(),
      prefecture: eki.prefecture.toString(),
      municipality: eki.municipality.toString(),
      homePage: eki.homePage.toString(),
      lat: eki.coordinates.lat,
      lng: eki.coordinates.lng,
      facility: eki.facility,
    }
  }
}
