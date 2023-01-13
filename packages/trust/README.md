# @web3-onboard/trust

## Wallet module for connecting Trust Wallet through web3-onboard

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/trust`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/trust`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import trustModule from '@web3-onboard/trust'

const trust = trustModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    trust
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
