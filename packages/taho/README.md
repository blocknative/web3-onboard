# @web3-onboard/taho (Taho previously named Tally Ho wallet)

## Wallet module for connecting Taho (Previously named Tally Ho wallet) Wallet to web3-onboard
See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

### Install

`npm i @web3-onboard/taho`


## Usage

```typescript
import Onboard from '@web3-onboard/core'
import tahoWalletModule from '@web3-onboard/taho'

// initialize the module with options
const tahoWalletSdk = tahoWalletModule()

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
