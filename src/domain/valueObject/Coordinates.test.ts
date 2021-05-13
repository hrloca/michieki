import { Coordinates } from './Coordinates'

describe('MichinoekiStaticRepository', () => {
  const coordinates = new Coordinates(10.01, 11.11)
  const coordinatesString = Coordinates.stringify(coordinates)

  it('coordinatesを文字列化できること', async () => {
    expect(coordinatesString).toBe('10.01:11.11')
  })

  it('coordinatesが同じことがわかること', async () => {
    const comparisonCoordinates = new Coordinates(10.01, 11.11)
    expect(comparisonCoordinates.isEqual(coordinates)).toBe(true)
  })

  it('coordinatesを復元できること', async () => {
    const parsedCoordinates = Coordinates.parse(coordinatesString)
    expect(parsedCoordinates.isEqual(coordinates)).toBe(true)
  })

  it('引数が正常な形式じゃないときにエラーを投げること', async () => {
    expect(() => new Coordinates(11.11, Number('bbb'))).toThrow()
    expect(() => new Coordinates(Number('aaa'), 11.11)).toThrow()
  })

  it('正常な形式じゃないときにエラーを投げること', async () => {
    expect(() => Coordinates.parse('11.11:22.22:11111.11')).toThrow()
    expect(() => Coordinates.parse('11.11')).toThrow()
  })
})
