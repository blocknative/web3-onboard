---
title: Introduction
---

<script>
  import walletModal from '$lib/assets/connect-modal.svg'
</script>

# Web3 Onboard

The best way to connect a wallet 🚀

<img src="{walletModal}" alt="Web3-Onboard connect wallet modal"/>

Web3-Onboard is the quickest and easiest way to add multi-wallet and multi-chain support to your project. With built-in modules for more than 35 unique hardware and software wallets, Web3-Onboard saves you time and headaches.

## Features

- **Minimal Dependencies:** All wallet dependencies are included in separate packages, so you only include the ones you want to use in your app.

- **Multi Wallet and Multi Chain Support:** Allow your users to connect multiple wallets and multiple accounts within each wallet at the same time to your app. Let users switch between chains/networks with ease. ALL EVM networks supported.

- **Account Center:** An interface to manage wallet connections and networks, with a minimal version for mobile.

- **Themable:** Powerful customization options for all your needs. Style Web3 Onboard to fit into your existing designs, or pick from our pre-made themes.

- **Unified Provider Interface:** All wallet modules expose a provider that is patched to be compliant with the EIP-1193, EIP-1102, EIP-3085 and EIP-3326 specifications. Whether your user is using Ledger or Metamask the provider will operate identically.

- **Dynamic Imports:** Supporting multiple wallets in your app requires a lot of dependencies. Onboard dynamically imports a wallet and its dependencies only when the user selects it, so that minimal bandwidth is used.

- **Framework Agnostic:** Avoid framework lock in -- Web3-Onboard works with any framework and includes helper packages for vue & react.

- **Notify:** Real-time transaction notifications for all transaction states for the connected wallet address(es). In-notification speedups & cancels for hardware wallet connections.

### Natively Supported EVM Chains

web3-onboard supports ALL EVM networks. Supporting a new network is simply a matter of adding its details in the Chains section upon initialization. For more information see [initialization options](../../modules/core.md#initialization).

- Ethereum
- Arbitrum One
- Arbitrum Nova
- Base
- Polygon
- OP Mainnet
- Avalanche
- BNB Chain
- Celo
- Degen
- Fantom
- Gnosis Chain
- Harmony One
- Moonriver
- Sepolia
- Base Goerli
- All other EVM networks

### Optional - Use an API key to fetch real time transaction data, balances & gas

Using a Blocknative API key with web3-onboard on the free plan will allow you to gain the benefits of Blocknative balance & transaction services. Blocknative has a free forever plan you can always use.

This step is not required to use web3-onboard. You can skip to the [**Quickstart**](/docs/overview/introduction#quickstart) step below if you want to use web3-onboard without API services or if you already have a Blocknative account & API key.

**Setup your Account**
Go to the Account Dashboard at [https://explorer.blocknative.com/account](https://explorer.blocknative.com/account) and setup an account with an email address. You will receive an email to confirm your account.

**Create your API Key**
On the Account Dashboard at [https://explorer.blocknative.com/account](https://explorer.blocknative.com/account), create an API key with your choice of name or use/rename the Default Key. Consider using different API keys for development, staging, and production releases.

## Quickstart

Install the core Onboard library, the injected wallets module and optionally ethers.js to support browser extension and mobile wallets:

<Tabs values={['npm', 'yarn']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/injected-wallets ethers
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm i @web3-onboard/core @web3-onboard/injected-wallets ethers
```

  </TabPanel>
</Tabs>

You can find a link to web3-onboard's official NPM Documentation here: [@web3-onboard/core Official NPM Documentation](https://www.npmjs.com/package/@web3-onboard/core)

Then initialize in your app:

```ts copy
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule()

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    },
    {
      id: '0xa4ec',
      token: 'ETH',
      label: 'Celo',
      rpcUrl: 'https://1rpc.io/celo'
    },
    {
      id: 666666666,
      token: 'DEGEN',
      label: 'Degen',
      rpcUrl: 'https://rpc.degen.tips'
    }
  ]
})

const wallets = await onboard.connectWallet()

console.log(wallets)

if (wallets[0]) {
  // create an ethers provider with the last connected wallet provider
  // if using ethers v6 this is:
  // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  const ethersProvider = new ethers.providers.Web3Provider(wallets[0].provider, 'any')

  const signer = ethersProvider.getSigner()

  // send a transaction with the ethers provider
  const txn = await signer.sendTransaction({
    to: '0x',
    value: 100000000000000
  })

  const receipt = await txn.wait()
  console.log(receipt)
}
```

**and you are live!**

---

## Wallet Modules

Add other wallet modules such as Wallet Connect or Ledger to increase the support and functionality of your web3-onboard implementation. All modules can be accessed through the subpages of web3-onboard docs on the left.

We recommend you add the [Core Repo](../../modules/core.md#install) and consider adding the [Injected Wallets](../../wallets/injected.md#install) module to get connected with wallets like Metamask, Trust, Coinbase Wallet & more right away.

[**Core Repo**](../../modules/core.md#install)

[**Injected Wallets**](../../wallets/injected.md#install)

**SDK Wallets**

- [Arcana Auth](../../wallets/arcana.md#install)
- [Blocto](../../wallets/blocto.md#install)
- [Coinbase](../../wallets/coinbase.md#install)
- [Fortmatic](../../wallets/fortmatic.md#install)
- [Frame](../../wallets/frame.md#install)
- [Safe](../../wallets/gnosis.md#install)
- [Magic](../../wallets/magic.md#login-options)
- [MetaMask](../../wallets/metamask.md#install)
- [MEW](../../wallets/mewwallet.md#install)
- [Portis](../../wallets/portis.md#install)
- [Web3Auth](../../wallets/web3auth.md#install)
- [WalletConnect](../../wallets/walletconnect.md#install)

**Hardware Wallets**

- [D'cent](../../wallets/dcent.md#install)
- [Keystone](../../wallets/keystone.md#install)
- [KeepKey](../../wallets/keepkey.md#install)
- [Ledger](../../wallets/ledger.md#install)
- [Trezor](../../wallets/trezor.md#install)

**Frameworks**

- [React](../../modules/react.md#quickstart-with-injected-wallets-and-ethers-provider)
- [Solid](../../modules/solid.md#install)
- [Vue](../../modules/vue.md#install)

## Test out the demo app

Test out the current functionality of web3-onboard in a small browser demo:

- Clone the repo: `git clone git@github.com:blocknative/web3-onboard.git`
- Change it to the onboard directory: `cd web3-onboard`
- Checkout the main web3-onboard branch: `git checkout main`
- Install the dependencies: `yarn` (if running a M1 mac - `yarn install-m1-mac`)
- Run all packages in dev mode: `yarn dev`
- [View demo app in the browser](http://localhost:8080/)

## React Demo

Checkout our live demo using React at [https://reactdemo.blocknative.com/](https://reactdemo.blocknative.com/)

The demo is open source so you can see a sample implementation of web3-onboard: [https://github.com/blocknative/react-demo](https://github.com/blocknative/react-demo)

## More Examples

You can find starter examples from the web3 community here using web3-onboard:

- [eth-scaffold](https://github.com/scaffold-eth/scaffold-eth-examples/tree/bnc-onboard)
