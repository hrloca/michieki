import { inject, injectable } from 'tsyringe'

import {
  MichiekiUserRepository,
  MichiekiUserID,
  MichiekiUser,
} from '@app/domain'

export class MichiekiUserInMemoryDS {
  constructor(readonly store: Map<string, MichiekiUser>) {}
}

@injectable()
export class MichiekiUserInMemoryRepository implements MichiekiUserRepository {
  constructor(
    @inject('MichiekiUserInMemoryRepositoryDS')
    private readonly data: MichiekiUserInMemoryDS
  ) {}
  /**
   */
  async findById(id: MichiekiUserID) {
    const user = this.data.store.get(id.source) || null
    return user
  }

  async store(user: MichiekiUser) {
    this.data.store.set(user.id.source, user)
    return user.id
  }
}
