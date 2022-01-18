# @bn-onboard/gnosis

## Wallet module for connecting Gnosis Safe to Onboard V2

### Install

`npm i @bn-onboard/gnosis`

### Options

```typescript
type GnosisOptions = {
  whitelistedDomains: RegExp[]
}
```

### Usage

```typescript
import Onboard from '@bn-onboard/core'
import gnosisModule from '@bn-onboard/gnosis'

const gnosis = gnosisModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    gnosis
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
