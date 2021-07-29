import { Michinoeki, MichinoekiID, MichinoekiName, MichinoekiPrefecture } from '@app/domain'

export interface MichinoekiRepository {
  findAll(): Promise<Michinoeki[]>

  findById(id: MichinoekiID): Promise<Michinoeki | null>

  findByIds(ids: MichinoekiID[]): Promise<Michinoeki[]>

  findByName(name: MichinoekiName): Promise<Michinoeki | null>

  findByPrefecture(prefecture: MichinoekiPrefecture): Promise<Michinoeki[]>
}
