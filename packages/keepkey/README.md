# @bn-onboard/keepkey

## Wallet module for connecting KeepKey hardware wallets to Onboard V2

### Install

`npm i @bn-onboard/keepkey`

### Usage

```typescript
import Onboard from '@bn-onboard/core'
import keepkeyModule from '@bn-onboard/keepkey'

const keepkey = keepkeyModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    keepkey
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
