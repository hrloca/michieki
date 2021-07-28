import { ValueObject, StringConvertible } from '../../core'

export class MichiekiUserNameCharacterMaxCountOverError extends Error {
  message: '名前の文字数の最大値を超えています。'
}

export class MichiekiUserNameCharacterMinCountOverError extends Error {
  message: '名前の文字数が最小値を満たしていません。'
}

export class MichiekiUserDisplayName
  implements ValueObject<MichiekiUserDisplayName>, StringConvertible
{
  private readonly characterMaxCount: 20
  private readonly characterMinCount: 2

  constructor(private readonly value: string) {
    this.validate()
  }

  equals(target: MichiekiUserDisplayName) {
    return this.value === target.value
  }

  toString() {
    return this.value
  }

  private validate() {
    this.validateCharacterCount(this.value)
  }

  private validateCharacterCount(nameString: string) {
    if (nameString.length > this.characterMaxCount) {
      throw new MichiekiUserNameCharacterMaxCountOverError()
    }

    if (nameString.length < this.characterMinCount) {
      throw new MichiekiUserNameCharacterMinCountOverError()
    }
  }
}
