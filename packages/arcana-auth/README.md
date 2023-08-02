# @web3-onboard/arcana-auth

## Wallet module for connecting Arcana Wallet SDK to web3-onboard

[Web3-Onboard](https://onboard.blocknative.com/) is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate [Arcana Wallet](https://docs.arcana.network/concepts/anwallet/index.html) support into Web3-Onboard's "Connect Wallet" modal. With this module, the Arcana wallet option will be shown for any app that integrates with the Arcana Auth SDK and uses it to onboard users. There is no need to download any browser extension. For more information on how to use the Arcana Wallet, please refer to the [Arcana Wallet User Guide](https://docs.arcana.network/user-guides/wallet-ui/index.html). Web3 app developers can refer to the [Arcana Wallet Developer Docs](https://docs.arcana.network/auth-quick-start.html)

**Note**

To ensure proper functionality of the embedded Arcana wallet in the Arcana Auth SDK, it may be necessary to disable certain other wallets that operate as browser extensions.

### Install

`npm install @web3-onboard/core @web3-onboard/arcana-auth`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import arcanaAuthModule from '@web3-onboard/arcana-auth'

// initialize the module
const arcanaAuth = arcanaAuthModule({
  clientID: 'xar_test_c9c3bc702eb13255c58dab0e74cfa859711c13cb'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    arcanaAuth,
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
