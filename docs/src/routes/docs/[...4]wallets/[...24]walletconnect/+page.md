---
title: WalletConnect
---

# {$frontmatter.title}

Wallet module for connecting WalletConnect to web3-onboard, currently supporting both v1 and v2.

:::admonition type=warning
_Version 1 of WalletConnect has been deprecated by the WC team and the WC bridge is not available. Upgrading to use WalletConnect v2 is recommended. Support will be completely removed from Web3-Onboard in the future_
:::

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/walletconnect
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/walletconnect
```

  </TabPanel>
</Tabs>

## Options

```typescript
type WalletConnectOptions = {
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
} & (
  | {
      /**
       * @deprecated
       * Version 1 of WalletConnect has been deprecated by the WC team and the WC bridge is not available.
       * To use version 1 a custom bridge url will need to be provided.
       * Support will be completely remove from Web3-Onboard in the future
       */
      version: 1
      /**
       * Custom URL Bridge must be defined for V1 usage.
       * WalletConnect no longer supports a v1 bridge.
       * Upgrading to use WalletConnect v2 is recommended.
       * A potential bridge can be found here: 'https://derelay.rabby.io'
       */
      bridge: string
      connectFirstChainId?: boolean
      qrcodeModalOptions?: {
        mobileLinks: string[]
      }
    }
  | {
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
       * Defaults to version: 2
       */
      version?: 2
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
       * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
       * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
       */
      additionalOptionalMethods?: string[] | undefined
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
  requiredChains: [1, 56],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://YourAwesomeDapp.com'
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
  ],
  chains: [
    // chains that are passed as optional chains to WC wallet after cleaning and parsing as number[]
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    }
    // ...
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
