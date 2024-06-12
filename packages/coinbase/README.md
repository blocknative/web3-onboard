# @web3-onboard/coinbase

## Wallet module for connecting Coinbase Wallet SDK to web3-onboard

See [Coinbase Wallet Developer Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Install

`npm i @web3-onboard/coinbase`

## Options

```typescript
type CoinbaseWalletOptions = {
  /** @deprecated Deprecated after version 2.2.7 of @web3-onboard/coinbase Use dark theme */
  darkMode?: boolean
  /** @deprecated Deprecated after version 2.2.7 of @web3-onboard/coinbase whether to connect mobile web app via WalletLink, defaults to false */
  enableMobileWalletLink?: boolean
  /** @deprecated Deprecated after version 2.2.7 of @web3-onboard/coinbase whether or not to reload dapp automatically after disconnect, defaults to true */
  reloadOnDisconnect?: boolean
  /** Type of Coinbase wallets to support - options : 'all' | 'smartWalletOnly' | 'eoaOnly' - Default to `all` */
  supportedWalletType?: 'all' | 'smartWalletOnly' | 'eoaOnly'
}
```

## Smart Wallet

Starting at `@web3-onboard/coinbase` version 2.3.0 smart wallet support has been added. A smart wallet lives in your browser, no extensions or app installs needed. Use passkeys for signing, with enterprise-grade security without complex seed phrases. One wallet, one address, works universally across major L2s and onchain apps. [More info on Coinbase smart wallets](https://www.coinbase.com/wallet/smart-wallet).

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import coinbaseWalletModule from '@web3-onboard/coinbase'

// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule()

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
