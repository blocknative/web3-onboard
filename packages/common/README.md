# Onboard V2 Core Package

## Getting Started

```javascript
import Onboard from '@bn-onboard/core'
import InjectedWallets from '@bn-onboard/injected-wallets'

const injectedWallet = InjectedWallets()

const onboard = Onboard({
  // wallet modules that you would like the user to be able to select from
  wallets: [injectedWallet],
  // additional metadata for app information
  appMetadata: {
    name: '<APP_NAME>',
    icon: '<APP_SVG_ICON_STRING>',
    description: '<APP_DESCRIPTION'
  },
  // a mapping of locales to i18n options (https://github.com/blocknative/onboard/blob/feature/v2/packages/core/src/types.ts#L134)
  // can be used to replace default text or add multiple language support
  i18n: {
    es: {
      connect: {
        selectingWallet: {
          sidebar: {
            heading: 'Comenzar'
          }
        }
      }
    }
  }
})

// subscribe to all state updates and log
const state$ = onboard.state.select()
state$.subscribe(console.log)

// or you can subscribe to a slice of state for when it updates
const wallets$ = onboard.state.select('wallets')
wallets$.subscribe(console.log)

// Add networks that are valid for your app
onboard.addChains([
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
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
])

// connect a user wallet
onboard.connectWallet()

// set chain to mainnet
onboard.setChain('0x1')
```
