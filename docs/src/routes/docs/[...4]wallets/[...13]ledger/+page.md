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
type LedgerOptionsWCv1 = {
  /**
   * @deprecated
   * Version 1 of WalletConnect has been deprecated by the WC team and the WC bridge is not available.
   * To use version 1 a custom bridge url will need to be provided.
   * Support will be completely remove from Web3-Onboard in the future
   */
  walletConnectVersion?: 1
  enableDebugLogs?: boolean
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}

type LedgerOptionsWCv2 = {
  walletConnectVersion: 2
  enableDebugLogs?: boolean
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: string
  /**
   * List of Optional Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to the chains provided within the web3-onboard init chain property
   */
  requiredChains?: string[] | number[]
  requiredMethods?: string[]
  /**
   * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  optionalMethods?: string[]
  requiredEvents?: string[]
  optionalEvents?: string[]
}

type LedgerOptions = LedgerOptionsWCv1 | LedgerOptionsWCv2
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import ledgerModule from '@web3-onboard/ledger'

const ledger = ledgerModule({
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
