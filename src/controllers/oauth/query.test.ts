import { URLSearchParams } from 'url'

describe('URLSearchParams', () => {
  it('', async () => {
    const q = new URLSearchParams('hoge=1')
    const query = new URLSearchParams(q)
    expect(q.toString()).toBe(query.toString())
  })
})
