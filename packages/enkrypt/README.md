# @web3-onboard/enkrypt

## Wallet module for connecting Mew wallet to web3-onboard

### Install

`npm i @web3-onboard/enrkypt`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import enrkypt from '@web3-onboard/enkrypt'

const enrkyptModule = enrkypt()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    enrkyptModule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
