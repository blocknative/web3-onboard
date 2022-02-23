# @bn-onboard/mew

## Wallet module for connecting Mew wallet to Onboard V2

### Install

`npm i @bn-onboard/mew`

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import mewModule from '@bn-onboard/mew'

const mew = mewModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    mew
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

_NOTE: Currently not building on M1 Macs_
