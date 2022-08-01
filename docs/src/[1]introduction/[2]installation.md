<script context="module">
import { Tabs, TabPanel } from '@vitebook/client/components/tabs';

const frameworks = ['npm', 'yarn'];
</script>

# Installation

Get up and running with Web3-Onboard

### Install

Install the core Onboard library and the injected wallets module to support browser extension and mobile wallets:

<Tabs values={frameworks}>
  <TabPanel value="npm">

```
npm install @web3-onboard/core @web3-onboard/injected-wallets
```

  </TabPanel>
  <TabPanel value="yarn">

```
yarn add @web3-onboard/core @web3-onboard/injected-wallets
```

  </TabPanel>
</Tabs>

### Import

```js
import Onboard, { chains } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
```

### Configure

#### Wallets

```js
const injected = injectedModule()

const wallets = [injected]
```

#### Chains

Select the chains that you'd like your dapp to support:

```js
const INFURA_ID = '...'

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/${INFURA_ID}',
  },
  {
    id: '0x4',
    token: 'rETH',
    label: 'Ethereum Rinkeby Testnet',
    rpcUrl: 'https://rinkeby.infura.io/v3/${INFURA_ID}',
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Matic Mainnet',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
  },
  {
    id: '0xfa',
    token: 'FTM',
    label: 'Fantom Mainnet',
    rpcUrl: 'https://rpc.ftm.tools/',
  },
]
```

#### App Metadata (Optional)

You can add metadata about your dapp.

```js
const appMetadata = {
  name: 'My App',
  icon: '<SVG_ICON_STRING>',
  logo: '<SVG_LOGO_STRING>',
  description: 'My app using Onboard',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' },
  ],
}
```

#### Initialize Onboard

```js
const onboard = Onboard({
  wallets,
  chains,
  appMetadata,
})
```
