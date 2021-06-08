import { container } from 'tsyringe'
import { MichinoekiInMemoryRepository } from './MichinoekiInMemoruRepository'

container.register('MichinoekiRepository', MichinoekiInMemoryRepository)
