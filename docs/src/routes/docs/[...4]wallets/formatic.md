# Fortmatic

Wallet module for connecting Ledger hardware wallets to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/fortmatic
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/fortmatic
```

  </TabPanel>
</Tabs>

## Options

```typescript
type FortmaticOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import fortmaticModule from '@web3-onboard/fortmatic'

const fortmatic = fortmaticModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    fortmatic
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments
For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)