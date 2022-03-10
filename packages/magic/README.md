# @web3-onboard/magic

## Wallet module for connecting Ledger hardware wallets to Onboard V2

### Login options

- **Email** - The Magic module comes with a built in email login modal that is customizable
in the same fashion that all other web3-onboard UI components are
* note: The Magic Module currently only supports email login but we are open to expand to sms or socials*

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
