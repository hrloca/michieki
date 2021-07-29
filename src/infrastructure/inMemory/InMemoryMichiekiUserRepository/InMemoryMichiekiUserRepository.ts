import { inject, injectable } from 'tsyringe'

import {
  MichiekiUserRepository,
  MichiekiUserID,
  MichiekiUser,
  MichiekiUserScreenName,
} from '@app/domain'

export class InMemoryMichiekiUserDS {
  constructor(readonly store: Map<string, MichiekiUser>) {}
}

@injectable()
export class InMemoryMichiekiUserRepository implements MichiekiUserRepository {
  constructor(
    @inject('InMemoryMichiekiUserDS')
    private readonly data: InMemoryMichiekiUserDS
  ) {}
  /**
   */
  async findById(id: MichiekiUserID) {
    const user = this.data.store.get(id.value) || null
    return user
  }

  async findByScreenName(screenName: MichiekiUserScreenName) {
    const screenNamePlaneText = screenName.toString()
    for (let user of this.data.store.values()) {
      const userScreenNamePlaneText = user.screenName.toString()
      if (screenNamePlaneText === userScreenNamePlaneText) return user
    }
    return null
  }

  async store(user: MichiekiUser) {
    this.data.store.set(user.id.value, user)
    return user.id
  }
}
