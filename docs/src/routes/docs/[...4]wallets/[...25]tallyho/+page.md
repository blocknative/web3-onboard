---
title: Tally Ho
---

# {$frontmatter.title}

:::admonition type=warning
_Wallet module for connecting TallyHo to web3-onboard is now deprecated. Please use [@web3-onboard/taho](../../wallets/taho.md)_
:::

## Wallet module for connecting TallyHo

See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/tallyho
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/tallyho
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import tallyWalletModule from '@web3-onboard/tallyho'

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    tallyWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
