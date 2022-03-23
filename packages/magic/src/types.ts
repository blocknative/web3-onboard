export type LoginOptions = {
  walletName: string
  brandingHTMLString: string
  emailLoginFunction: EmailLoginFunction
}

export type EmailLoginFunction = (emailAddress: string) => Promise<boolean>
