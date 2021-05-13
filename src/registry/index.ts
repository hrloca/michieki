import { container, DependencyContainer } from 'tsyringe'
import { Logger } from 'winston'
import { MichinoekiRepository } from '@app/domain/repositories/MichinoekiRepository'
import {
  michinoekiJson,
  MichinoekiJson,
  MichinoekiInMemoryRepository,
} from '@app/infrastructure'
import { MichinoekiResolver } from '@app/presentation/graphql/Michinoeki/Michinoeki.resolver'
import {
  FindAllMichinoekiUseCase,
  FindAllMichinoekiInteractor,
} from '@app/usecase'

export const createContainer = async () => {
  // repositories
  container.register<MichinoekiRepository>('MichinoekiRepository', {
    useClass: MichinoekiInMemoryRepository,
  })
  // usecase
  container.register<FindAllMichinoekiUseCase>('FindAllMichinoekiInteractor', {
    useClass: FindAllMichinoekiInteractor,
  })
  // resolvers
  container.register<MichinoekiResolver>('MichinoekiResolver', {
    useClass: MichinoekiResolver,
  })
  // values
  container.register<MichinoekiJson>('MichinoekiJson', {
    useValue: michinoekiJson,
  })

  return container
}

interface ScopedContext {
  requestId: string
  logger: Logger
}

export const registerScopedContainer = (
  baseContainer: DependencyContainer,
  { requestId, logger }: ScopedContext
) => {
  const child = baseContainer.createChildContainer()
  child.register<string>('requestId', { useValue: requestId })
  child.register<Logger>('logger', { useValue: logger })

  return child
}
