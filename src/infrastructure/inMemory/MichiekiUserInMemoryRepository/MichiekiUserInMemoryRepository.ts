import { inject, injectable } from 'tsyringe'

import {
  MichiekiUserRepository,
  MichiekiUserID,
  MichiekiUser,
} from '@app/domain'

@injectable()
export class MichiekiUserInMemoryRepository implements MichiekiUserRepository {
  constructor(
    @inject('MichiekiUserInMemoryRepositoryDS')
    private readonly dataSource: Map<string, MichiekiUser>
  ) {}
  /**
   */
  async findById(id: MichiekiUserID) {
    const user = this.dataSource.get(id.source) || null
    return user
  }

  async store(user: MichiekiUser) {
    this.dataSource.set(user.id.source, user)
    return user.id
  }
}
