import { container } from 'tsyringe'
import { InMemoryMichinoekiRepository } from './InMemoryMichinoekiRepository'

container.register('MichinoekiRepository', InMemoryMichinoekiRepository)
