import { Query, Resolver } from 'type-graphql'
import { injectable } from 'tsyringe'
import { User } from './User'

@Resolver(User)
@injectable()
export class UserResolver {
  constructor() {}

  @Query((returns) => User)
  async user(): Promise<User> {
    return {
      id: 'string',
      displayName: 'string',
      screenName: 'string',
    }
  }
}
