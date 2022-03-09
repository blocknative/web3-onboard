# @bn-onboard/magic

## Wallet module for connecting Ledger hardware wallets to Onboard V2

### Install

`npm i @bn-onboard/magic`

## Options

```typescript
type magicOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import magicModule from '@bn-onboard/magic'

const magic = magicModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    magic
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
