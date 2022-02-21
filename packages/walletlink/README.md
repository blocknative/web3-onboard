# @web3-onboard/walletlink

## Wallet module for connecting WalletLink to web3-onboard

### Install

`npm i @web3-onboard/walletlink`

## Options

```typescript
type WalletLinkOptions = {
  darkMode: boolean // default = false
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import walletLinkModule from '@web3-onboard/walletlink'

// initialize the module with options
const walletLink = walletLinkModule({ darkMode: true })

// can also initialize with no options...
// const walletLink = walletLinkModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    walletLink
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
