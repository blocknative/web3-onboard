# Phantom

:::admonition type=warning
_Wallet module for connecting Phantom to web3-onboard is still in alpha testing and Phantom Eth mainnet coverage is not fully public yet but will be soon. Please visit the [Official Phantom Site](https://phantom.app/) for more details.
:::

[Web3-Onboard](https://onboard.blocknative.com/) is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate [Phantom Wallet](https://phantom.app/) support into Web3-Onboard's "Connect Wallet" modal. With this module the Phantom option will be shown even if the extension is not installed on the users browser or used within the Phantom app. If selected the user will be taken to a download screen and prompted to create a Phantom wallet. For more information on Phantom, please refer to the [Phantom developer docs](https://docs.phantom.app/).

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/phantom
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/phantom
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import phantomModule from '@web3-onboard/phantom'

// initialize the module
const phantom = phantomModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    phantom
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
