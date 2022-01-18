# @bn-onboard/portis

## Wallet module for connecting Portis wallet to Onboard V2

### Install

`npm i @bn-onboard/portis`

## Options

```typescript
type PortisOptions {
  apiKey: string // required
}
```

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import portisModule from '@bn-onboard/portis'

const portis = portisModule({ apiKey: 'API_KEY' })

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
