# Enkrypt

Wallet module for connecting Enkrypt wallet through web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/enkrypt
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/enkrypt
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import enrkypt from '@web3-onboard/enkrypt'

const enrkyptModule = enrkypt()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    enrkyptModule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
