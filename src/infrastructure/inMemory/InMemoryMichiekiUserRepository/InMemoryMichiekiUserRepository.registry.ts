import { container } from 'tsyringe'
import { InMemoryMichiekiUserRepository } from './InMemoryMichiekiUserRepository'
import { MichiekiUser } from '@app/domain'

container.register('MichiekiUserRepository', InMemoryMichiekiUserRepository)
container.register('InMemoryMichiekiUserDS', {
  useValue: new Map<string, MichiekiUser>(),
})
