# @web3-onboard/venly

## Wallet module for connecting Venly SDK to web3-onboard
See [Venly SDK Docs](https://docs.venly.io/widget/)

### Install

`npm install @web3-onboard/venly`

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import venlyModule from '@web3-onboard/venly'

// initialize the module with options
const venly = venlyModule({
  clientId: 'YOUR_CLIENT_ID'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    venly
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
