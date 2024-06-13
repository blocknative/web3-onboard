---
title: OKX Wallet
---

# {$frontmatter.title}

Wallet module for connecting OKX wallet through Web3 Onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/okx
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/okx
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import okxWallet from '@web3-onboard/okx'

const okx = okxWallet()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    okx
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
