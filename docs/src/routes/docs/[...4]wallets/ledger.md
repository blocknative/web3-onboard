# Ledger

Wallet module for connecting Ledger hardware wallets to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/ledger
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/ledger
```

  </TabPanel>
</Tabs>

## Options

```typescript
interface LedgerOptions {
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import ledgerModule from '@web3-onboard/ledger'

const ledger = ledgerModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    ledger
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments
For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)