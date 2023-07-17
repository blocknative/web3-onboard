# @web3-onboard/lukso

## Wallet module for connecting Lukso Universal Profile Extension to Web3-Onboard

[Web3-Onboard](https://onboard.blocknative.com/) is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate [Lukso Universal Profile Extension](https://lukso.network/) support into Web3-Onboard's "Connect Wallet" modal. With this module the Lukso Universal Profile Extension option will be shown even if the extension is not installed on the users browser or used within the Lukso Universal Profile Extension. If selected the user will be taken to a download screen and prompted to create a Lukso Universal Profile. For more information on Lukso Universal Profile Extension, please refer to the [Lukso Universal Profile developer docs](https://docs.lukso.tech/).

### Install

`npm i @web3-onboard/core @web3-onboard/lukso`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import luksoModule from '@web3-onboard/lukso'

// initialize the module
const lukso = luksoModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    lukso
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
