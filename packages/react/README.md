# @web3-onboard/react

A collection of React hooks for implementing web3-onboard in to a React project

## Quickstart with Injected Wallets and Ethers Provider

### Install Modules

**NPM**
`npm i @web3-onboard/react @web3-onboard/injected-wallets ethers`

**Yarn**
`yarn add @web3-onboard/react @web3-onboard/injected-wallets ethers`

### Add Code

```javascript
import React from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
const dappId = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

// Only one RPC endpoint required per chain
const rpcAPIKey = '<INFURA_KEY>' || '<ALCHEMY_KEY>'
const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${rpcAPIKey}` || `https://mainnet.infura.io/v3/${rpcAPIKey}`

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
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
  )
}
```

### Using the `Web3OnboardProvider`
You can use the context provider `Web3OnboardProvider` to better manage global state. Simply wrap the provider around your `App` and
the initialized web3Onboard instance will be available in all children components. See example below.

```ts
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ethereum Ropsten',
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`
}

const chains = [ethereumRopsten]
const wallets = [injectedModule()]

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: '<svg>App Icon</svg>',
    description: "A demo of Web3-Onboard."
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
  )
}

export default MyApp
```

## `init`

The `init` function must be called before any hooks can be used. The `init` function just initializes `web3-onboard` and makes it available for all hooks to use. For reference check out the [initialization docs for `@web3-onboard/core`](../core/README.md#initialization)

## `useConnectWallet`

This hook allows you to connect the user's wallet and track the state of the connection status and the wallet that is connected.

```typescript
import { useConnectWallet } from '@web3-onboard/react'

type UseConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options: ConnectOptions) => Promise<WalletState[]>,
  (wallet: DisconnectOptions) => Promise<WalletState[]>,
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
  connect, // function to call to initiate user to connect wallet, returns a list of WalletState objects (connected wallets)
  disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet, returns a list of WalletState objects (connected wallets)
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
setPrimaryWallet(
  wallets[1],
  wallets[1].accounts[2].address
)
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
For full Notification documentation please see [Notify section within the `@web3-onboard/core` docs](../core/README.md#options)

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
