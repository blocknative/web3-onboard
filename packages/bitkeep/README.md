# @web3-onboard/bitkeep

## (Deprecated) Wallet module for connecting Bitkeep to web3-onboard
_Use [@web3-onboard/bitget](https://www.npmjs.com/package/@web3-onboard/bitget)_

## Wallet module for connecting Bitkeep Wallet through web3-onboard

Bitkeep Wallet SDK wallet module for connecting to Web3-Onboard. Web3-Onboard makes it simple to connect Ethereum hardware and software wallets to your dapp. Features standardized spec compliant web3 providers for all supported wallets, framework agnostic modern javascript UI with code splitting, CSS customization, multi-chain and multi-account support, reactive wallet state subscriptions and real-time transaction state change notifications.

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/bitkeep`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/bitkeep`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import bitkeepModule from '@web3-onboard/bitkeep'

const bitKeep = bitkeepModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    bitKeep()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
