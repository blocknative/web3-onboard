---
title: MetaMask
---

# {$frontmatter.title}

## Wallet module for connecting MetaMask Wallet SDK to web3-onboard

See [MetaMask SDK Developer Docs](https://github.com/MetaMask/metamask-sdk)

:::

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/metamask
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/metamask
```

  </TabPanel>
</Tabs>

## Options

```typescript
// For a complete list of options check https://github.com/MetaMask/metamask-sdk
interface MetaMaskSDKOptions {
  dappMetadata: {
    url?: string;
    name?: string;
    base64Icon?: string;
  },
  /**
   * If MetaMask browser extension is detected, directly use it without prompting the user.
   */
  extensionOnly?: boolean;
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import metamaskSDK from '@web3-onboard/metamask'

// initialize the module with options
const metamaskSDKWallet = metamaskSDK({options: {
  extensionOnly: false,
  dappMetadata: {
    name: 'Demo Web3Onboard'
  }
}})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    metamaskSDKWallet
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
