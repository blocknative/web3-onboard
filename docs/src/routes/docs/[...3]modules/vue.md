# Vue

A collection of composable functions for implementing web3-onboard in to a Vue project; compatible both with Vue 2 + composition-api and Vue 3

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/vue
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/vue
```

  </TabPanel>
</Tabs>

## Quickstart

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

const { wallets, connectWallet, disconnectConnectedWallet, connectedWallet } = useOnboard()

if (connectedWallet) {
  const ethersProvider = new ethers.providers.Web3Provider(connectedWallet.provider, 'any')
  // ..... do stuff with the provider
}
```

## Functions

## `init`

The `init` function initializes `web3-onboard` and makes it available to the `useOnboard()` composable. For references check out the [initialization docs for `@web3-onboard/core`](./core.md#initialization)

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

Function to open the onboard modal and connect to a wallet provider. For reference check out the [connecting a wallet for `@web3-onboard/core`](./core.md#connecting-a-wallet)

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
  <button type="button" @click="connect">Connect to a Wallet</button>
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
  <span>Connected Chain: {{ connectedChain.id }}</span>
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
  <span>Connected Wallet: {{ connectedWallet.label }}</span>
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
  <button type="button" @click="disconnect">Disconnect MetaMask</button>
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
  <button type="button" @click="disconnectConnectedWallet">Disconnect connectedWallet</button>
</template>
```

### `getChain`

Function that returns the current chain a wallet is connected to

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
  <span>MetaMask is connected to: {{ getChain('MetaMask') }}</span>
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
  <button type="button" @click="set">Set MetaMask chain to mainnet</button>
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
```

### `alreadyConnectedWallets`

Readonly ref that contains every wallet that user connected to in the past; useful to reconnect wallets automatically after a reload

### Example usage

```
vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { alreadyConnectedWallets } = useOnboard()
    return { alreadyConnectedWallets }
  }
}
</script>

<template>
  <div v-for="wallet in wallets">
    <span>Label: {{wallet.label}}</span>
  </div>
</template>
```

### `lastConnectedTimestamp`

Readonly ref that contains the last time that the user connected a wallet in milliseconds

### Example usage

```
vue
<script>
import { useOnboard } from '@web3-onboard/vue'
export default {
  setup() {
    const { lastConnectedTimestamp } = useOnboard()
    return { lastConnectedTimestamp }
  }
}
</script>

<template>
  <span>Your last connection timestamp was: {{ lastConnectedTimestamp }}</span>
</template>
```


## Build Environments

Many of the wallet modules require dependencies that are not normally included in browser builds (namely the node builtin modules such as `crypto`, `buffer`, `util` etc). If you are having build issues you can try the following bundler configs to resolve these dependency issues:

### Webpack 4

Node built-ins are automatically bundled in v4 so that portion is handled automatically.

**web3auth** and **torus** will require a Babel to compile from es6 if not already supported. See config for Babel and Webpack4 as follows

`npm i --save-dev @babel/cli @babel/core @babel/node @babel/plugin-proposal-nullish-coalescing-operator @babel/plugin-proposal-optional-chaining @babel/plugin-syntax-bigint @babel/register`
**AND**
`npm i babel-loader`

**babel.config.js**

```javascript
module.exports = (api) => {
  api.cache(true)
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-bigint'
  ]
  return { plugins }
}
```

**webpack.config.js**

```javascript
config.module.rules = [
  ...otherModuleRules,
  {
    test: /\.js$/,
    exclude: (_) => !/node_modules\/(@web3auth|@ethereumjs)/.test(_),
    loader: 'babel-loader'
  }
]
```

### Webpack 5

You'll need to add some dev dependencies with the following command:

`npm i --save-dev assert buffer crypto-browserify stream-http https-browserify os-browserify process stream-browserify util path-browserify`

Then add the following to your `webpack.config.js` file:

```javascript
const webpack = require('webpack')

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify')
    },
    alias: {
      assert: 'assert',
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util'
    }
  },
  experiments: {
    asyncWebAssembly: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
}
```

### Vite

Add the following dev dependencies:

`npm i --save-dev rollup-plugin-polyfill-node`

Then add the following to your `vite.config.js` file:

```javascript
import nodePolyfills from 'rollup-plugin-polyfill-node'

const MODE = process.env.NODE_ENV
const development = MODE === 'development'

export default {
  // other config options
  plugins: [
    development &&
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
        http: true,
        crypto: true
      })
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert'
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills({ crypto: true, http: true })]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
}
```

### Nuxt.js

Add the following to your `nuxt.config.js`:

```javascript
build: {
  standalone: true,
}
```
