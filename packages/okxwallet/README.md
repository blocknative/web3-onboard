# @web3-onboard/okxwallet

### Install

`npm i @web3-onboard/okxwallet`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import okxWalletModule from '@web3-onboard/okxwallet'

// initialize the module with options
const okxWalletSdk = okxWalletModule()

// can also initialize with no options...
// const okxWalletSdk = okxWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    okxWalletSdk
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
