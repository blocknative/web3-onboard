# @web3-onboard/keepkey

Wallet module for connecting KeepKey hardware wallets to web3-onboard

### Install

```
npm i @web3-onboard/keepkey
```

```
yarn add @web3-onboard/keepkey
```


### Usage

```typescript
import Onboard from '@web3-onboard/core'
import keepkeyModule from '@web3-onboard/keepkey'

const keepkey = keepkeyModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    keepkey
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```