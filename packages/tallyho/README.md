# @web3-onboard/tallyho (Taho previously named Tally Ho wallet)

## (Deprecated) Wallet module for connecting Taho (Previously named Tally Ho wallet) Wallet to web3-onboard
_Use [@web3-onboard/taho](../taho/README.md)_

See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

### Install

`npm i @web3-onboard/tallyho`


## Usage

```typescript
import Onboard from '@web3-onboard/core'
import tahoWalletModule from '@web3-onboard/tallyho'

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
