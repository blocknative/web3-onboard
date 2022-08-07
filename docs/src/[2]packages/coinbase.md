<script context="module">
import { Tabs, TabPanel } from '@vitebook/client/components/tabs';

const frameworks = ['npm', 'yarn'];
</script>

# @web3-onboard/coinbase

## Wallet module for connecting Coinbase Wallet SDK to web3-onboard
See [Coinbase Wallet Developer Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Install



<Tabs values={frameworks}>
  <TabPanel value="npm">

```
npm i @web3-onboard/coinbase
```

  </TabPanel>
  <TabPanel value="yarn">

```
yarn add @web3-onboard/coinbase
```

  </TabPanel>
</Tabs>

### Options

```typescript
type CoinbaseWalletOptions = {
  darkMode: boolean // default = false
}
```

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import coinbaseWalletModule from '@web3-onboard/coinbase'

// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

// can also initialize with no options...
// const coinbaseWalletSdk = coinbaseWalletSdk()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    coinbaseWalletSdk
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```