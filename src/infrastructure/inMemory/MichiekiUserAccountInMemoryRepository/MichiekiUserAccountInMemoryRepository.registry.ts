import { container } from 'tsyringe'
import {
  MichiekiUserAccountInMemoryRepository,
  MichiekiUserAccountInMemoryDS,
} from './MichiekiUserAccountInMemoryRepository'
import { MichiekiUserAccount } from '@app/domain'

container.register(
  'MichiekiUserAccountRepository',
  MichiekiUserAccountInMemoryRepository
)

container.register('MichiekiUserAccountInMemoryRepositoryDS', {
  useValue: new MichiekiUserAccountInMemoryDS(
    new Map<string, MichiekiUserAccount>()
  ),
})
