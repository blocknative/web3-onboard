# @web3-onboard/tallyho (now named Taho wallet)

## (Deprecated) Wallet module for connecting Tally Ho Wallet to web3-onboard
_Use [@web3-onboard/taho](../taho/README.md)_

See [Taho Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

### Install

`npm i @web3-onboard/tallyho`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import tallyHoWalletModule from '@web3-onboard/tallyho'

// initialize the module with options
const tallyHoWalletSdk = tallyHoWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    tallyHoWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
