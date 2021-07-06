import { inject, injectable } from 'tsyringe'
import {
  MichiekiUserRepository,
  MichiekiUserID,
  MichiekiUserDisplayName,
  MichiekiUser,
} from '@app/domain'

interface CreateUserInput {
  idPlaneText: string
  displayNamePlateText: string
}

@injectable()
export class MichiekiUserService {
  constructor(
    @inject('MichiekiUserRepository')
    readonly userRepos: MichiekiUserRepository
  ) {}

  async createUser(input: CreateUserInput) {
    const id = new MichiekiUserID(input.idPlaneText)
    const displayName = new MichiekiUserDisplayName(input.displayNamePlateText)
    return new MichiekiUser(id, displayName)
  }

  async isDuplicatedUserID(id: MichiekiUserID): Promise<boolean> {
    const account = await this.userRepos.findById(id)
    return !!account
  }
}
