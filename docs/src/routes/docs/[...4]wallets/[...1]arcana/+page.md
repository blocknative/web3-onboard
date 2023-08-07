---
title: Arcana Auth
---

# {$frontmatter.title}

:::admonition type=warning
To ensure proper functionality of the embedded Arcana wallet in the Arcana Auth SDK, it may be necessary to disable certain other wallets that operate as browser extensions.
:::

:::admonition type=tip
To enable the Arcana wallet in Web3 apps, developers must register and configure the authentication providers with the [Arcana Network](https://arcana.network) through the [Arcana Dashboard](https://dashboard.arcana.network) and obtain a unique client ID. Install and integrate the Auth SDK with the app using the registered client ID. Use the built-in plug-and-play login feature or plug in any custom UI to onboard users. Once the users authenticate, the Arcana wallet is accessible in the app's context to sign blockchain transactions and perform other Web3 wallet operations.

For details, see [Quick Start Guide](https://docs.arcana.network/auth-quick-start.html).
:::

[Web3-Onboard](https://onboard.blocknative.com/) is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate [Arcana Wallet](https://docs.arcana.network/concepts/anwallet/index.html) support into Web3-Onboard's "Connect Wallet" modal. With this module, the Arcana wallet option will be shown for any app that integrates with the Arcana Auth SDK and uses it to onboard users. There is no need to download any browser extension. For more information on how to use the Arcana Wallet, please refer to the [Arcana Wallet User Guide](https://docs.arcana.network/user-guides/wallet-ui/index.html).

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/arcana-auth
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/arcana-auth
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import arcanaAuthModule from '@web3-onboard/arcana-auth'

// initialize the module
const arcanaAuth = arcanaAuthModule({
  clientID: '<your client ID>'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    arcanaAuth,
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
