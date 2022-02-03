# @bn-onboard/core

This is the core package that contains all of the UI and logic to be able to seamlessly connect user's wallets to your app and track the state of those wallets. Onboard no longer contains any wallet specific code, so wallets need to be passed in upon initialization.

## Installation

Install the core module:

`npm i @bn-onboard/core`

If you would like to support all wallets, then you can install all of the wallet modules:

`npm i @bn-onboard/injected-wallets @bn-onboard/ledger @bn-onboard/trezor @bn-onboard/keepkey @bn-onboard/walletconnect @bn-onboard/walletlink @bn-onboard/torus @bn-onboard/portis @bn-onboard/mew @bn-onboard/gnosis @bn-onboard/fortmatic`

Note:

- MEW wallet currently fails to install on M1 macs
- All wallet modules (except for `injected-wallets`) require extra dependencies and may require polyfilling the node built in modules for the browser. See the [Build Environments](##build-environments) section for more info

## Initialization

Onboard needs to be initialized with an options object before the API can be used:

```typescript
type InitOptions {
  wallets: WalletInit[]
  chains: Chain[]
  appMetadata?: AppMetadata
  i18n?: i18nOptions
}
```

### Options

**`wallets`**
An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet. A wallet module is an abstraction that allows for easy interaction without needing to know the specifics of how that wallet works and are separate packages that can be included. A list of wallet module packages that can be installed can be found [here](packages/).

**`chains`**
An array of Chains that your app supports:

```typescript
type Chain = {
  id: ChainId // hex encoded string, eg '0x1' for Ethereum Mainnet
  rpcUrl: string // used for network requests
  label?: string // used for display, eg Ethereum Mainnet
  token?: TokenSymbol // the native token symbol, eg ETH, BNB, MATIC
}
```

**`appMetadata`**
An object that defines your app:

```typescript
type AppMetadata = {
  // app name
  name: string
  // SVG icon string, with height or width (whichever is larger) set to 100%
  icon: string
  // description of app
  description?: string
  // url to a getting started guide for app
  gettingStartedGuide?: string
  // url that points to more information about app
  explore?: string
  // if your app only supports injected wallets and when no injected wallets detected, recommend the user to install some
  recommendedInjectedWallets?: RecommendedInjectedWallets[]
}

type RecommendedInjectedWallets = {
  name: string // display name
  url: string // link to download wallet
}
```

**`i18n`**
An object that defines the display text for different locales. Can also be used to override the default text. To override the default text, pass in a object for the `en` locale.

```typescript
type Locale = string // eg 'en', 'es'
type i18nOptions = Record<Locale, i18n>
```

To see a list of all of the text values that can be internationalized or replaced, check out the [default en file](src/i18n/en.json).
Onboard is using the [ICU syntax](https://formatjs.io/docs/core-concepts/icu-syntax/) for formatting under the hood.

### Initialization Example

Putting it all together, here is an example initialization with the injected wallet modules:

```javascript
import Onboard from '@bn-onboard/core'
import injectedModule from '@bn-onboard/injected-wallets'

const ETH_MAINNET_RPC = `https://mainnet.infura.io/v3/${INFURA_KEY}`
const ETH_RINKEBY_RPC = `https://rinkeby.infura.io/v3/${INFURA_KEY}`
const MATIC_MAINNET_RPC = 'https://matic-mainnet.chainstacklabs.com'

const injected = injectedModule()

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: ETH_MAINNET_RPC
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: ETH_RINKEBY_RPC
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: MATIC_MAINNET_RPC
    }
  ],
  appMetadata: {
    name: 'Token Swap',
    icon: myIcon, // svg string icon
    description: 'Swap tokens for other tokens',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  }
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: 'custom text header'
        }
      }
    }
  }
})
```

## Connecting a Wallet

To initiate a user to select and connect a wallet you can call the `connectWallet` function on an initialized Onboard instance. It will return a `Promise` that will resolve when the user either successfully connects a wallet, or when they dismiss the UI. The resolved value from the promise will be the latest state of the `wallets` array. The order of the wallets array is last to first, so the most recently selected wallet will be the first item in the array and can be thought of as the "primary wallet". If no wallet was selected, then the `wallets` array will have the same state as it had before calling `connectWallet`.

### Example

```javascript
async function connectWallet() {
  const wallets = await onboard.connectWallet()
  console.log(wallets)
}

connectWallet()
```

### Auto Selecting a Wallet

A common UX pattern is to remember the wallet(s) that a user has previously connected by storing them in localStorage and then automatically selecting them for the user next time they visit your app.
You could enable this in your app by first syncing the `wallets` array to localStorage:

```javascript
const walletsSub = onboard.selectState('wallets')
const { unsubscribe } = walletsSub.subscribe(wallets => {
  const connectedWallets = wallets.map(({ label }) => label)
  window.localStorage.setItem(
    'connectedWallets',
    JSON.stringify(connectedWallets)
  )
})

// Don't forget to unsubscribe when your app or component un mounts to prevent memory leaks
// unsubscribe()
```

Now that you have the most recent wallets connected saved in local storage, you can auto select those wallet(s) when your app loads:

```javascript
const previouslyConnectedWallets = JSON.parse(
  window.localStorage.getItem('connectedWallets')
)

if (previouslyConnectedWallets) {
  // Connect the most recently connected wallet (first in the array)
  await onboard.connectWallet(previouslyConnectedWallets[0])

  // OR - loop through and initiate connection for all previously connected wallets
  // note: This UX might not be great as the user may need to login to each wallet one after the other
  // for (walletLabel in previouslyConnectedWallets) {
  //   await onboard.connectWallet(walletLabel)
  // }
}
```

## Disconnecting a Wallet

A wallet can be disconnected, which will cleanup any background operations the wallet may be doing and will also remove it from the Onboard `wallets` array:

```javascript
// disconnect the first wallet in the wallets array
const [primaryWallet] = onboard.state.get().wallets
await onboard.disconnectWallet(primaryWallet.label)
```

The `disconnectWallet` method takes the `wallet.label` value and returns a `Promise` that resolves to the current state of the `wallets` array.

## State

Onboard currently keeps track of the following state:

- `wallets`: The wallets connected to Onboard
- `chains`: The chains that Onboard has been initialized with

```typescript
type AppState = {
  chains: Chain[]
  wallets: WalletState[]
}

type WalletState = {
  label: string
  icon: string
  provider: EIP1193Provider
  accounts: Account[]
  chain: ChainId
  instance?: unknown
}

type Account = {
  address: string
  ens: {
    name?: string
    avatar?: string
    contentHash?: string
    getText?: (key: string) => Promise<string | undefined>
  }
  balance: Record<TokenSymbol, string>
}

type ChainId = string
type TokenSymbol = string
```

The current state of Onboard can be accessed at any time using the `state.get()` method:

```javascript
const currentState = onboard.state.get()
```

State can also be subscribed to using the `state.select()` method. The `select` method will return an [RXJS Observable](https://rxjs.dev/guide/observable). Understanding of RXJS observables is not necessary to subscribe to state updates, but allows for composable functionality if wanted. The key point to understand is that if you subscribe for updates, remember to unsubscribe when you are finished to prevent memory leaks.

To subscribe to all state updates, call the `select` method with no arguments:

```javascript
const state = onboard.state.select()
const { unsubscribe } = state.subscribe(update =>
  console.log('state update: ', update)
)

// remember to unsubscribe when updates are no longer needed
// unsubscribe()
```

Specific top level slices of state can be subcribed to. For example you may want to just subscribe to receive updates to the `wallets` array only:

```javascript
const wallets = onboard.state.select('wallets')
const { unsubscribe } = wallets.subscribe(update =>
  console.log('wallets update: ', update)
)

// unsubscribe when updates are no longer needed
unsubscribe()
```

## Setting the User's Chain/Network

When initializing Onboard you define a list of chains/networks that your app supports. If you would like to prompt the user to switch to one of those chains, you can use the `setChain` method on an initialized instance of Onboard:

```typescript
type SetChain = (options: SetChainOptions) => Promise<boolean>
type SetChainOptions = {
  chainId: string // hex encoded string
  wallet?: string // the wallet.label of the wallet to set chain
}

const success = await onboard.setChain({ chainId: '0x89' })
```

The `setChain` methods takes an options object with a `chainId` property hex encoded string for the chain id to switch to. The chain id must be one of the chains that Onboard was initialized with. If the wallet supports programatically adding and switching the chain, then the user will be prompted to do so, if not, then a modal will be displayed indicating to the user that they need to switch chains to continue. The `setChain` method returns a promise that resolves when either the user has confirmed the chain switch, or has dismissed the modal and resolves with a boolean indicating if the switch network was successful or not. The `setChain` method will by default switch the first wallet (the most recently connected) in the `wallets` array. A specific wallet can be targeted by passing in the `wallet.label` in the options object as the `wallet` parameter.

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

  --onboard-font-line-height-1: 24px;
  --onboard-font-line-height-2: 20px;
  --onboard-font-line-height-3: 16px;
  --onboard-font-line-height-4: 12px;

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

#### If using create-react-app

[CRACO](https://www.npmjs.com/package/@craco/craco) provides an easy way to override webpack config which is obfuscated in Create React App built applications.

The above webpack 5 example can be used in the `craco.config.js` file at the root level in this case.

**Note:** currently still facing some challenges building with CRA and CRACO for hardware wallets

### SvelteKit

Add the following dev dependencies:

`npm i --save-dev rollup-plugin-polyfill-node`

Then add the following to your `svelte.config.js` file:

```javascript
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const MODE = process.env.NODE_ENV
const development = MODE === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    target: '#svelte',
    vite: {
      plugins: [
        development &&
          nodePolyfills({
            include: [
              'node_modules/**/*.js',
              new RegExp('node_modules/.vite/.*js')
            ]
          })
      ],
      build: {
        rollupOptions: {
          plugins: [nodePolyfills()]
        },
        commonjsOptions: {
          transformMixedEsModules: true
        }
      }
    }
  }
}

export default config
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
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      })
  ],
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
}
```
