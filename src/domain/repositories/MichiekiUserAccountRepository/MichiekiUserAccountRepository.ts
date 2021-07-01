import {
  MichiekiUserAccount,
  MichiekiUserAccountID,
  MichiekiUserAccountMailAddress,
} from '@app/domain'

export interface MichiekiUserAccountRepository {
  store(account: MichiekiUserAccount): Promise<MichiekiUserAccountID>
  findById(id: MichiekiUserAccountID): Promise<MichiekiUserAccount | null>
  findByEmailAddress(
    emailaddress: MichiekiUserAccountMailAddress
  ): Promise<MichiekiUserAccount | null>
}
