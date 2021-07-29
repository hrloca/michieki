import { container } from 'tsyringe'
import { InMemoryMichiekiAccountRepository } from './InMemoryMichiekiAccountRepository'

container.register(
  'MichiekiAccountRepository',
  InMemoryMichiekiAccountRepository
)
