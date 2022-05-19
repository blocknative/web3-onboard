# @web3-onboard/dcent

## Wallet module for connecting D'CENT hardware wallets to web3-onboard

### Install

`npm i @web3-onboard/dcent`

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import dcentModule from '@web3-onboard/dcent'

const dcent = dcentModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    dcent
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
