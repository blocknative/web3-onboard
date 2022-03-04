# @web3-onboard/react

A collection of React hooks for implementing web3-onboard in to a React project

## Install

`npm i @web3-onboard/react`

## Example Usage

```javascript
import React from 'react'
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets
} from '@web3-onboard/react'
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

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  return (
    <div>
      <button onClick={() => connect()}>
        {connecting ? 'connecting' : 'connect'}
      </button>
      {wallet && (
        <div>
          <label>Switch Chain</label>
          {settingChain ? (
            <span>Switching chain...</span>
          ) : (
            <select
              onChange={({ target: { value } }) =>
                console.log('onChange called') || setChain({ chainId: value })
              }
              value={connectedChain.id}
            >
              {chains.map(({ id, label }) => {
                return <option value={id}>{label}</option>
              })}
            </select>
          )}
          <button onClick={() => disconnect(wallet)}>
            Disconnect Wallet
          </button>
        </div>
      )}

      {connectedWallets.map(({ label, accounts }) => {
        return (
          <div>
            <div>{label}</div>
            <div>Accounts: {JSON.stringify(accounts, null, 2)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default App
```

## `init`

The `init` function must be called before any hooks can be used. The `init` function just initializes `web3-onboard` and makes it available for all hooks to use. For reference check out the [initialization docs for `@web3-onboard/core`](../core/README.md#initialization)

## `useConnectWallet`

This hook allows you to connect the user's wallet and track the state of the connection status and the wallet that is connected.

```typescript
import { useConnectWallet } from '@web3-onboard/react'

type UseConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options: ConnectOptions) => Promise<void>,
  (wallet: DisconnectOptions) => Promise<void>
]

type ConnectOptions = {
  autoSelect?: string // wallet name to autoselect for user
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

const [
  {
    wallet, // the wallet that has been connected or null if not yet connected
    connecting // boolean indicating if connection is in progress
  },
  connect, // function to call to initiate user to connect wallet
  disconnect // function to call to with wallet<DisconnectOptions> to disconnect wallet
] = useConnectWallet()
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

## `useWallets`

This hook allows you to track the state of all the currently connected wallets.

```typescript
import { useWallets } from '@web3-onboard/react'

type UseWallets = (): WalletState[]

const connectedWallets = useWallets()
```

## Custom Styling

The Onboard styles can customized via [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). The following properties and their default properties can be customized by adding these variables to the `:root` in your CSS file:

```css
:root {
  /* CUSTOMIZE THE COLOR  PALLETTE */
  --onboard-white: white;
  --onboard-black: black;
  --onboard-primary-1: #2f80ed;
  --onboard-primary-100: #eff1fc;
  --onboard-primary-200: #d0d4f7;
  --onboard-primary-300: #b1b8f2;
  --onboard-primary-400: #929bed;
  --onboard-primary-500: #6370e5;
  --onboard-primary-600: #454ea0;
  --onboard-primary-700: #323873;
  --onboard-gray-100: #ebebed;
  --onboard-gray-200: #c2c4c9;
  --onboard-gray-300: #999ca5;
  --onboard-gray-400: #707481;
  --onboard-gray-500: #33394b;
  --onboard-gray-600: #242835;
  --onboard-gray-700: #1a1d26;
  --onboard-success-100: #d1fae3;
  --onboard-success-200: #baf7d5;
  --onboard-success-300: #a4f4c6;
  --onboard-success-400: #8df2b8;
  --onboard-success-500: #5aec99;
  --onboard-success-600: #18ce66;
  --onboard-success-700: #129b4d;
  --onboard-danger-100: #ffe5e6;
  --onboard-danger-200: #ffcccc;
  --onboard-danger-300: #ffb3b3;
  --onboard-danger-400: #ff8080;
  --onboard-danger-500: #ff4f4f;
  --onboard-danger-600: #cc0000;
  --onboard-danger-700: #660000;
  --onboard-warning-100: #ffefcc;
  --onboard-warning-200: #ffe7b3;
  --onboard-warning-300: #ffd780;
  --onboard-warning-400: #ffc74c;
  --onboard-warning-500: #ffaf00;
  --onboard-warning-600: #cc8c00;
  --onboard-warning-700: #664600;

  /* CUSTOMIZE SECTIONS OF THE CONNECT MODAL */
  --onboard-connect-content-width
  --onboard-connect-content-height
  --onboard-wallet-columns
  --onboard-connect-sidebar-background
  --onboard-connect-sidebar-color
  --onboard-connect-sidebar-progress-background
  --onboard-connect-sidebar-progress-color
  --onboard-connect-header-background
  --onboard-connect-header-color
  --onboard-link-color
  --onboard-close-button-background
  --onboard-close-button-color
  --onboard-checkbox-background
  --onboard-checkbox-color
  --onboard-wallet-button-background
  --onboard-wallet-button-background-hover
  --onboard-wallet-button-color
  --onboard-wallet-button-border-color
  --onboard-wallet-app-icon-border-color

  /* FONTS */
  --onboard-font-family-normal: Sofia Pro;
  --onboard-font-family-semibold: Sofia Pro Semibold;
  --onboard-font-family-light: Sofia Pro Light;

  --onboard-font-size-1: 3rem;
  --onboard-font-size-2: 2.25rem;
  --onboard-font-size-3: 1.5rem;
  --onboard-font-size-4: 1.25rem;
  --onboard-font-size-5: 1rem;
  --onboard-font-size-6: 0.875rem;
  --onboard-font-size-7: 0.75rem;

  /* SPACING */
  --onboard-spacing-1: 3rem;
  --onboard-spacing-2: 2rem;
  --onboard-spacing-3: 1.5rem;
  --onboard-spacing-4: 1rem;
  --onboard-spacing-5: 0.5rem;

  /* SHADOWS */
  --onboard-shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --onboard-shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
}
```

## Build Environments

Many of the wallet modules require dependencies that are not normally included in browser builds (namely the node builtin modules such as `crypto`, `buffer`, `util` etc). If you are having build issues you can try the following bundler configs to resolve these dependency issues:

#### If using create-react-app

[CRACO](https://www.npmjs.com/package/@craco/craco) provides an easy way to override webpack config which is obfuscated in Create React App built applications.

The above webpack 5 example can be used in the `craco.config.js` file at the root level in this case.


### Webpack 4

Everything should just work since the node builtins are automatically bundled in v4

### Webpack 5

You'll need to add some dev dependencies with the following command:

`npm i --save-dev assert buffer crypto-browserify stream-http https-browserify os-browserify process stream-browserify util`

Then add the following to your `webpack.config.js` file:

```javascript
const webpack = require('webpack')

module.exports = {
  resolve: {
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
        include: [
          'node_modules/**/*.js',
          new RegExp('node_modules/.vite/.*js')
        ],
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
