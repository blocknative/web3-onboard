# @bn-onboard/core

This is the core package that contains all of the UI and logic to be able to seamlessly connect user's wallets to your app and track the state of those wallets. Onboard no longer contains any wallet specific code, so wallets need to be passed in upon initialization.

## Initialization

Onboard needs to be initialized with options that are static to your app:

- The wallets that your app supports (required)
- The chains that your app supports (required)
- Your app's metadata so that it can be displayed in the UI (optional)
- Customized copy for the rendered UI as well as Internationalization (optional)

### Options

**`wallets`**
An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet. A wallet module is an abstraction that allows for easy interaction without needing to know the specifics of how that wallet works and are separate packages that can be included.

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
  // SVG icon string, with height set to 100%, width unset
  icon: string
  // description of app
  description?: string
  // url to a getting started guide for app
  gettingStartedGuide?: string
  // url that points to more information about app
  explore?: string
  // when no injected wallets detected, recommend the user to install some
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

To initiate a user to select and connect a wallet you can call the `connectWallet` function on an initialized Onboard instance. It will return a `Promise` that will resolve when the user either successfully connects a wallet, or when they dismiss the UI. The resolved value from the promise will be the latest state of the `wallets` array. The order of the wallets array is last to first, so the most recently selected wallet will be the first item in the array and can be thought of as the "primary wallet". If no wallet was selected, then `wallets` array will be the same as it was before calling `connectWallet`.

### Example

```javascript
async function connectWallet() {
  const wallets = await onboard.connectWallet()
  console.log(wallets)
}

connectWallet()
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

// unsubscribe when updates are no longer needed
unsubscribe()
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

```javascript
const success = await onboard.setChain('0x89')
```

The `setChain` methods takes a hex encoded string for the chain id to switch to. The chain id must be one of the chains that Onboard was initialized with. If the wallet supports programatically adding and switching the chain, then the user will be prompted to do so, if not, then a modal will be displayed indicating to the user that they need to switch chains to continue. The `setChain` method returns a promise that resolves when either the user has confirmed the chain switch, or has dismissed the modal and resolves with a boolean indicating if the switch network was successful or not.
