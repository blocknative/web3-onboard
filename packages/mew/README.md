# Onboard Wallet Module - [MEW](https://myetherwallet.github.io/MEWconnect-Protocol-Documentation/)

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
