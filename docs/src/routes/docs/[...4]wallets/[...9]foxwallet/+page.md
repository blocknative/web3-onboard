---
title: FoxWallet
---

# {$frontmatter.title}

Wallet module for connecting FoxWallet to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/foxwallet
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/foxwallet
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import foxwalletModule from '@web3-onboard/foxwallet'

const foxwallet = foxwalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    foxwallet
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
