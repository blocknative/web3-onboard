# @web3-onboard/cede-store

## Wallet module for connecting cede.store Wallet SDK to web3-onboard
See [cede.store Wallet Developer Docs](https://docs.cede.store)

### Install

`npm i @web3-onboard/cede-store`

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
