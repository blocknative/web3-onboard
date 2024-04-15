---
title: Connect Wallet Example
description: Learn how to connect a wallet to your dapp with Web3-Onboard. For this example, we are going to use the injected wallets module.
---

<script>
  import { ConnectWallet } from '$lib/components'
  const frameworks = ['react', 'svelte']
</script>

# {$frontmatter.title}

<ConnectWallet />

<div class="w-full  h-5"/>

Remember- if you used create-react-app, please follow the [additional setup instructions](../../docs/modules/react.md#if-using-create-react-app)

<Tabs values={frameworks}>
  <TabPanel value="react">

## Step 1: Install Dependencies

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/react @web3-onboard/injected-wallets @web3-onboard/infinity-wallet @web3-onboard/fortmatic @web3-onboard/gnosis @web3-onboard/keepkey @web3-onboard/keystone @web3-onboard/ledger @web3-onboard/portis @web3-onboard/trezor @web3-onboard/walletconnect @web3-onboard/coinbase @web3-onboard/magic @web3-onboard/dcent @web3-onboard/sequence @web3-onboard/taho @web3-onboard/trust @web3-onboard/frontier
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/react @web3-onboard/injected-wallets @web3-onboard/infinity-wallet @web3-onboard/fortmatic @web3-onboard/gnosis @web3-onboard/keepkey @web3-onboard/keystone @web3-onboard/ledger @web3-onboard/portis @web3-onboard/trezor @web3-onboard/walletconnect @web3-onboard/coinbase @web3-onboard/magic @web3-onboard/dcent @web3-onboard/sequence @web3-onboard/taho @web3-onboard/trust @web3-onboard/frontier
```

  </TabPanel>
</Tabs>

## Step 2: Import + Configure

Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet.

```js title="App.tsx"|copy
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import infinityWalletModule from '@web3-onboard/infinity-wallet'
import fortmaticModule from '@web3-onboard/fortmatic'
import safeModule from '@web3-onboard/gnosis'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
import dcentModule from '@web3-onboard/dcent'
import sequenceModule from '@web3-onboard/sequence'
import tahoModule from '@web3-onboard/taho'
import trustModule from '@web3-onboard/trust'
import frontierModule from '@web3-onboard/frontier'
import ConnectWallet from './ConnectWallet'

const INFURA_KEY = ''

const injected = injectedModule()
const coinbase = coinbaseModule()
const dcent = dcentModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'apiKey'
})

const fortmatic = fortmaticModule({
  apiKey: 'apiKey'
})

const infinityWallet = infinityWalletModule()
const ledger = ledgerModule()
const keystone = keystoneModule()
const keepkey = keepkeyModule()
const safe = safeModule()
const sequence = sequenceModule()
const taho = tahoModule() // Previously named Tally Ho wallet
const trust = trustModule()
const frontier = frontierModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  apiKey: 'apiKey'
})

const wallets = [
  infinityWallet,
  keepkey,
  sequence,
  injected,
  trust,
  frontier,
  taho,
  ledger,
  coinbase,
  dcent,
  trezor,
  walletConnect,
  safe,
  magic,
  fortmatic,
  keystone,
  portis
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`
  },
  {
    id: 11155111,
    token: 'ETH',
    label: 'Sepolia',
    rpcUrl: 'https://rpc.sepolia.org/'
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'OP Mainnet',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
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

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const web3Onboard = init({
  wallets,
  chains,
  appMetadata
})

function App() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <ConnectWallet />
    </Web3OnboardProvider>
  )
}

export default App
```

## Step 2: Display the connect wallet button

In another file we'll create the component that will display our connect wallet button. We'll be using the `useConnectWallet` hook in order to achieve this.

```js title="ConnectWallet.tsx"|copy
import { useEffect, useState } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  }, [wallet])

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
```

## Step 3: Display account information

Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar.

```js title="ConnectWallet.tsx"|copy{8,10-19,28-37}
import { useEffect, useState } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import type {
    TokenSymbol
  } from '@web3-onboard/common'

interface Account {
    address: string,
    balance: Record<TokenSymbol, string> | null,
    ens: {name: string|undefined, avatar: string|undefined}
}

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  }, [wallet])

  if(wallet?.provider && account) {
    return (
        <div>
            {account.ens?.avatar ? (<img src={account.ens?.avatar} alt="ENS Avatar" />) : null}
          <div>{ account.ens?.name ? account.ens.name : account.address }</div>
          <div>Connected to {wallet.label}</div>
          <button onClick={() => { disconnect({ label: wallet.label }) }}>Disconnect</button>
        </div>
    )
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={() => connect()}>
        Connect
      </button>
    </div>
  )
}
```

  </TabPanel>
  <TabPanel value="svelte">

## Step 1: Import + Configure

Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet.

```js title="onboard.js"|copy
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import infinityWalletModule from '@web3-onboard/infinity-wallet'
import fortmaticModule from '@web3-onboard/fortmatic'
import safeModule from '@web3-onboard/gnosis'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
import web3authModule from '@web3-onboard/web3auth'
import dcentModule from '@web3-onboard/dcent'
import sequenceModule from '@web3-onboard/sequence'
import tahoModule from '@web3-onboard/taho'
import trustModule from '@web3-onboard/trust'
import frontierModule from '@web3-onboard/frontier'

const INFURA_KEY = ''

const injected = injectedModule()
const coinbase = coinbaseModule()
const dcent = dcentModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'apiKey'
})

const fortmatic = fortmaticModule({
  apiKey: 'apiKey'
})

const infinityWallet = infinityWalletModule()
const ledger = ledgerModule()
const keystone = keystoneModule()
const keepkey = keepkeyModule()
const safe = safeModule()
const sequence = sequenceModule()
const taho = tahoModule() // Previously named Tally Ho wallet
const trust = trustModule()
const frontier = frontierModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  apiKey: 'apiKey'
})

const enkrypt = enkryptModule()
const mewWallet = mewWalletModule()

const wallets = [
  infinityWallet,
  keepkey,
  sequence,
  injected,
  taho,
  ledger,
  coinbase,
  dcent,
  trust,
  frontier,
  trezor,
  walletConnect,
  enkrypt,
  mewWallet,
  safe,
  magic,
  fortmatic,
  keystone,
  portis
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
  },
  {
    id: 11155111,
    token: 'ETH',
    label: 'Sepolia',
    rpcUrl: 'https://rpc.sepolia.org/'
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'OP Mainnet',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
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

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const onboard = Onboard({
  wallets,
  chains,
  appMetadata
})

export default onboard
```

## Step 2: Display the connect wallet button

In main `App.svelte` file we'll import our previously initialized web3-onboard instance and then display our connect wallet button.

```svelte title="App.svelte"|copy
<script lang="js">
  import onboard from './onboard.js'
</script>

<div>
  <button disabled={connecting} onClick={connect}> Connect </button>
</div>
```

## Step 3: Display account information

Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar.

```svelte title="App.svelte"|copy
<script lang="js">
  import onboard from './onboard.js'

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets')

  // The first wallet in the array of connected wallets
  $: connectedAccount = $wallets$?.[0]?.accounts?.[0]

  $: account = connectedAccount?.ens?.name
  ? {
      ens: connectedAccount?.ens,
      address: connectedAccount?.address
    }
  : { address: connectedAccount?.address }

  const connect = async () => {
    await onboard.connectWallet()
  }

  const disconnect = ({ label }) => {
    onboard.disconnectWallet({ label })
  }
</script>

{#if $wallets$?.[0]?.provider}
  <div>
    <img src={ens?.avatar} alt="ENS Avatar" />
    <div>{ ens?.name ? ens.name : address }</div>
    <div>Connected to {wallet.label}</div>
    <button onClick={() => { disconnect($wallets$?.[0]) }>Disconnect</button>
  </div>
{:else}
  <div>
    <button
      onClick={connect}>
      Connect
    </button>
  </div>
{/if}
```

  </TabPanel>
</Tabs>

## Interacting with the providers - Transfer, Send, Sign using ethers.js

For examples of interacting with the wallet providers please see our demo project [here](https://github.com/blocknative/web3-onboard/blob/9b871a1b3117e92a7c87285677fa5b35c544a8e0/packages/demo/src/App.svelte#L447)
