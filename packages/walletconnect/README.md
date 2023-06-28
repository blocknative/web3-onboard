# @web3-onboard/walletconnect

## Wallet module for connecting Wallet Connect to web3-onboard

### Install

`npm i @web3-onboard/core @web3-onboard/walletconnect`

## Version 1 of WalletConnect has been deprecated

_Version 1 of WalletConnect has been deprecated by the WC team and the WC bridge is not available. If wanting to continue to use WalletConnect V1 a custom bridge URL is required. Support will be completely remove from Web3-Onboard in the future_

## Options

```typescript
type WalletConnectOptions = {
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
  connectFirstChainId?: boolean
  bridge?: string
  qrcodeModalOptions?: {
    mobileLinks: string[]
  }
} & (
  | {
      /**
       * @deprecated
       * Defaults to version: 2 if undefined.
       * Version 1 of WalletConnect has been deprecated by the WC team
       * and the WC bridge is not available
       * Support will be completely remove from Web3-Onboard in the future
       */
      version: 1
    }
  | {
      /**
       * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
       */
      projectId: string
      /**
       * Defaults to version: 2
       */
      version?: 2
      /**
       * List of Required Chain(s) ID for wallets to support in number format (integer or hex)
       * Defaults to [1] - Ethereum
       * The chains defined within the web3-onboard config will define the
       * optional chains for the WalletConnect module
       */
      requiredChains?: number[] | undefined
      /**
       * `undefined` by default, see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
       */
      qrModalOptions?: EthereumProviderOptions['qrModalOptions']
      /**
       * Defaults to include ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
       * Pass methods to be included with the defaults methods if needed - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
       */
      optionalMethods?: string[] | undefined
    }
)
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import walletConnectModule from '@web3-onboard/walletconnect'

const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 56]
}

// initialize the module with options
// If version isn't set it will default to V2 - V1 support will be completely removed shortly as it is deprecated
const walletConnect = walletConnectModule(wcV2InitOptions)

// can also initialize with no options...
// Defaults to V2 - V1 support will be completely removed shortly as it is deprecated
// const walletConnect = walletConnectModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    walletConnect
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
