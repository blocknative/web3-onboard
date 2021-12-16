# Onboard Wallet Module - [Fortmatic](https://docs.fortmatic.com/)

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
