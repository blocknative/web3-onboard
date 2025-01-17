---
title: Zeal
---

# {$frontmatter.title}

Wallet module for connecting Zeal to Web3 Onboard.

See [Zeal](https://www.zeal.app/) for details.

For any questions or issues related to integration with Zeal wallet do not hesitate to contact our builders via [hi@zeal.app](mailto:hi@zeal.app) OR ping us on X [@withzeal](https://twitter.com/withzeal)

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/zeal
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/zeal
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import zealWalletModule from '@web3-onboard/zeal'

// initialize the module with options
const zealWalletSdk = zealWalletModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    zealWalletModule()
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
