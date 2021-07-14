export interface SignUpUseCase {
  verifyEmailAddress(emailAddressPlaneText: string): void

  authenticationEmailAddress(emailAddressPlaneText: string): void

  authenticationEmailAddressByCode(code: string): void

  verifyPassword(passwordPlaneText: string): void
}

export interface AuthenticationEmailAdress {
  IssueAuthenticationCode(): Promise<void>

  verifyByAuthenticationCode(code: string): Promise<void>
}
