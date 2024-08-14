---
title: FinoaConnect
---

## Wallet module for connecting FinoaConnect SDK to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/finoaconnect
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/finoaconnect
```

  </TabPanel>
</Tabs>

## Usage

Optional initialization object
```typescript
/** Optional object provided to the initiation of the wallet connector. 
 * When not included, the wallet connector service connects to FinoaConnect production systems.
 * @field {url} URL of the FinoaConnect backend systems to be used
 * @field {labelSuffix} arbitrary string label to denote the context of the URL field  */
export interface FinoaWalletOption {
  url?: string
  labelSuffix?: string
}
```

```typescript
import Onboard from '@web3-onboard/core'
import finoaConnectModule from '@web3-onboard/finoaconnect'

// initialize the module with options
const finoaConnect = finoaConnectModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    finoaConnect
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
