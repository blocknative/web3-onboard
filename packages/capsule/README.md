# @web3-onboard/capsule

## Wallet module for connecting Capsule to web3-onboard
See [Capsule Developer Docs](https://docs.usecapsule.com/)

### Install

`yarn add @web3-onboard/capsule`


## Usage

```typescript
import Onboard from '@web3-onboard/core'
import capsuleModule from '@web3-onboard/capsule'

// initialize the module with options
const capsule = capsuleModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    capsule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```