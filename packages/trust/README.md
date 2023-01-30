# @web3-onboard/trust

## Wallet module for connecting Trust Wallet through web3-onboard

Trust Wallet SDK wallet module for connecting to Web3-Onboard. Web3-Onboard makes it simple to connect Ethereum hardware and software wallets to your dapp. Features standardized spec compliant web3 providers for all supported wallets, framework agnostic modern javascript UI with code splitting, CSS customization, multi-chain and multi-account support, reactive wallet state subscriptions and real-time transaction state change notifications.

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
