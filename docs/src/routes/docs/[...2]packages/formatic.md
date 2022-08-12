# @web3-onboard/fortmatic

Wallet module for connecting Ledger hardware wallets to web3-onboard

### Install

```
npm i @web3-onboard/fortmatic
```

```
yarn add @web3-onboard/fortmatic
```

## Options

```typescript
type FortmaticOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import fortmaticModule from '@web3-onboard/fortmatic'

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