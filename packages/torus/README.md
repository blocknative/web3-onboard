# @bn-onboard/torus

## Wallet module for connecting Torus wallet to Onboard V2

### Install

`npm i @bn-onboard/torus`

## Options

See the [Torus Docs](https://docs.tor.us/wallet/api-reference/class) for the extensive list of options

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import torusModule from '@bn-onboard/torus'

const torus = torusModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    torus
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
