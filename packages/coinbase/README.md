# @web3-onboard/coinbase

## Wallet module for connecting Coinbase Wallet SDK to web3-onboard
See [Coinbase Wallet Developer Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Install

`npm i @web3-onboard/coinbase`

## Options

```typescript
type CoinbaseWalletOptions = {
  /** @optional Use dark theme */
  darkMode?: boolean
  /** @optional whether to connect mobile web app via WalletLink, defaults to false */
  enableMobileWalletLink?: boolean
  /** @optional whether or not to reload dapp automatically after disconnect, defaults to true */
  reloadOnDisconnect?: boolean
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import coinbaseWalletModule from '@web3-onboard/coinbase'

// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

// can also initialize with no options...
// const coinbaseWalletSdk = coinbaseWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    coinbaseWalletSdk
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
