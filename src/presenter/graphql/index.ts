import path from 'path'
import { Context } from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { resolvers } from './resolvers'
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

export const createApolloServer = async () => {
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
