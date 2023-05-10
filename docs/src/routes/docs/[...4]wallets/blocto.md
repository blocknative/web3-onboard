# Blocto

Wallet module for connecting Blocto SDK to web3-onboard. Check out the [Blocto Developer Docs](https://docs.blocto.app/blocto-sdk/javascript-sdk/evm-sdk) for more information.

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/blocto
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/blocto
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import bloctoModule from '@web3-onboard/blocto'

// initialize the module with options
const blocto = bloctoModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    blocto
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
