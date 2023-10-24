---
title: WalletConnect
---

# {$frontmatter.title}

Wallet module for connecting WalletConnect to web3-onboard.

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


```typescript
type WalletConnectOptions = {
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
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
)
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import walletConnectModule from '@web3-onboard/walletconnect'

const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1],
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  optionalChains: [42161, 8453, 10, 137, 56],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://YourAwesomeDapp.com'
}

// initialize the module with options
const walletConnect = walletConnectModule(wcInitOptions)

// can also initialize with no options...

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    walletConnect
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()

// Assuming only wallet connect is connected, index 0
// `instance` will give insight into the WalletConnect info
// such as namespaces, methods, chains, etc per wallet connected
const { instance } = connectedWallets[0]

console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
