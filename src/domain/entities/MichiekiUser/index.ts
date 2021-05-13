// MichiekiUser

export class MichiekiUserID extends String {}
export class MichiekiUserName extends String {}

export class MichiekiUser {
  constructor(readonly id: MichiekiUserID, readonly name: MichiekiUserName) {}
}
