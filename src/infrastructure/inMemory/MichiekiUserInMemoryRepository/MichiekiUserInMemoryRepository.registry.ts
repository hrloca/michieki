import { container } from 'tsyringe'
import { MichiekiUserInMemoryRepository } from './MichiekiUserInMemoryRepository'
import { MichiekiUser } from '@app/domain'

container.register('MichiekiUserRepository', MichiekiUserInMemoryRepository)
container.register('MichiekiUserInMemoryRepositoryDS', {
  useValue: new Map<string, MichiekiUser>(),
})
