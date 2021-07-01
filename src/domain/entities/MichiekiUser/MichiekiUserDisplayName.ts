class MichiekiUserNameCharacterCountRuleError extends Error {
  message: '名前の文字は20文字以内です。'
}

export class MichiekiUserDisplayName {
  body: string

  private characterCountLimit: 20

  constructor(nameString: string) {
    this.validate(nameString)
    this.body = nameString
  }

  toString() {
    return this.body
  }

  private validate(nameString: string) {
    this.validateCharacterCount(nameString)
  }

  private validateCharacterCount(nameString: string) {
    if (nameString.length > this.characterCountLimit) {
      throw new MichiekiUserNameCharacterCountRuleError()
    }
  }
}
