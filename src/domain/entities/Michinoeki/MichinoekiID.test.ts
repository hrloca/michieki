import 'reflect-metadata'
import { MichinoekiID } from './MichinoekiID'

describe('MichinoekiStaticRepository', () => {
  const id = new MichinoekiID('hoge')

  it('Souerceが同じであればIDが同じであること', async () => {
    const otherId = new MichinoekiID('hoge')
    expect(id.equals(otherId)).toBe(true)
  })

  it('文字列化して復元できること', async () => {
    const parsed = MichinoekiID.parse(MichinoekiID.stringify(id))
    expect(parsed.equals(id)).toBe(true)
  })
})
