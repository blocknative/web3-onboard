---
title: Taho (previously Tally Ho)
---

# {$frontmatter.title}

## Wallet module for connecting Taho (wallet previously named Tally Ho)

See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/taho
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/taho
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import tahoWalletModule from '@web3-onboard/taho'

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    tahoWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
