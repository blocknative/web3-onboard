import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'

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
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  walletConnectProjectId: string
  /**
   * List of Required Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to [1] - Ethereum
   */
  requiredChains?: number[] | undefined
  /**
   * List of Optional Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to the chains provided within the web3-onboard init chain property
   */
  optionalChains?: number[] | undefined
  /**
   * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  additionalOptionalMethods?: string[] | undefined
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
}
