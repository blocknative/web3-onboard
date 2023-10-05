<a href="https://onboard.blocknative.com/">
  <img alt="Web3-Onboard UI Components" src="https://github.com/blocknative/web3-onboard/blob/develop/assets/core.svg?raw=true" />
</a>

# @web3-onboard/vue

A collection of composable functions for implementing web3-onboard in to a Vue project; compatible both with Vue 2 + composition-api and Vue 3

## Install Modules

**NPM**
`npm i @web3-onboard/vue @web3-onboard/injected-wallets ethers`

**Yarn**
`yarn add @web3-onboard/vue @web3-onboard/injected-wallets ethers`

## Quickstart

```typescript
import { init } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()

// Only one RPC endpoint required per chain
const rpcAPIKey = '<INFURA_KEY>' || '<ALCHEMY_KEY>'
const rpcUrl =
  `https://eth-mainnet.g.alchemy.com/v2/${rpcAPIKey}` ||
  `https://mainnet.infura.io/v3/${rpcAPIKey}`

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    }
  ]
})

const { wallets, connectWallet, disconnectConnectedWallet, connectedWallet } = useOnboard()

if (connectedWallet) {
  // if using ethers v6 this is:
  // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  const ethersProvider = new ethers.providers.Web3Provider(
    connectedWallet.provider,
    'any'
  )
  // ..... do stuff with the provider
}
```

## Functions

## `init`

The `init` function initializes `web3-onboard` and makes it available to the `useOnboard()` composable. For references check out the [initialization docs for `@web3-onboard/core`](../core/README.md#initialization)

### Example usage

```typescript
import { init } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()
const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ]
})
```

## `useOnboard`

`useOnboard` must be used after the `init` function has been called - it will return an object that can be destructured to obtain the following reactive variables and functions:

### Example usage

```typescript
import { useOnboard } from '@web3-onboard/vue'

// Use the composable
const onboard = useOnboard()

// Or destructure it
const { wallets, connectWallet, disconnectConnectedWallet, connectedWallet } = useOnboard()

// do stuff
```

### `connectWallet`

Function to open the onboard modal and connect to a wallet provider. For reference check out the [connecting a wallet for `@web3-onboard/core`](../core/README.md#connecting-a-wallet)

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { connectWallet: connect } = useOnboard()
</script>

<template>
  <button type="button" @click="connect">Connect to a Wallet</button>
</template>
```

### `connectedChain`

Computed property that contains the current chain to which `connectedWallet` is connected

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { connectedChain } = useOnboard()
</script>

<template>
  <span>Connected Chain: {{ connectedChain.id }}</span>
</template>
```

### `connectedWallet`

Computed property that contains the latest connected wallet

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { connectedWallet } = useOnboard()
</script>

<template>
  <span>Connected Wallet: {{ connectedWallet.label }}</span>
</template>
```

### `connectingWallet`

Readonly boolean ref that tracks the state of the wallet connection status

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { connectingWallet } = useOnboard()
</script>

<template>
  <span v-if="connectingWallet">Connecting...</span>
</template>
```

### `disconnectWallet`

Function to disconnect a specific wallet

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { disconnectWallet } = useOnboard()
const disconnect = async () => disconnectWallet('MetaMask')
</script>

<template>
  <button type="button" @click="disconnect">Disconnect MetaMask</button>
</template>
```

### `disconnectConnectedWallet`

Function to disconnect the `connectedWallet`

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { disconnectConnectedWallet } = useOnboard()
</script>

<template>
  <button type="button" @click="disconnectConnectedWallet">
    Disconnect connectedWallet
  </button>
</template>
```

### `getChain`

Function that returns the current chain a wallet is connected to

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { getChain } = useOnboard()
</script>

<template>
  <span>MetaMask is connected to: {{ getChain('MetaMask') }}</span>
</template>
```

### `setChain`

Function to set the chain of a wallet

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { setChain } = useOnboard()
const set = () => setChain({ wallet: 'MetaMask', chainId: '0x1' })
</script>

<template>
  <button type="button" @click="set">Set MetaMask chain to mainnet</button>
</template>
```

### `settingChain`

Readonly boolean ref that tracks the status of setting the chain

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { settingChain } = useOnboard()
</script>

<template>
  <span v-if="settingChain">Setting chain...</span>
</template>
```

### `wallets`

Readonly ref that contains every wallet that has been connected

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { wallets } = useOnboard()
</script>

<template>
  <div v-for="wallet in wallets">
    <span>Label: {{ wallet.label }}</span>
  </div>
</template>
```

### `alreadyConnectedWallets`

Readonly ref that contains every wallet that user connected to in the past, useful to reconnect wallets automatically after a reload

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { alreadyConnectedWallets } = useOnboard()
</script>

<template>
    <span>{{ alreadyConnectedWallets }}</span>
</template>
```

### `lastConnectedTimestamp`

Readonly ref that contains the last time that the user connected a wallet in milliseconds

### Example usage

```vue
<script setup>
import { useOnboard } from '@web3-onboard/vue'

const { lastConnectedTimestamp } = useOnboard()
</script>

<template>
  <span>Your last connection timestamp was: {{ lastConnectedTimestamp }}</span>
</template>
```
