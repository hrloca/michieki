import path from 'path'
import { ApolloServer } from 'apollo-server-koa'
import { buildSchema, ContainerGetter } from 'type-graphql'
import { gatherModules } from '@app/core'
import { AppContext } from '@app/types'

const containerGetterByTsyringe: ContainerGetter<AppContext> = ({
  context,
}) => ({
  get: (some) => context.container.resolve(some),
})

export const createApolloServer = async () => {
  // TODO: resolve type.
  const resolvers = (await gatherModules('**/*.resolver.ts', __dirname)) as any

  return new ApolloServer({
    playground: true,
    context: ({ ctx }) => ctx,
    schema: await buildSchema({
      container: containerGetterByTsyringe,
      resolvers,
      emitSchemaFile: {
        path: path.join(process.cwd(), 'dist', 'schema.graphql'),
        commentDescriptions: true,
      },
    }),
  })
}
