# @web3-onboard/sequence

## Wallet module for connecting Sequence wallet to web3-onboard

### Install

`npm i @web3-onboard/sequence`

## Options

```typescript
type SequenceOptions {
  appName?: string
  network?: number | string
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import sequenceModule from '@web3-onboard/sequence'

const sequence = sequenceModule({
  appName: 'My app'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    sequence
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
