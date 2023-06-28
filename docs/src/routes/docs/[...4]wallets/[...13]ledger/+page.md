---
title: Ledger
---

# {$frontmatter.title}

Wallet module for connecting Ledger hardware wallets to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/ledger
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/ledger
```

  </TabPanel>
</Tabs>

## Options

```typescript
interface LedgerOptions {
  /**
   * Enable Ledger Connect Kit logs
   */
  enableDebugLogs?: boolean
  /**
   * Defaults to walletConnectVersion: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
   */
  walletConnectVersion: 2
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: string
  /**
   * List of Required Chain IDs for Ledger Live to support in number format (integer or hex)
   * Defaults to [1] - Ethereum
   * The chains defined within the web3-onboard config will define the
   * optional chains for the WalletConnect module
   */
  requiredChains?: string[] | number[]
  /**
   * List of Required Methods for wallets to support
   */
  requiredMethods?: string[]
  /**
   * List of Optional Methods for wallets to support
   */
  optionalMethods?: string[]
  /**
   * List of Required Events for wallets to support
   */
  requiredEvents?: string[]
  /**
   * List of Optional Events for wallets to support
   */
  optionalEvents?: string[]
  /**
   * List of Chain ID to URL mapping
   */
  rpcMap?: { [chainId: number]: string }
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import ledgerModule from '@web3-onboard/ledger'

const ledger = ledgerModule({
  walletConnectVersion: 2,
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 137]
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    ledger
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
