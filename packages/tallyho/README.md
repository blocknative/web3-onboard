# @web3-onboard/tallyho

## Wallet module for connecting Tally Ho Wallet to web3-onboard
See [Tally Ho Wallet Developer Docs](https://docs.tally.cash/tally/developers/integrating-dapps)

### Install

`npm i @web3-onboard/tallyho`


## Usage

```typescript
import Onboard from '@web3-onboard/core'
import tallyHoWalletModule from '@web3-onboard/tallyho'

// initialize the module with options
const talltHoWalletSdk = tallyHoWalletModule()

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
