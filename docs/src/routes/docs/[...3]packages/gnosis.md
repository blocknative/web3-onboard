<script>
    import { Tabs, TabPanel } from '$lib/components'
</script>

# @web3-onboard/gnosis

Wallet module for connecting Gnosis Safe to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
  <TabPanel value="yarn">

  ```sh copy
  yarn add @web3-onboard/gnosis
  ```

  </TabPanel>
  <TabPanel value="npm">

  ```sh copy
  npm install @web3-onboard/gnosis
  ```

  </TabPanel>
</Tabs>

## Options

```typescript
type GnosisOptions = {
  whitelistedDomains: RegExp[]
}
```

## Usage

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