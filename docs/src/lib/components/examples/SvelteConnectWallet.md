## Step 1: Import + Configure

Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet.

```js title="onboard.js"|copy
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const wallets = [injectedModule()]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
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
  appMetadata,
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
  <button
    disabled={connecting}
    onClick={connect}>
    Connect
  </button>
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
