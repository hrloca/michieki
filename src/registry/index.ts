import { container, DependencyContainer } from 'tsyringe'
import { Logger } from 'winston'
import { michinoekiJson, MichinoekiJson } from '@app/infrastructure'
import { gatherModules } from '@app/core'

export const createContainer = async () => {
  await gatherModules('**/*.registry.ts', __dirname)

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
