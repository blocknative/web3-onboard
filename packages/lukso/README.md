# @web3-onboard/lukso

## Wallet module for connecting LUKSO Universal Profile Extension to Web3-Onboard

[Web3-Onboard](https://onboard.blocknative.com/) is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate [LUKSO Universal Profiles Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en) support into Web3-Onboard's "Connect Wallet" modal. With this module the LUKSO Universal Profile Extension option will be shown even if the extension is not installed on the users browser or used within the LUKSO Universal Profile Extension. If selected the user will be taken to a download screen and prompted to create a LUKSO Universal Profile. For more information on LUKSO Universal Profile Extension, please refer to the [LUKSO Universal Profile developer docs](https://docs.lukso.tech/).

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
