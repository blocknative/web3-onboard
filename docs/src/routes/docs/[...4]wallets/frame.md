# Frame

[Frame](https://frame.sh/) is a privacy focused EVM desktop wallet, enabling a secure system-wide interface to your chains and web3 accounts.

### Install

```sh copy
yarn add @web3-onboard/core @web3-onboard/frame
```

or

```sh copy
npm install @web3-onboard/core @web3-onboard/frame
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import frameModule from '@web3-onboard/frame'

// initialize the module
const frame = frameModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    frame
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
