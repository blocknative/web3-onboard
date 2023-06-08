---
title: OneKey
---

# {$frontmatter.title}

[OneKey Wallet](https://onekey.so/) is a open source wallet project, which includes both hardware and app wallets. This package is designed to enable the integration of the OneKey Wallet into Web3-Onboard’s “Connect Wallet” modal. If you have downloaded the OneKey extension, you will be prompted to connect the wallet; for those who haven’t downloaded it, they will be redirected to the download site.

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/injected-wallets
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/injected-wallets
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'

// initialize the module
const injected = injectedModule({
  displayUnavailable: [ProviderLabel.OneKey],
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    injected
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
