import {
  MichiekiUserAccount,
  MichiekiUserAccountID,
  MichiekiUserAccountEmailAddress,
} from '@app/domain'

export interface MichiekiUserAccountRepository {
  store(account: MichiekiUserAccount): Promise<MichiekiUserAccountID>
  findById(id: MichiekiUserAccountID): Promise<MichiekiUserAccount | null>
  findByEmailAddress(
    emailaddress: MichiekiUserAccountEmailAddress
  ): Promise<MichiekiUserAccount | null>
}
