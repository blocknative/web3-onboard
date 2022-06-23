# @web3-onboard/react

A collection of React hooks for implementing web3-onboard in to a React project

## Install

`npm i @web3-onboard/react`

## Example Usage

```javascript
import React from 'react'
import { ethers } from 'ethers'
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets
} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseModule from '@web3-onboard/coinbase'
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import portisModule from '@web3-onboard/portis'
import fortmaticModule from '@web3-onboard/fortmatic'
import torusModule from '@web3-onboard/torus'
import keepkeyModule from '@web3-onboard/keepkey'
import dcentModule from '@web3-onboard/dcent'

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
const dappId = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()
const coinbase = coinbaseModule()
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

const dcent = dcentModule()

const magic = magicModule({
  // Example api key, may need to be updated when max hits reached
  // Get one to test with for free from https://magic.link/
  apiKey: 'pk_live_02207D744E81C2BA',
  userEmail: localStorage.getItem('magicUserEmail')
})

const web3auth = web3authModule({
  clientId:
    'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
})

const web3Onboard = init({
  wallets: [
    injected,
    coinbase,
    ledger,
    trezor,
    walletConnect,
    keepkey,
    web3auth,
    magic,
    portis,
    torus,
    dcent
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
  },
  apiKey: 'xxx387fb-bxx1-4xxc-a0x3-9d37e426xxxx'
  notify: {
    enabled: true,
    transactionHandler: transaction => {
      console.log({ transaction })
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
  apiKey: dappId,
  notify: {
    enabled: true,
    transactionHandler: transaction => {
      console.log({ transaction })
      if (transaction.eventCode === 'txPool') {
        return {
          // autoDismiss set to `0` will persist the notification until the user excuses it
          autoDismiss: 0, 
          // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}">here</a> for more info.`,
          // or you could use onClick for when someone clicks on the notification itself
          onClick: () =>
            window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  }
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

function App() {
  const [{ wallet, connecting }, connect, disconnect, updateBalances, setWalletModules] =
    useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const [notifications, customNotification, updateNotify] = useNotifications()
  const connectedWallets = useWallets()
  const updateAccountCenter = useAccountCenter()
  const updateLocale = useSetLocale()

  let provider

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
  }, [wallet]

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
          <button onClick={() => disconnect(wallet)}>Disconnect Wallet</button>
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
  (wallet: DisconnectOptions) => Promise<void>,
  (addresses?: string[]) => Promise<void>,
  (wallets: WalletInit[]) => void
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
  updateBalances, // function to be called with an option array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
  setWalletModules // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
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

## `useNotifications`

This hook allows the dev to access all notifications if enabled, send custom notifications and update notify <enable/disable & update transactionHandler function>
**note** requires an API key be added to the initialization, enabled by default if API key exists

```typescript
import { useNotifications } from '@web3-onboard/react'

type UseNotifications = (): [
  Notification[],
  (updatedNotification: CustomNotification) => {
    dismiss: () => void
    update: UpdateNotification
  },
  (update: Partial<NotifyOptions>) => void
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
type NotifyOptions = {
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

const [
  notifications, // the list of all notifications that update when notifications are added, updated or removed
  customNotification, // a function that takes a customNotification object and allows custom notifications to be shown to the user, returns an update and dismiss callback
  updateNotify // a function that takes a NotifyOptions object to allow updating of the properties
] = useNotifications()

// View notifications as they come in if you would like to handle them independent of the notification display
useEffect(() => {
  console.log(notifications)
}, [notifications])

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
