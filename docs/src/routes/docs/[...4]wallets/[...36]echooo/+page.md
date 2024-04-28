---
title: Echooo
---
## Wallet module for connecting Echooo to web3-onboard

See [Echooo Wallet Docs](https://www.echooo.xyz)

## Install

<Tabs values={['yarn', 'npm']}>
`<TabPanel value="yarn">`

```sh
yarn add @web3-onboard/core @web3-onboard/echooo
```

</TabPanel>
  <TabPanel value="npm">

```sh
npm install @web3-onboard/core @web3-onboard/echooo
```

</TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import echoooWalletModule from '@web3-onboard/echooo'

// initialize the module with options
const echoooWallet = echoooWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    echoooWallet
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
