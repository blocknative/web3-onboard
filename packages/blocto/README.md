# @web3-onboard/blocto

## Wallet module for connecting Blocto Wallet SDK to web3-onboard

See [Blocto Developer Docs](https://docs.blocto.app/blocto-sdk/javascript-sdk/evm-sdk)

### Install

`npm i @web3-onboard/blocto`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import bloctoModule from '@web3-onboard/blocto'

// initialize the module with options
const blocto = bloctoModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    blocto
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
