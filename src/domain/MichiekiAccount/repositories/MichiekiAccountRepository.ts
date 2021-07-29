import { MichiekiAccount, MichiekiAccountID, MichiekiAccountEmailAddress } from '@app/domain'

export interface MichiekiAccountRepository {
  store(account: MichiekiAccount): Promise<MichiekiAccountID>
  findById(id: MichiekiAccountID): Promise<MichiekiAccount | null>
  findByEmailAddress(emailaddress: MichiekiAccountEmailAddress): Promise<MichiekiAccount | null>
}
