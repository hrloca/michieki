import { injectable, inject } from 'tsyringe'
import { Logger } from 'winston'
import { MichinoekiRepository } from '@app/domain'
import { createMichinoekiFromFeature } from './createMichinoekiFromFeature'
import { MichinoekiJson } from '../resources'

import {
  MichinoekiID,
  MichinoekiCoordinates,
  MichinoekiName,
  MichinoekiPrefecture,
} from '@app/domain/entities/Michinoeki'

@injectable()
export class MichinoekiInMemoryRepository implements MichinoekiRepository {
  log: Logger
  constructor(
    @inject('MichinoekiJson') private json: MichinoekiJson,
    @inject('logger') private logger: Logger
  ) {
    this.log = this.logger.child({ className: this.constructor.name })
  }

  /**
   */
  async findAll() {
    this.log.info('BEGIN', { methodName: this.findAll.name })

    const data = this.json.features.map(createMichinoekiFromFeature)
    return data
  }

  /**
   */
  async findByPrefecture(prefecture: MichinoekiPrefecture) {
    const result = this.json.features
      .filter((feature) => feature.properties.P35_003 === prefecture.toString())
      .map(createMichinoekiFromFeature)

    return result
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

        return ids.some((id) => id.equals(targetId))
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
