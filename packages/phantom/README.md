# @web3-onboard/phantom

## Wallet module for connecting Phantom to Web3-Onboard

[Web3-Onboard](https://onboard.blocknative.com/) is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate [Phantom Wallet](https://phantom.app/) support into Web3-Onboard's "Connect Wallet" modal. For more information on Phantom, please refer to the [Phantom developer docs](https://docs.phantom.app/).

### Install

`npm i @web3-onboard/core @web3-onboard/phantom`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import phantomModule from '@web3-onboard/phantom'

// initialize the module
const phantom = phantomModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    phantom
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
