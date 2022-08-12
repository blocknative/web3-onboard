# @web3-onboard/core

This is the core package that contains all of the UI and logic to be able to seamlessly connect user's wallets to your app and track the state of those wallets. Onboard no longer contains any wallet specific code, so wallets need to be passed in upon initialization.

### Install

Install the core module:


```
npm i @web3-onboard/core
```

```
yarn add @web3-onboard/core
```

If you would like to support all wallets, then you can install all of the wallet modules:

```
npm i @web3-onboard/injected-wallets @web3-onboard/coinbase @web3-onboard/ledger @web3-onboard/trezor @web3-onboard/keepkey @web3-onboard/walletconnect @web3-onboard/web3auth @web3-onboard/torus @web3-onboard/portis @web3-onboard/mew @web3-onboard/gnosis @web3-onboard/magic @web3-onboard/fortmatic @web3-onboard/dcent
```


```
yarn add @web3-onboard/injected-wallets @web3-onboard/coinbase @web3-onboard/ledger @web3-onboard/trezor @web3-onboard/keepkey @web3-onboard/walletconnect @web3-onboard/web3auth @web3-onboard/torus @web3-onboard/portis @web3-onboard/mew @web3-onboard/gnosis @web3-onboard/magic @web3-onboard/fortmatic @web3-onboard/dcent
```

:::note
- MEW wallet currently fails to install on M1 macs
- All wallet modules (except for `injected-wallets`) require extra dependencies and may require polyfilling the node built in modules for the browser. See the [Build Environments](#build-environments) section for more info
- **If using React** you may be interested in checking out the React Hooks package here - https://www.npmjs.com/package/@web3-onboard/react
- **If using Vue** you may be interested in checking out the Vue package here - https://www.npmjs.com/package/@web3-onboard/vue
:::

## Initialization

Onboard needs to be initialized with an options object before the API can be used:

```ts
type InitOptions {
  wallets: WalletInit[]
  chains: Chain[]
  appMetadata?: AppMetadata
  i18n?: i18nOptions
  accountCenter?: AccountCenterOptions
  apiKey?: string
  notify?: Partial<NotifyOptions>
}
```

### Options

**`wallets`**
An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet. A wallet module is an abstraction that allows for easy interaction without needing to know the specifics of how that wallet works and are separate packages that can be included.

**`chains`**
An array of Chains that your app supports:

```ts
type Chain = {
  id: ChainId // hex encoded string, eg '0x1' for Ethereum Mainnet
  namespace?: 'evm' // string indicating chain namespace. Defaults to 'evm' but will allow other chain namespaces in the future
  rpcUrl: string // used for network requests
  label: string // used for display, eg Ethereum Mainnet
  token: TokenSymbol // the native token symbol, eg ETH, BNB, MATIC
  color?: string // the color used to represent the chain and will be used as a background for the icon
  icon?: string // the icon to represent the chain
  publicRpcUrl?: string // an optional public RPC used when adding a new chain config to the wallet
  blockExplorerUrl?: string // also used when adding a new config to the wallet
}
```

**`appMetadata`**
An object that defines your app:

```ts
type AppMetadata = {
  // app name
  name: string
  // SVG icon string, with height or width (whichever is larger) set to 100% or a valid image URL
  // note: if using an emoji make sure to send base64 string
  icon: string
  // Optional wide format logo (ie icon and text) to be displayed in the sidebar of connect modal. Defaults to icon if not provided
  logo?: string
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

To see a list of all of the text values that can be internationalized or replaced, check out the [default en file](https://github.com/blocknative/web3-onboard/blob/v2-web3-onboard-develop/packages/core/src/i18n/en.json).
Onboard is using the [ICU syntax](https://formatjs.io/docs/core-concepts/icu-syntax/) for formatting under the hood.

**`accountCenter`**
An object that defines whether the account center UI (default and minimal) is enabled and it's position on the screen. Currently the account center is enabled for both desktop and mobile devices.


```ts
export type AccountCenter = {
  enabled: boolean
  position?: AccountCenterPosition // default: 'topRight'
  expanded?: boolean // default: true
  minimal?: boolean // enabled by default for mobile
  containerElement?: string // defines the DOM container element for svelte to attach
}

export type AccountCenterOptions = {
  desktop: Omit<AccountCenter, 'expanded'>
  mobile: Omit<AccountCenter, 'expanded'>
}

type AccountCenterPosition =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'
```

**`notify`**
Notify provides by default transaction notifications for all connected wallets on the current blockchain. When switching chains the previous chain listeners remain active for 60 seconds to allow capture and report of an remaining transactions that may be in flight.
By default transaction notifications are captured if a DAppID is provided in the Onboard config along with the Account Center being enabled.
An object that defines whether transaction notifications will display (defaults to true if an API key is provided). This object contains an `enabled` flag prop and an optional `transactionHandler` which is a callback that can disable or allow customizations of notifications.
Currently notifications are positioned in the same location as the account center (either below, if the Account Center is positioned along the top, or above if positioned on the bottom of the view).
The `transactionHandler` can react off any property of the Ethereum TransactionData returned to the callback from the event (see console.log in example init). In turn, it can return a Custom `Notification` object to define the verbiage, styling, or add functionality:

- `Notification.message` - to completely customize the message shown
- `Notification.eventCode` - handle codes in your own way - see codes here under the notify prop [default en file here](https://github.com/blocknative/web3-onboard/blob/v2-web3-onboard-develop/packages/core/src/i18n/en.json)
- `Notification.type` - icon type displayed (see `NotificationType` below for options)
- `Notification.autoDismiss` - time (in ms) after which the notification will be dismissed. If set to `0` the notification will remain on screen until the user dismisses the notification, refreshes the page or navigates away from the site with the notifications
- `Notification.link` - add link to the transaction hash. For instance, a link to the transaction on etherscan
- `Notification.onClick()` - onClick handler for when user clicks the notification element

Notify can also be styled by using the CSS variables found below. These are setup to allow maximum customization with base styling variables setting the global theme (i.e. `--onboard-grey-600`) along with more precise component level styling variables available (`--notify-onboard-grey-600`) with the latter taking precedent if defined

If notifications are enabled the notifications can be handled through onboard app state as seen below.

```js
const wallets = onboard.state.select('notifications')
const { unsubscribe } = wallets.subscribe(update =>
  console.log('transaction notifications: ', update)
)

// unsubscribe when updates are no longer needed
unsubscribe()
```

```ts
export type NotifyOptions = {
  desktop: Notify
  mobile: Notify
}
export type Notify = {
  enabled: boolean // default: true
  /**
   * Callback that receives all transaction events
   * Return a custom notification based on the event
   * Or return false to disable notification for this event
   * Or return undefined for a default notification
   */
  transactionHandler?: (
    event: EthereumTransactionData
  ) => TransactionHandlerReturn
  position: CommonPositions
}

export type CommonPositions =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

export type TransactionHandlerReturn = CustomNotification | boolean | void

export type CustomNotification = Partial<Omit<Notification, 'id' | 'startTime'>>

export type Notification = {
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

export type NotificationType = 'pending' | 'success' | 'error' | 'hint'

export declare type Network =
  | 'main'
  | 'testnet'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'xdai'
  | 'bsc-main'
  | 'matic-main'
  | 'fantom-main'
  | 'matic-mumbai'
  | 'local'

export interface UpdateNotification {
  (notificationObject: CustomNotification): {
    dismiss: () => void
    update: UpdateNotification
  }
}
```

### Initialization Example

Putting it all together, here is an example initialization with the injected wallet modules:

```ts
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/{INFURA_ID}'
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: 'https://ropsten.infura.io/v3/{INFURA_ID}'
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: 'https://rinkeby.infura.io/v3/{INFURA_ID}'
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom Mainnet',
      rpcUrl: 'https://rpc.ftm.tools/'
    }
  ],
  appMetadata: {
    name: 'Token Swap',
    icon: myIcon, // svg string icon
    logo: myLogo, // svg string logo
    description: 'Swap tokens for other tokens',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  },
  apiKey: 'xxx387fb-bxx1-4xxc-a0x3-9d37e426xxxx'
  notify: {
    desktop: {
      enabled: true,
      transactionHandler: transaction => {
        console.log({ transaction })
        if (transaction.eventCode === 'txPool') {
          return {
            type: 'success',
            message: 'Your transaction from #1 DApp is in the mempool',
          }
        }
      },
      position: 'bottomLeft'
    },
    mobile: {
      enabled: true,
      transactionHandler: transaction => {
        console.log({ transaction })
        if (transaction.eventCode === 'txPool') {
          return {
            type: 'success',
            message: 'Your transaction from #1 DApp is in the mempool',
          }
        }
      },
      position: 'topRight'
    }
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: true
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: true
    }
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: 'custom text header'
        }
      },
      notify: {
        transaction: {
          txStuck: 'custom text for this notification event'
        },
        watched: {
          // Any words in brackets can be re-ordered or removed to fit your dapps desired verbiage
          "txPool": "Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}"
        }
      }
    },
    es: {
      transaction: {
        txRequest: 'Su transacción está esperando que confirme'
      }
    }
  }
})
```
