export class Coordinates {
  static readonly separator: string = ':'
  constructor(readonly lat: number, readonly lng: number) {
    if (isNaN(this.lat) || isNaN(this.lng)) throw new Error()
  }

  isEqual(coordinates: Coordinates): boolean {
    return this.lat === coordinates.lat && this.lng === coordinates.lng
  }

  static stringify(coordinates: Coordinates) {
    return `${coordinates.lat.toString()}${
      Coordinates.separator
    }${coordinates.lng.toString()}`
  }

  static parse(str: string) {
    const separatored = str.split(Coordinates.separator)
    if (separatored.length !== 2) throw new Error()
    return new Coordinates(Number(separatored[0]), Number(separatored[1]))
  }
}
