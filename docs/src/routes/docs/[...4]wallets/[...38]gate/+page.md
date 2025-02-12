---
title: Gate Wallet
---

# {$frontmatter.title}

Wallet module for connecting Gate wallet through Web3 Onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/gate
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/gate
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import gateWallet from '@web3-onboard/gate'

const gate = gateWallet()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    gate
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
