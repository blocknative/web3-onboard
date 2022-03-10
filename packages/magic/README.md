# @web3-onboard/magic

## Wallet module for connecting Ledger hardware wallets to Onboard V2

### Install

`npm i @web3-onboard/magic`

## Options

```typescript
type magicOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import magicModule from '@web3-onboard/magic'

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
