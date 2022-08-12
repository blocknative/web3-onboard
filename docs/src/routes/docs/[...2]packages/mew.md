# @web3-onboard/mew

## Wallet module for connecting Mew wallet to web3-onboard

### Install

```
npm i @web3-onboard/mew
```

```
yarn add @web3-onboard/mew
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import mewModule from '@web3-onboard/mew'

const mew = mewModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    mew
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

:::note
Currently not building on M1 Macs
:::
