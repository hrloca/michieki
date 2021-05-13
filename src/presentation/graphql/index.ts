import path from 'path'
import glob from 'glob-promise'
import { Context } from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { DependencyContainer } from 'tsyringe'
import { buildSchema, ContainerGetter } from 'type-graphql'

interface AppContext extends Context {
  container: DependencyContainer
}

const containerGetterByTsyringe: ContainerGetter<AppContext> = ({
  context,
}) => ({
  get: (some) => context.container.resolve(some),
})

const gatherResolvers = async () => {
  const files = await glob('**/*.resolver.ts', { cwd: __dirname })
  // TODO: depends on tsconfig.
  return files
    .map((p) => require(`./${p}`))
    .map(Object.values)
    .flat()
}

export const createApolloServer = async () => {
  // TODO: resolve type.
  const resolvers = (await gatherResolvers()) as any

  return new ApolloServer({
    playground: true,
    context: ({ ctx }) => ctx,
    schema: await buildSchema({
      container: containerGetterByTsyringe,
      resolvers,
      emitSchemaFile: {
        path: path.join('dist', 'schema.graphql'),
        commentDescriptions: true,
      },
    }),
  })
}
