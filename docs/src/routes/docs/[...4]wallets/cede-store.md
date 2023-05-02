# cede-store

## Wallet module for connecting cede.store Wallet SDK to web3-onboard

See [cede.store Wallet Developer Docs](https://docs.cede.store)

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/coinbase
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/coinbase
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import cedeStoreWalletModule from '@web3-onboard/cede-store'

const cedeStoreWallet = cedeStoreWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    cedeStoreWallet
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
