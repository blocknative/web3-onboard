---
title: BitKeep
---

# {$frontmatter.title}

## Wallet module for connecting BitKeep Wallet through web3-onboard

BitKeep Wallet SDK wallet module for connecting to Web3-Onboard. Web3-Onboard makes it simple to connect Ethereum hardware and software wallets to your dapp. Features standardized spec compliant web3 providers for all supported wallets, framework agnostic modern javascript UI with code splitting, CSS customization, multi-chain and multi-account support, reactive wallet state subscriptions and real-time transaction state change notifications.

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/bitkeep
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/bitkeep
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import bitKeepWalletModule from '@web3-onboard/bitkeep'

const bitKeepWallet = bitKeepWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    bitKeepWallet()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
