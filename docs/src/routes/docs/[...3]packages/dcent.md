# @web3-onboard/dcent

## Wallet module for connecting D'CENT hardware wallets to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
  <TabPanel value="yarn">

  ```sh copy
  yarn add @web3-onboard/dcent
  ```

  </TabPanel>
  <TabPanel value="npm">

  ```sh copy
  npm install @web3-onboard/dcent
  ```

  </TabPanel>
</Tabs>

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import dcentModule from '@web3-onboard/dcent'

const dcent = dcentModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    dcent
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
