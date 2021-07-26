import { container } from 'tsyringe'
import {
  InMemoryMichiekiAccountRepository,
  InMemoryMichiekiAccountDS,
} from './InMemoryMichiekiAccountRepository'
import { MichiekiAccount } from '@app/domain'

container.register(
  'MichiekiAccountRepository',
  InMemoryMichiekiAccountRepository
)

container.register('InMemoryMichiekiAccountDS', {
  useValue: new InMemoryMichiekiAccountDS(new Map<string, MichiekiAccount>()),
})
