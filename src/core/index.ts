import glob from 'glob-promise'
import path from 'path'
export * from './logger'

export const gatherModules = async (globPattern: string, cwd: string) => {
  const files = await glob(globPattern, { cwd })
  // TODO: depends on tsconfig.
  return files
    .map((p) => require(path.join(cwd, p)))
    .map(Object.values)
    .flat()
}
