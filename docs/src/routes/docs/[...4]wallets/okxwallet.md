# Mew Wallet

Wallet module for connecting Okx wallet through web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/okxwallet
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/okxwallet
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import okxWallet from '@web3-onboard/okxwallet'

const okxWalletModule = okxWallet()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    okxWalletModule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments
For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)