# @web3-onboard/zeal

## Wallet module for connecting Zeal to web3-onboard

See [Zeal](https://www.zeal.app/) for details

### Install

`npm i @web3-onboard/core @web3-onboard/zeal`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import zealWalletModule from '@web3-onboard/zeal'

// initialize the module with options
const zealWalletSdk = zealWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    zealWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
