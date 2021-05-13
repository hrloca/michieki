import { injectable, inject } from 'tsyringe'
import { MichinoekiRepository } from '@api/domain/repositories/MichinoekiRepository'
import { createMichinoekiFromFeature } from './createMichinoekiFromFeature'
import { MichinoekiJson } from '../resources'

import {
  MichinoekiID,
  MichinoekiCoordinates,
  MichinoekiName,
  MichinoekiPrefecture,
} from '@api/domain/entities/Michinoeki'

@injectable()
export class MichinoekiInMemoryRepository implements MichinoekiRepository {
  constructor(@inject('MichinoekiJson') private json: MichinoekiJson) {}

  /**
   */
  async findAll() {
    return this.json.features.map(createMichinoekiFromFeature)
  }

  /**
   */
  async findByPrefecture(prefecture: MichinoekiPrefecture) {
    return this.json.features
      .filter((feature) => feature.properties.P35_003 === prefecture.toString())
      .map(createMichinoekiFromFeature)
  }

  /**
   */
  async findById(id: MichinoekiID) {
    const result = await this.findByIds([id])
    if (!result.length) return null

    return result[0]
  }

  /**
   */
  async findByIds(ids: MichinoekiID[]) {
    return this.json.features
      .filter((feature) => {
        const targetId = MichinoekiID.from(
          new MichinoekiCoordinates(
            feature.properties.P35_001,
            feature.properties.P35_002
          )
        )

        return ids.some((id) => id.isEqualTo(targetId))
      })
      .map(createMichinoekiFromFeature)
  }

  /**
   */
  async findByName(name: MichinoekiName) {
    const targetFeature = this.json.features.find(
      (feature) => feature.properties.P35_006 === name.toString()
    )

    if (!targetFeature) return null

    return createMichinoekiFromFeature(targetFeature)
  }
}
