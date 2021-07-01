import { MichiekiUser } from '@app/domain'

export interface SignInInput {
  id: string
  password: string
}

export interface SignInUseCase {
  execute(input: SignInInput): MichiekiUser
}
