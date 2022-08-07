<script context="module">
import { Tabs, TabPanel } from '@vitebook/client/components/tabs';

const frameworks = ['npm', 'yarn'];
</script>
# @web3-onboard/gnosis

Wallet module for connecting Gnosis Safe to web3-onboard

### Install


<Tabs values={frameworks}>
  <TabPanel value="npm">

```
npm i @web3-onboard/gnosis
```

  </TabPanel>
  <TabPanel value="yarn">

```
yarn add @web3-onboard/gnosis
```

  </TabPanel>
</Tabs>


### Options

```typescript
type GnosisOptions = {
  whitelistedDomains: RegExp[]
}
```

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import gnosisModule from '@web3-onboard/gnosis'

const gnosis = gnosisModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    gnosis
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```