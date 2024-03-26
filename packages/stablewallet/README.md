# @web3-onboard/stablewallet

## Wallet module for connecting Stable Wallet through web3-onboard

Stable Wallet SDK wallet module for connecting to Web3-Onboard. Web3-Onboard makes it simple to connect Ethereum hardware and software wallets to your dapp. Features standardized spec compliant web3 providers for all supported wallets, framework agnostic modern javascript UI with code splitting, CSS customization, multi-chain and multi-account support, reactive wallet state subscriptions and real-time transaction state change notifications.

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/stablewallet`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/stablewallet`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import stablewalletModule from '@web3-onboard/stablewallet'

const stablewallet = stablewalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    stablewallet()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
