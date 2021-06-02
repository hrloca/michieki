import 'reflect-metadata'
import { MichinoekiInMemoryRepository } from './MichinoekiInMemoruRepository'
import {
  MichinoekiID,
  MichinoekiCoordinates,
  MichinoekiName,
  MichinoekiPrefecture,
} from '@app/domain/entities/Michinoeki'
import { michinoekiJson } from '../resources'
import { createLogger } from '@app/core'

describe('MichinoekiStaticRepository', () => {
  const repos = new MichinoekiInMemoryRepository(michinoekiJson, createLogger())

  it('全件取得できること　', async () => {
    const result = await repos.findAll()
    expect(result.length).toBe(1145)
  })

  it('都道府県で絞り込めること', async () => {
    const pref = new MichinoekiPrefecture('長野県')
    const result = await repos.findByPrefecture(pref)
    expect(result.length).toBe(50)
    expect(result[0].prefecture.toString()).toBe('長野県')
  })

  it('idで取得できること', async () => {
    const id = MichinoekiID.from(
      new MichinoekiCoordinates(36.236692, 138.440822)
    )
    const result = await repos.findById(id)
    expect(result?.name.toString()).toBe('ヘルシーテラス佐久南')
  })

  it('idが存在しない場合はnullが返ること', async () => {
    const id = MichinoekiID.from(
      new MichinoekiCoordinates(36.236692, 138.440821)
    )
    const result = await repos.findById(id)
    expect(result).toBe(null)
  })

  it('名前で取得できること', async () => {
    const name = new MichinoekiName('ヘルシーテラス佐久南')
    const result = await repos.findByName(name)
    expect(result?.name.toString()).toBe('ヘルシーテラス佐久南')
  })

  it('名前が一致しない場合はnullが返ること', async () => {
    const result = await repos.findByName('ルシーテラス佐久南')
    expect(result).toBe(null)
  })
})
