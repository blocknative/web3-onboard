# @web3-onboard/coinbase-wallet-sdk

## Wallet module for connecting Coinbase Wallet SDK to web3-onboard
See [Coinbase Wallet Developer Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Install

`npm i @web3-onboard/coinbase-wallet-sdk`

## Options

```typescript
type WalletLinkOptions = {
  darkMode: boolean // default = false
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import coinbaseWalletModule from '@web3-onboard/coinbase-wallet-sdk'

// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

// can also initialize with no options...
// const coinbaseWalletSdk = coinbaseWalletSdk()

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
