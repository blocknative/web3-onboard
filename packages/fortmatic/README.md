# @bn-onboard/fortmatic

## Wallet module for connecting Ledger hardware wallets to Onboard V2

### Install

`npm i @bn-onboard/fortmatic`

## Options

```typescript
type FortmaticOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import fortmaticModule from '@bn-onboard/fortmatic'

const fortmatic = fortmaticModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    fortmatic
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
