import { container } from 'tsyringe'
import { MichiekiUserAccountInMemoryRepository } from './MichiekiUserAccountInMemoryRepository'
import { MichiekiUserAccount } from '@app/domain'

container.register(
  'MichiekiUserAccountRepository',
  MichiekiUserAccountInMemoryRepository
)

container.register('MichiekiUserAccountInMemoryRepositoryDS', {
  useValue: new Map<string, MichiekiUserAccount>(),
})
