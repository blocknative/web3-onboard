# @web3-onboard/xdefi

## Wallet module for connecting XDEFI Wallet to web3-onboard

See [XDEFI Wallet Developer Docs](https://docs.xdefi.io/docs/technical-documentation/xdefi-extension-integration/)

### Install

`npm i @web3-onboard/xdefi`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import xdefiWalletModule from '@web3-onboard/xdefi'

// initialize the module with options
const xdefiSdk = xdefiWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    xdefiSdk
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
