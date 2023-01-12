# Keepkey

Wallet module for connecting KeepKey hardware wallets to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/keepkey
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/keepkey
```

  </TabPanel>
</Tabs>

## Usage

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

## Build Environments
For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)