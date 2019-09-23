# Onboard

Client library to onboard users to web3 apps

## Build

- Clone the repo
- Run `npm install` to install dependencies
- `npm run build`

### Initialize

```javascript
const onboard = Onboard({
  dappId: String, // Your api key - Head to https://www.blocknative.com/ to get a free key
  networkId: Number, // The id of the network your dapp runs on
  subscriptions: {
    address: Function, // called when address has changed
    network: Function, // called when network has changed
    balance: Function, // called when balance has changed
    provider: Function // called when provider has changed
  },
  modules: {
    selectWallet: {
      heading: String, // The heading for the select wallet modal
      description: String, // Description for the select wallet modal
      wallets: {
        mobile: Array, // Array of wallet modules for mobile devices
        desktop: Array // Array of wallet modules for desktop devices
      }
    },
    prepareWallet: Array // Array of onboarding modules
  }
})
```

#### Quick Start with Default Modules

```javascript
import Onboard from 'bn-onboard'
import { initModules as initWallets } from 'bn-wallet-modules'
import { initModules as initOnboarding } from 'bn-onboarding-modules'

const onboard = Onboard({
  dappId: 'Your apiKey here',
  networkId: 1,
  subscriptions: {
    address: address => console.log('address has changed:', address)
    network: network => console.log('network has changed:', network)
    balance: balance => console.log('balance has changed:', balance)
    provider: provider => console.log('provider has changed:', provider)
  },
  modules: {
    selectWallet: initWallets({
      fortmaticInit: { apiKey: "Your fortmatic key here" },
      portisInit: { apiKey: "Your portis key here" },
      networkId: 4
    }),
    prepareWallet: initOnboarding({
      networkId: 4,
      minimumBalance: "200000000000000000"
    })
  }
})
```

### Select Wallet

To get a user to select a wallet to use with your dapp call the `selectWallet` function:

```javascript
const walletSelected = await onboard.selectWallet()
// resolves with true if user selected a wallet and provider is good to go
// resolves with false if user exited from select wallet modal
```

This function will show a modal that displays buttons for all of the wallets that you initialized onboard with. It will guide the user through the process of connecting to the wallet that they select. Once the process is successful the function will resolve with `true`. This means that the `provider` subscription will have been called with the provider of the selected wallet and you can go ahead and instantiate contracts.

### Prepare Wallet

Once a wallet is selected, you will want to make sure that the user's wallet is prepared and ready to transact by calling the `prepareWallet` function:

```javascript
const readyToTransact = await onboard.prepareWallet()
// resolves with true if user is ready to transact
// resolves with false if user exited before completing all prepare wallet modules
```

This function will run through the onboarding modules sequentially, making sure the user has passed the condition contained in each module and eventually resolves with `true` if the user completed the sequence. This means that the user is ready to transact. This function is useful to call before every transaction to make sure that nothing has changed since the last time it was called.
