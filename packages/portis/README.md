# @web3-onboard/portis

## Wallet module for connecting Portis wallet to web3-onboard

### Install

`npm i @web3-onboard/portis`

## Options

```typescript
type PortisOptions {
  apiKey: string // required
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import portisModule from '@web3-onboard/portis'

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
