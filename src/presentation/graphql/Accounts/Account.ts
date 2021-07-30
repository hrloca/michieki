import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Account {
  @Field((type) => ID)
  id: string

  @Field()
  emailAddress: string

  @Field({ nullable: true })
  userId?: string
}
