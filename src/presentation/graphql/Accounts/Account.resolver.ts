import {
  Root,
  FieldResolver,
  Arg,
  Mutation,
  Field,
  InputType,
  Query,
  Resolver,
} from 'type-graphql'
import { inject, injectable } from 'tsyringe'
import { Account } from './Account'
import { User } from '../Users'
import { AccountRegister } from '@app/usecase'
import { MichiekiAccountRepository, MichiekiAccountID } from '@app/domain'

@InputType()
export class RegisterInput {
  @Field()
  emailAddress: string

  @Field()
  password: string
}

@Resolver(Account)
@injectable()
export class AccountResolver {
  constructor(
    @inject('MichiekiAccountRepository')
    private readonly accountRepos: MichiekiAccountRepository,
    private readonly accountRegistrationUsecase: AccountRegister
  ) {}

  @Query(() => Account, { nullable: true })
  async account(@Arg('id') id: string) {
    const account = await this.accountRepos.findById(new MichiekiAccountID(id))
    return account
      ? {
          id: account.id.toString(),
          emailAddress: account.emailAddress.toString(),
          userId: account.userId?.toString(),
        }
      : null
  }

  @FieldResolver(() => User, { nullable: true })
  user(@Root() account: Account) {
    return !account.userId
      ? {
          id: 'string',
          displayName: 'string',
          screenName: 'string',
        }
      : null
  }

  @Mutation(() => Account, { description: 'アカウントを登録する。' })
  async accountRegister(@Arg('input') registerInput: RegisterInput) {
    const id = await this.accountRegistrationUsecase.register(
      registerInput.emailAddress,
      registerInput.password
    )

    return {
      id: id,
      emailAddress: registerInput.emailAddress,
      userId: 'string',
    }
  }

  @Mutation(() => String, { description: 'メールアドレスのバリデーション。' })
  async emailaddressValidate(@Arg('email') email: string) {
    // TODO
    throw new Error(email)
  }
}
