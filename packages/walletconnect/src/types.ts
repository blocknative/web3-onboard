import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'

export type WalletConnectOptions = {
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: string
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with walletconnect
   */
  dappUrl?: string
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
   * `undefined` by default, see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  qrModalOptions?: EthereumProviderOptions['qrModalOptions']
  /**
   * Additional required methods to be added to the default list of ['eth_sendTransaction', 'personal_sign']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/advanced/providers/ethereum#required-and-optional-methods
   */
  additionalRequiredMethods?: string[] | undefined
  /**
   * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  additionalOptionalMethods?: string[] | undefined
}
