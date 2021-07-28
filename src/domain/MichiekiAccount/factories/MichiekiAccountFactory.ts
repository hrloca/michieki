import { randomUUID } from 'crypto'
import { injectable } from 'tsyringe'
import { MichiekiAccount } from '../entities'
import {
  MichiekiAccountPassword,
  MichiekiAccountEmailAddress,
  MichiekiAccountID,
  MichiekiAccountSecret,
} from '../valueObjects'

export interface MichiekiAccountFactory {
  create(
    emailadressPlaneText: string,
    passwordPlaneText: string
  ): MichiekiAccount
}

@injectable()
export class MichiekiAccountFactoryFromUUID implements MichiekiAccountFactory {
  create(emailadressPlaneText: string, passwordPlaneText: string) {
    const id = new MichiekiAccountID(randomUUID())
    const email = new MichiekiAccountEmailAddress(emailadressPlaneText)
    const password = new MichiekiAccountPassword(
      new MichiekiAccountSecret(passwordPlaneText)
    )
    const account = new MichiekiAccount(id, email, password)

    return account
  }
}
