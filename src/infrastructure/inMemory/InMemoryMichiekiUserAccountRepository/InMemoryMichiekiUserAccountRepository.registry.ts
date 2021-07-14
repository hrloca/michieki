import { container } from 'tsyringe'
import {
  InMemoryMichiekiUserAccountRepository,
  InMemoryMichiekiUserAccountDS,
} from './InMemoryMichiekiUserAccountRepository'
import { MichiekiAccount } from '@app/domain'

container.register(
  'MichiekiUserAccountRepository',
  InMemoryMichiekiUserAccountRepository
)

container.register('InMemoryMichiekiUserAccountDS', {
  useValue: new InMemoryMichiekiUserAccountDS(
    new Map<string, MichiekiAccount>()
  ),
})
