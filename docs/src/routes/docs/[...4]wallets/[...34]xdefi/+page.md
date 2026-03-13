---
title: XDEFI
---

# {$frontmatter.title}

Wallet module for connecting XDEFI to Web3 Onboard.

See [XDEFI Wallet Developer Docs](https://sdk.xdefi.io/)

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/xdefi
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/xdefi
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import xdefiWalletModule from '@web3-onboard/xdefi'

// initialize the module with options
const xdefiWalletSdk = xdefiWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    xdefiWalletSdk()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)