# Onboard Wallet Module - [Portis](https://docs.portis.io/#/configuration)

## Options

```typescript
type PortisOptions {
  apiKey: string // required
}
```

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import torusModule from '@bn-onboard/portis'

const portis = portisModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    portis
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
