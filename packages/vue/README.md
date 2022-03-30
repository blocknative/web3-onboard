# @web3-onboard/vue

A collection of composable functions for implementing web3-onboard in to a Vue project; compatible both with Vue 2 + composition-api and Vue 3

## Install

`npm i @web3-onboard/vue`

## Functions 

## `init`

The `init` function must be called before the composable can be used. The `init` function just initializes `web3-onboard` and makes it available for usage in the composable. For reference check out the [initialization docs for `@web3-onboard/core`](../core/README.md#initialization)


### Example usage
```typescript
import { init } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import walletLinkModule from '@web3-onboard/walletlink'
import portisModule from '@web3-onboard/portis'
import fortmaticModule from '@web3-onboard/fortmatic'
import torusModule from '@web3-onboard/torus'
import keepkeyModule from '@web3-onboard/keepkey'

const injected = injectedModule()
const walletLink = walletLinkModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
})

const fortmatic = fortmaticModule({
  apiKey: 'pk_test_886ADCAB855632AA'
})

const torus = torusModule()
const ledger = ledgerModule()
const keepkey = keepkeyModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

const web3Onboard = init({
  wallets: [
    ledger,
    trezor,
    walletConnect,
    keepkey,
    walletLink,
    injected,
    fortmatic,
    portis,
    torus
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: 'https://ropsten.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: 'https://rinkeby.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    }
  ],
  appMetadata: {
    name: 'Blocknative',
    icon: '<svg><svg/>',
    description: 'Demo app for Onboard V2',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  }
})
```

## `useOnboard`

The `useOnboard` function is the composable function that you will need to call; it raise an error if `init` hasn't been called yet, if `init` has been called it will return an object that can destructured to obtain the following reactive variables and functions:

### Example usage
```typescript
import { useOnboard } from '@web3-onboard/vue'
// Use the composable
const onboard = useOnboard()
// Or destructure it
const { wallets, chains, connectWallet, disconnectConnectedWallet, connectedWallet } = useOnboard()
// do stuff
```

### `chains`
Readonly ref that contains every configured chain

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { chains } = useOnboard()
    return { chains }
  }
}
</script>

<template>
  <div v-for="chain in chains">
    <span>Id: {{chain.id}}</span>
    <span>Namespace: {{chain.namespace}}</span>
  </div>
</template>
```

### `connectWallet`
Function to open the onboard modal and connect a modal. For reference check out the [connecting a wallet for `@web3-onboard/core`](../core/README.md#connecting-a-wallet)

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { connectWallet } = useOnboard()
    const connect = async () => connectWallet()
    return { connect }
  }
}
</script>

<template>
  <button type="button" @click="connect">
    Connect to a Wallet
  </button>
</template>
```

### `connectedChain`
Computed property that contains the current chain to which `connectedWallet` is connected

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { connectedChain } = useOnboard()
    return { connectedChain }
  }
}
</script>

<template>
  <span>Connected Chain: {{connectedChain.id}}</span>
</template>
```

### `connectedWallet`
Computed property that contains the latest connected wallet

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { connectedWallet } = useOnboard()
    return { connectedWallet }
  }
}
</script>

<template>
  <span>Connected Wallet: {{connectedWallet.label}}</span>
</template>
```

### `connectingWallet`
Readonly boolean ref that tracks the state of the wallet connection status

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { connectingWallet } = useOnboard()
    return { connectingWallet }
  }
}
</script>

<template>
  <span v-if="connectingWallet">Connecting...</span>
</template>
```

### `disconnectWallet`
Function to disconnect a specific wallet

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { disconnectWallet } = useOnboard()
    const disconnect = async () => disconnectWallet('MetaMask')
    return { disconnect }
  }
}
</script>

<template>
  <button type="button" @click="disconnect">
    Disconnect MetaMask
  </button>
</template>
```

### `disconnectConnectedWallet`
Function to disconnect the `connectedWallet`

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { disconnectConnectedWallet } = useOnboard()
    return { disconnectConnectedWallet }
  }
}
</script>

<template>
  <button type="button" @click="disconnectConnectedWallet">
    Disconnect connectedWallet
  </button>
</template>
```

### `getChain`
Function that returns the current chain that a wallet is connected to

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { getChain } = useOnboard()
    return { getChain }
  }
}
</script>

<template>
  <span>MetaMask is connected to: {{getChain('MetaMask')}}</span>
</template>
```

### `setChain`
Function to set the chain of a wallet

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { setChain } = useOnboard()
    const set = () => setChain({ wallet: 'MetaMask', chainId: '0x1' })
    return { set }
  }
}
</script>

<template>
  <button type="button" @click="set">
    Set MetaMask chain to mainnet
  </button>
</template>
```

### `settingChain`
Readonly boolean ref that tracks the status of setting the chain

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { settingChain } = useOnboard()
    return { settingChain }
  }
}
</script>

<template>
  <span v-if="settingChain">Setting chain...</span>
</template>
```

### `wallets`
Readonly ref that contains every wallet that has been connected

### Example usage
```vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { wallets } = useOnboard()
    return { wallets }
  }
}
</script>

<template>
  <div v-for="wallet in wallets">
    <span>Label: {{wallet.label}}</span>
  </div>
</template>
```
