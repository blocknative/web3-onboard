# @web3-onboard/echooo

## Wallet module for connecting Echooo Wallet to web3-onboard

See [Echooo Wallet](https://www.echooo.xyz)

### Install

`npm i @web3-onboard/echooo`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import echoooWalletModule from '@web3-onboard/echooo'

// initialize the module with options
const echooo = echoooWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    echooo
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
