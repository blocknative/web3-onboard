# React

A collection of React hooks for implementing web3-onboard in to a React project

## Quickstart with Injected Wallets and Ethers Provider

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/react
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/react
```

  </TabPanel>
</Tabs>

### Add Code

```javascript
import React from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
const dappId = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

// initialize Onboard
init({
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

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  return (
    <div>
      <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
  )
}
```

## `init`

The `init` function must be called before any hooks can be used. The `init` function just initializes `web3-onboard` and makes it available for all hooks to use. For reference check out the [initialization docs for `@web3-onboard/core`](./core.md#initialization)

## `useConnectWallet`

This hook allows you to connect the user's wallet and track the state of the connection status and the wallet that is connected.

```ts
import { useConnectWallet } from '@web3-onboard/react'

type UseConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options: ConnectOptions) => Promise<void>,
  (wallet: DisconnectOptions) => Promise<void>,
  (addresses?: string[]) => Promise<void>,
  (wallets: WalletInit[]) => void,
  (wallet: WalletState, address?: string) => void
]

type ConnectOptions = {
  autoSelect?: string // wallet name to auto-select for user
}

type DisconnectOptions = {
  label: string  // wallet label
}

type WalletState = {
  label: string
  icon: string
  provider: EIP1193Provider
  accounts: Account[]
  chains: ConnectedChain[]
  instance?: unknown
}

type WalletInit = (helpers: WalletHelpers) => WalletModule | WalletModule[] | null;

const [
  {
    wallet, // the wallet that has been connected or null if not yet connected
    connecting // boolean indicating if connection is in progress
  },
  connect, // function to call to initiate user to connect wallet
  disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet
  updateBalances, // function to be called with an optional array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
  setWalletModules, // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
  setPrimaryWallet // function that can set the primary wallet and/or primary account within that wallet. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in
] = useConnectWallet()


```

**`setPrimaryWallet`**
The primary wallet (first in the list of connected wallets) and primary account (first in the list of connected accounts for a wallet) can be set by using the `setPrimaryWallet` function. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in:

```typescript
// set the second wallet in the wallets array as the primary
setPrimaryWallet(wallets[1])

// set the second wallet in the wallets array as the primary wallet
// as well as setting the third account in that wallet as the primary account
setPrimaryWallet(wallets[1], wallets[1].accounts[2].address)
```

## `useSetChain`

This hook allows you to set the chain of a user's connected wallet, keep track of the current chain the user is connected to and the status of setting the chain. Passing in a wallet label will operate on that connected wallet, otherwise it will default to the last connected wallet.

```typescript
import { useSetChain } from '@web3-onboard/react'

type UseSetChain = (
  walletLabel?: string
): [
  {
    chains: Chain[]
    connectedChain: ConnectedChain | null
    settingChain: boolean
  },
  (options: SetChainOptions) => Promise<void>
]

type SetChainOptions = {
  chainId: string
  chainNamespace?: string
  wallet?: WalletState['label']
}

const [
  {
    chains, // the list of chains that web3-onboard was initialized with
    connectedChain, // the current chain the user's wallet is connected to
    settingChain // boolean indicating if the chain is in the process of being set
  },
  setChain // function to call to initiate user to switch chains in their wallet
] = useSetChain()
```

## `useNotifications`

This hook allows the dev to access all notifications if enabled, send custom notifications and update notify <enable/disable & update transactionHandler function>
**note** requires an API key be added to the initialization, enabled by default if API key exists
For full Notification documentation please see [Notify section within the `@web3-onboard/core` docs](./core.md#options)

```typescript
type UseNotifications = (): [
  Notification[],
  (updatedNotification: CustomNotification) => {
    dismiss: () => void
    update: UpdateNotification
  },
  (update: Partial<Notify>) => void,
  (options: PreflightNotificationsOptions) => Promise<void | string>
]

type Notification = {
  id: string
  key: string
  type: NotificationType
  network: Network
  startTime?: number
  eventCode: string
  message: string
  autoDismiss: number
  link?: string
  onClick?: (event: Event) => void
}
type TransactionHandlerReturn =
  | CustomNotification
  | boolean
  | void
type CustomNotification = Partial<
  Omit<Notification, 'startTime' | 'network' | 'id' | 'key'>
>
type CustomNotificationUpdate = Partial<
  Omit<Notification, 'startTime' | 'network'>
>
type NotificationType = 'pending' | 'success' | 'error' | 'hint'
interface UpdateNotification {
  (notificationObject: CustomNotification): {
    dismiss: () => void
    update: UpdateNotification
  }
}
type Notify = {
  /**
   * Defines whether to subscribe to transaction events or not
   * default: true
   */
  enabled?: boolean
  /**
   * Callback that receives all transaction events
   * Return a custom notification based on the event
   * Or return false to disable notification for this event
   * Or return undefined for a default notification
   */
  transactionHandler: (
    event: EthereumTransactionData
  ) => TransactionHandlerReturn
  /**
   * Position of notifications that defaults to the same position as the
   * Account Center (if enabled) of the top right if AC is disabled
   * and notifications are enabled (enabled by default with API key)
   */
  position?: NotificationPosition
}

type PreflightNotificationsOptions = {
  sendTransaction?: () => Promise<string | void>
  estimateGas?: () => Promise<string>
  gasPrice?: () => Promise<string>
  balance?: string | number
  txDetails?: TxDetails
  txApproveReminderTimeout?: number
}
type TxDetails = {
  value: string | number
  to?: string
  from?: string
}
```

```typescript
import { useNotifications } from '@web3-onboard/react'

const [
  notifications, // the list of all notifications that update when notifications are added, updated or removed
  customNotification, // a function that takes a customNotification object and allows custom notifications to be shown to the user, returns an update and dismiss callback
  updateNotify, // a function that takes a Notify object to allow updating of the properties
  preflightNotifications // a function that takes a PreflightNotificationsOption to create preflight notifications
] = useNotifications()

// View notifications as they come in if you would like to handle them independent of the notification display
useEffect(() => {
  console.log(notifications)
}, [notifications])

const sendTransactionWithPreFlightNotifications = async () => {
  const balanceValue = Object.values(wallet.accounts[0].balance)[0]

  const signer = provider.getUncheckedSigner()

  const txDetails = {
    to: toAddress,
    value: 1000000000000000
  }

  const sendTransaction = () => {
    return signer.sendTransaction(txDetails).then(tx => tx.hash)
  }

  const gasPrice = () => provider.getGasPrice().then(res => res.toString())

  const estimateGas = () => {
    return provider.estimateGas(txDetails).then(res => res.toString())
  }

  const transactionHash =
    await preflightNotifications({
      sendTransaction,
      gasPrice,
      estimateGas,
      balance: balanceValue,
      txDetails: txDetails
    })
  console.log(transactionHash)
}

// Custom notification example
<button
  className="bn-demo-button"
  onClick={() => {
    const { update } =
      customNotification({
        eventCode: 'dbUpdate',
        type: 'hint',
        message: 'Custom hint notification created by the dapp',
        onClick: () =>
          window.open(`https://www.blocknative.com`)
      })
    // Update your notification example below
    setTimeout(
      () =>
        update({
          eventCode: 'dbUpdateSuccess',
          message: 'Hint notification reason resolved!',
          type: 'success',
          autoDismiss: 5000
        }),
      4000
    )
  }}
>
  Custom Hint Notification
</button>
<button
  className="bn-demo-button"
  onClick={async () => {
    sendTransactionWithPreFlightNotifications()
  }}
>
  Send with In Flight and Pre Flight Notifications
</button>
```

## `useWallets`

This hook allows you to track the state of all the currently connected wallets.

```typescript
import { useWallets } from '@web3-onboard/react'

type UseWallets = (): WalletState[]

const connectedWallets = useWallets()
```

## `useAccountCenter`

This hook allows you to track and update the state of the AccountCenter

```typescript
import { useAccountCenter } from '@web3-onboard/react'

type UseAccountCenter = (): ((
  update: AccountCenter | Partial<AccountCenter>
) => void)

type AccountCenterPosition =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

type AccountCenter = {
  enabled: boolean
  position?: AccountCenterPosition
  expanded?: boolean
  minimal?: boolean
}

const updateAccountCenter = useAccountCenter()
```

## `useSetLocale`

This hook allows you to set the locale of your application to allow language updates associated with the i18n config

```typescript
import { useSetLocale } from '@web3-onboard/react'

type useSetLocale = (): ((locale: string) => void)

const updateLocale = useSetLocale()

updateLocale('es')
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

#### If using create-react-app

[CRACO](https://www.npmjs.com/package/@craco/craco) provides an similar way to override webpack config which is obfuscated in Create React App built applications.

The above webpack 5 example can be used in the `craco.config.js` file at the root level in this case.

[React App Rewired](https://www.npmjs.com/package/react-app-rewired) is another option for working with Create React App DApps

Add the following dev dependencies:
`npm i --save-dev rollup-plugin-polyfill-node webpack-bundle-analyzer assert buffer crypto-browserify stream-http https-browserify os-browserify process stream-browserify util path-browserify`

**OR**

`yarn add rollup-plugin-polyfill-node webpack-bundle-analyzer assert buffer crypto-browserify stream-http https-browserify os-browserify process stream-browserify util path-browserify -D`

```javascript
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {}
  Object.assign(fallback, {
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    path: require.resolve('path-browserify'),
    process: require.resolve('process/browser'),
    stream: require.resolve('stream-browserify'),
    url: require.resolve('url'),
    util: require.resolve('util')
  })
  config.resolve.fallback = fallback
  config.resolve.alias = {
    ...config.resolve.alias,
    'bn.js': path.resolve(__dirname, 'node_modules/bn.js'),
    lodash: path.resolve(__dirname, 'node_modules/lodash'),
    'magic-sdk': path.resolve(__dirname, 'node_modules/magic-sdk/dist/cjs/index.js')
  }
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /genesisStates\/[a-z]*\.json$/,
      contextRegExp: /@ethereumjs\/common/
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled'
    })
  ])
  config.ignoreWarnings = [/Failed to parse source map/]
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: 'pre',
    loader: require.resolve('source-map-loader'),
    resolve: {
      fullySpecified: false
    }
  })
  return config
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