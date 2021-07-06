class MichiekiUserNameCharacterCountRuleError extends Error {
  message: '名前の文字は20文字以内です。'
}

export class MichiekiUserDisplayName {
  private characterCountLimit: 20

  constructor(private body: string) {
    this.validate()
  }

  toString() {
    return this.body
  }

  private validate() {
    this.validateCharacterCount(this.body)
  }

  private validateCharacterCount(nameString: string) {
    if (nameString.length > this.characterCountLimit) {
      throw new MichiekiUserNameCharacterCountRuleError()
    }
  }
}
