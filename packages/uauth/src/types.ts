export type UauthInitOptions = {
  /**
   * Required and will throw an error if not included: links dapp to Unstoppable Domains for customization
   */
  clientID: string
  /**
   * Required and will throw an error if not included: used for pop-up and callback redirection
   */
  redirectUri: string
  /**
   * Optional string: Default = 'openid wallet'
   */
  scope?: string
  /**
   * Optional boolean: If true, redirects to your callback page
   */
  shouldLoginWithRedirect?: boolean
  /**
   * Optional url string: default = 'https://derelay.rabby.io'
   */
  bridge?: string
  qrcodeModalOptions?: {
    /**
     * Optional array of strings: Set the order and list of mobile linking wallets
     */
    mobileLinks: string[]
  }
  /**
   * Optional boolean: If true, connects to the first network chain provided
   */
  connectFirstChainId?: boolean
}
