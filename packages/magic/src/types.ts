export type LoginOptions = {
  walletName: string
  brandingHTMLString: string
  emailLoginFunction: EmailLoginFunction
}

export type MagicInitOptions = {
  apiKey: string
  userEmail?: string
}

export type EmailLoginFunction = (emailAddress: string) => Promise<boolean>
