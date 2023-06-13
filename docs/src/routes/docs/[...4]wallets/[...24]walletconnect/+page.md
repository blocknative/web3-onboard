---
title: Walletconnect
---

# {$frontmatter.title}

Wallet module for connecting WalletConnect to web3-onboard, currently supporting both v1 and v2.

:::admonition type=warning
_Not all Wallets support WalletConnect V2 currently. For an up to date list please see the [WalletConnect Explorer](https://explorer.walletconnect.com/?version=2)_
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
  bridge?: string // default = 'https://derelay.rabby.io'
  qrcodeModalOptions?: {
    mobileLinks: string[] // set the order and list of mobile linking wallets
  }
  connectFirstChainId?: boolean // if true, connects to the first network chain provided
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
} & (
  | {
      /**
       * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
       */
      version?: 1
    }
  | {
      /**
       * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
       */
      projectId: string
      /**
       * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
       */
      version: 2
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
    }
)
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import walletConnectModule from '@web3-onboard/walletconnect'

const wcV1InitOptions = {
  bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'argent', 'trust']
  },
  connectFirstChainId: true
}

const wcV2InitOptions = {
  version: 2,
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri: (uri) => console.log(uri),
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 56]
}

// initialize the module with options
// If version isn't set it will default to V1 until V1 sunset
const walletConnect = walletConnectModule(wcV2InitOptions || wcV1InitOptions)

// can also initialize with no options...
// Defaults to V1 until V1 sunset
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

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
