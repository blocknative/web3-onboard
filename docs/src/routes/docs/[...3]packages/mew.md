<script>
    import { Tabs, TabPanel } from '$lib/components'
</script>

# @web3-onboard/mew

Wallet module for connecting Mew wallet to web3-onboard

## Install


<Tabs values={['yarn', 'npm']}>
  <TabPanel value="yarn">

  ```sh copy
  yarn add @web3-onboard/mew
  ```

  </TabPanel>
  <TabPanel value="npm">

  ```sh copy
  npm install @web3-onboard/mew
  ```

  </TabPanel>
</Tabs>


## Usage

```typescript
import Onboard from '@web3-onboard/core'
import mewModule from '@web3-onboard/mew'

const mew = mewModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    mew
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

:::admonition type=warning
Currently not building on M1 Macs
:::
