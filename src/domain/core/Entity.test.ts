import 'reflect-metadata'
import { ID } from './ID'
import { Entity } from './Entity'

export class TestID implements ID {
  constructor(readonly value: string) {}
  equals(comparisonTaret: TestID): boolean {
    return this.value === comparisonTaret.value
  }
}

export class Test3ID implements ID {
  constructor(readonly value: string) {}
  hoge() {}
  equals(comparisonTaret: Test3ID): boolean {
    return this.value === comparisonTaret.value
  }
}

export class TestUser extends Entity<TestID> {
  constructor(readonly id: TestID) {
    super()
  }
}

export class Test2User extends Entity<TestID> {
  constructor(readonly id: TestID) {
    super()
  }
}

describe('entityの同一性テスト', () => {
  const id = new TestID('test')
  it('entityインスタンスが同じ、かつidが同じであれば同一であること', async () => {
    const test = new TestUser(id)
    const test2 = new TestUser(id)
    expect(test.equals(test2)).toBe(true)
  })

  it('entityのインスタンス(構造が同一)が違う場合、idが同じででも同一ではないこと', async () => {
    const id = new TestID('test')
    const test = new TestUser(id)
    const test2 = new Test2User(id)
    expect(test2.equals(test)).toBe(false)
  })
})
