import 'reflect-metadata'
import { inject, container, injectable } from 'tsyringe'

interface IHoge {
  exec(): string
}

export class Hoge implements IHoge {
  exec() {
    return 'Hoge.exec'
  }
}

container.register('Hoge', Hoge)

@injectable()
export class Foo {
  constructor(@inject('Hoge') public myHoge: IHoge) {}
  exec() {
    return this.myHoge.exec()
  }
}

@injectable()
export class Bar {
  constructor(public myFoo: Foo) {}
}

describe('tsyringe test', () => {
  it('test', async () => {
    const myBar = container.resolve(Bar)
    expect(myBar.myFoo.exec()).toBe('Hoge.exec')
  })
})
