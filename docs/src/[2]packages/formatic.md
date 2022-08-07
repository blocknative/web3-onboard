<script context="module">
import { Tabs, TabPanel } from '@vitebook/client/components/tabs';

const frameworks = ['npm', 'yarn'];
</script>

# @web3-onboard/fortmatic

Wallet module for connecting Ledger hardware wallets to web3-onboard

### Install


<Tabs values={frameworks}>
  <TabPanel value="npm">

```
npm i @web3-onboard/fortmatic
```

  </TabPanel>
  <TabPanel value="yarn">

```
yarn add @web3-onboard/fortmatic
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