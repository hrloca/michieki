import { container, DependencyContainer } from 'tsyringe'
import { Logger } from 'winston'
import { michinoekiJson, MichinoekiJson } from '@app/infrastructure'
import { gatherModules } from '@app/core'

const resolveContainersDependency = async (cwd: string) => {
  await gatherModules('**/*.registry.ts', cwd)
}

export const createContainer = async (cwd: string) => {
  await resolveContainersDependency(cwd)

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
