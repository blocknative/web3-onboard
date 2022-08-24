# @web3-onboard/web3auth

Wallet module for connecting Web3auth to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/web3auth
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/web3auth
```

  </TabPanel>
</Tabs>

## Options

See the [Web3auth Docs](https://docs.web3auth.io/api-reference/web/plugnplay) for the extensive list of options.

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import web3authModule from '@web3-onboard/web3auth'

const web3auth = web3authModule({
  clientId:
    'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    web3auth
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
