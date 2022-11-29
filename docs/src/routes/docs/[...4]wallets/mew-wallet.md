# Mew Wallet

Wallet module for connecting Mew wallet through web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/mew-2allet
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/mew-2allet
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import mewWallet from '@web3-onboard/mew-wallet'

const mewWalletModule = mewWallet()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    mewWalletModule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
