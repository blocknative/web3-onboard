# Web3-Onboard

**easy way to connect users to dapps**

## Features

- **Minimal Dependencies**: All wallet dependencies are included in separate packages, so you only include the ones you want to use in your app.
- **Multiple Wallets and Accounts Connection**: Allow your users to connect multiple wallets and multiple accounts within each wallet at the same time to your app.
- **Multiple Chain Support**: Allow users to switch between chains/networks with ease.
- **Account Center**: A persistent interface to manage wallet connections and networks, with a minimal version for mobile
- **Wallet Provider Standardization**: All wallet modules expose a provider that is patched to be compliant with the [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102), [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) and [EIP-3326](https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain/5471) specifications.
- **Dynamic Imports**: Supporting multiple wallets in your app requires a lot of dependencies. Onboard dynamically imports a wallet and its dependencies only when the user selects it, so that minimal bandwidth is used.

## Quickstart

Install the core Onboard library, the injected wallets module and optionally ethers js to support browser extension and mobile wallets:

**NPM**
`npm i @web3-onboard/core @web3-onboard/injected-wallets ethers`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/injected-wallets ethers`

Then initialize in your app:

```javascript
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
    }
  ]
})

const wallets = await onboard.connectWallet()

console.log(wallets)

if (wallets[0]) {
  // create an ethers provider with the last connected wallet provider
  const ethersProvider = new ethers.providers.Web3Provider(
    wallets[0].provider,
    'any'
  )

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

**Onboard v1 migration guide**

If you're coming from v1, we've created a [migration guide for you](https://onboard.blocknative.com/docs/overview/onboard.js-migration-guide#background).

## Documentation

For full documentation, check out the README.md for each package or the [docs page here](https://onboard.blocknative.com/docs/overview/introduction#features):

**Core Repo**

- [Core](packages/core/README.md)

**Injected Wallets**

- [Injected](packages/injected/README.md)

**SDK Wallets**

- [Arcana](packages/arcana-auth/README.md)
- [Bitget](packages/bitget/README.md)
- [Blocto](packages/blocto/README.md)
- [Capsule](packages/capsule/README.md)
- [Coinbase](packages/coinbase/README.md)
- [Enkrypt](packages/enkrypt/README.md)
- [FinoaConnect](packages/finoaconnect/README.md)
- [Fortmatic](packages/fortmatic/README.md)
- [Frame](packages/frame/README.md)
- [Frontier](packages/frontier/README.md)
- [Infinity Wallet](packages/infinity-wallet/README.md)
- [Magic](packages/magic/README.md)
- [MetaMask](packages/metamask/README.md)
- [MEW-Wallet](packages/mew-wallet/README.md)
- [OKX](packages/okx/README.md)
- [Particle Network](packages/particle-network/README.md)
- [Portis](packages/portis/README.md)
- [Safe](packages/gnosis/README.md)
- [Sequence](packages/sequence/README.md)
- [Taho (previously Tally Ho)](packages/tallyho/README.md)
- [Trust](packages/trust/README.md)
- [Unstoppable Domains](packages/uauth/README.md)
- [WalletConnect](packages/walletconnect/README.md)
- [Web3Auth](packages/web3auth/README.md)
- [XDEFI](packages/xdefi/README.md)

**Hardware Wallets**

- [D'CENT](packages/dcent/README.md)
- [KeepKey](packages/keepkey/README.md)
- [Keystone](packages/keystone/README.md)
- [Ledger](packages/ledger/README.md)
- [Trezor](packages/trezor/README.md)

**Frameworks**

- [React](packages/react/README.md)
- [Solid](packages/solid/README.md)
- [Vue](packages/vue/README.md)

## Test out the demo app

If you would like to test out the current functionality of V2 in a small browser demo, then:

- Clone the repo: `git clone git@github.com:blocknative/onboard.git`
- Change in to the onboard directory: `cd onboard`
- Checkout the V2 feature branch: `git checkout main`
- Install the dependencies: `yarn` (if running a M1 mac - `yarn install-m1-mac`)
- Run all packages in dev mode: `yarn dev`
- To view the demo app in the browser after running the above steps navigate to [http://localhost:8080](http://localhost:8080)
