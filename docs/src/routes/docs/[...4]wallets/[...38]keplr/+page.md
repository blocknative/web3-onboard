---
title: Keplr Wallet
---

# {$frontmatter.title}

## Wallet module for connecting Keplr Wallet through Web3 Onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/keplr
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/keplr
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import KeplrWallet from '@web3-onboard/keplr'

const keplr = KeplrWallet()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    keplr
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
