# @web3-onboard/torus

## Wallet module for connecting Torus wallet to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
  <TabPanel value="yarn">

  ```sh copy
  yarn add @web3-onboard/torus
  ```

  </TabPanel>
  <TabPanel value="npm">

  ```sh copy
  npm install @web3-onboard/torus
  ```

  </TabPanel>
</Tabs>

## Options

See the [Torus Docs](https://docs.tor.us/wallet/api-reference/class) for the extensive list of options

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import torusModule from '@web3-onboard/torus'

const torus = torusModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    torus
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
