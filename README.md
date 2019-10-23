# Onboard

JavaScript library to easily onboard users to ethereum apps by enabling wallet selection, connection, readiness and real time state updates.

## Install

`npm install bnc-onboard`

## Quick Start with Default Modules

```javascript
import Onboard from "bn-onboard"

// initialize onboard
const onboard = Onboard.init({
  dappId: "Your apiKey here",
  networkId: 1,
  subscriptions: {
    address: address => console.log("user address has changed:", address),
    network: network => console.log("user network has changed:", network),
    balance: balance => console.log("user balance has changed:", balance),
    wallet: wallet =>
      console.log(
        "a new wallet has been selected by user",
        wallet.provider,
        wallet.name
      )
  },
  modules: {
    // default wallets that are included: MetaMask, Dapper, Coinbase, Trust, WalletConnect
    walletSelect: Onboard.modules.select.defaults({
      // if you want squarelink as a wallet option
      squarelinkInit: { apiKey: "Your squarelink key here" },
      // if you want fortmatic as a wallet option
      fortmaticInit: { apiKey: "Your fortmatic key here" },
      // if you want portis as a wallet option
      portisInit: { apiKey: "Your portis key here" },
      networkId: 4
    }),
    // default ready steps are: connect, network, balance
    walletReady: Onboard.modules.ready.defaults({
      networkId: 4,
      minimumBalance: "200000000000000000"
    })
  }
})

// Get user to select a wallet
await onboard.walletSelect()

// Get users' wallet ready to transact
await onboard.walletReady()
```

## Initialization

```javascript
const options = {
  dappId: "Your api key here"
  networkId: 4,
  subscriptions: {
    address: val => console.log("address", val)
    network: val => console.log("network", val)
    balance: val => console.log("balance", val)
    wallet: val => console.log("wallet", val)
  },
  modules: {
    walletSelect: {
      heading: "Select a Wallet",
      description: "Please select a wallet that you would like to use with this Dapp",
      wallets: {
        mobile: [mobileWalletModuleOne, mobileWalletModuleTwo, ...],
        desktop: [desktopWalletModuleOne, desktopWalletModuleTwo, desktopWalletModuleThree, ...]
      }
    },
    walletReady: [readyModuleStepOne, readyModuleStepTwo, readyModuleStepThree, ...]
  }
}

const onboard = Onboard.init(options)
```

### Options

```javascript
const options = {
  dappId: String, // see below
  networkId: Number, // see below
  subscriptions: {
    address: Function, // Called with the current account address of the user [String]
    network: Function, // Called with the current network id the users' wallet is connected to [Number]
    balance: Function, // Called with the current balance in `wei` of the users' current account address [String]
    wallet: Function // Called with the users' current selected wallet [Object]: {provider: Object, name: String, instance: Object (if a sdk wallet)}
  },
  modules: {
    walletSelect: {
      heading: String, // The heading for the wallet select modal
      description: String, // The description for the wallet select modal
      wallets: {
        mobile: Array, // array of mobile wallet modules
        desktop: Array // array of desktop wallet modules
      }
    },
    walletReady: Array // array of wallet readiness modules
  }
}
```

#### `dappId` - [REQUIRED]

Your unique apiKey that identifies your application. You can generate a dappId by visiting the [Blocknative account page](https://account.blocknative.com/) and create a free account.

#### `networkId` - [REQUIRED]

The Ethereum network id that your application runs on. The following values are valid:

- `1` Main Network
- `3` Ropsten Test Network
- `4` Rinkeby Test Network
- `5` Goerli Test Network
- `42` Kovan Test Network

## API

### `walletSelect`

When you are ready to start onboarding a user, call the `walletSelect` function to prompt them to display the wallet select UI:

```javascript
const walletSelected = await onboard.walletSelect()
// returns a Promise that:
// resolves with true if user selected a wallet and provider is good to go
// resolves with false if user exited from wallet select modal
```

This function will show a modal that displays buttons for all of the wallets that you initialized onboard with. It will guide the user through the process of connecting to the wallet that they select. Once the process is successful the function will resolve with `true`. This means that the `provider` subscription will have been called with the provider of the selected wallet and you can go ahead and instantiate your web3 library with the provider and also instantiate your contracts.

### `walletReady`

Once a wallet is selected, you will want to make sure that the user's wallet is prepared and ready to transact by calling the `walletReady` function:

```javascript
const readyToTransact = await onboard.walletReady()
// returns a Promise that:
// resolves with true if user is ready to transact
// resolves with false if user exited before completing all wallet readiness modules
```

This function will run through the onboarding modules sequentially, making sure the user has passed the condition contained in each module and eventually resolves with `true` if the user completed the sequence. This means that the user is ready to transact. This function is useful to call before every transaction to make sure that nothing has changed since the last time it was called.

### `config`

You can update configuration parameters by passing a config object in to the `config` function:

```javascript
onboard.config({ darkMode: true })
```

Available parameters that you can edit are:

```javascript
{
  darkMode: Boolean, // (default: false)
}
```

## Modules

### Wallet Select Modules

The wallet select modules are functions that return a wallet object. The following modules are currently available:

- `defaults`: A meta module that quickly initializes all of the default modules into the correct format (requires initialization object)

#### Desktop Wallets

- `metamask`
- `dapper`
- `walletConnect` (requires initialization)
- `portis` (requires initialization)
- `squarelink` (requires initialization)
- `fortmatic` (requires initialization)

#### Mobile Wallets

- `trust`
- `coinbase`
- `walletConnect` (requires initialization)
- `portis` (requires initialization)
- `squarelink` (requires initialization)
- `fortmatic` (requires initialization)

`defaults` Initialization:

```javascript
modules.select.defaults({
  heading: String, // Override the default heading [optional]
  description: String, // Override the default description [optional]
  networkId: Number, // Required if you want the Portis, Squarelink, or Fortmatic modules to be included
  squarelinkInit: Object, // initialization object for Squarelink module (see below)
  portisInit: Object, // initialization object for Portis module (see below)
  fortmaticInit: Object // initialization object for Fortmatic module (see below)
})
```

`portis` Initialization:

```javascript
portis({
  apiKey: String, // your Portis api key
  networkId: Number //  the networkId of network you want to connect to
})
```

`squarelink` Initialization:

```javascript
squarelink({
  apiKey: String, // your Squarelink api key
  networkId: Number //  the networkId of the network you want to connect to
})
```

`fortmatic` Initialization:

```javascript
fortmatic({
  apiKey: String, // your Fortmatic api key
  networkId: Number //  the networkId of the network you want to connect to
})
```

`walletConnect` Initialization:

```javascript
walletConnect({
  infuraKey: String
})
```

#### Example

```javascript
import Onboard from "bnc-onboard"

// PICK AND CHOOSE MODULES

const {
  portis,
  squarelink,
  dapper,
  metamask,
  fortmatic
} = Onboard.modules.select

const onboard = Onboard.init({
  // ...
  modules: {
    walletSelect: {
      heading: "Select a Wallet",
      description:
        "Please select the wallet that you would like to use with this Dapp",
      wallets: {
        desktop: [
          portis({ apiKey: "sdda-w2-ds3", networkId: 1 }),
          squarelink({ apiKey: "sdda-w2-ds3", networkId: 1 }),
          dapper(),
          metmask()
        ],
        mobile: [fortmatic({ apiKey: "sd-3d3-d", networkId: 1 })]
      }
    }
    //....
  }
})

// OR

// USE ALL OF THE DEFAULT MODULES

const onboard = Onboard.init({
  // ...
  modules: {
    walletSelect: Onboard.modules.select.defaults({
      portisInit: { apiKey: "Your portis key here" },
      networkId: 4
    })
    // ...
  }
})
```

### Wallet Ready Modules

The wallet ready modules are functions that return a function that will be called with the current user state. The module will return a modal object if that state is invalid or `undefined` if the state is valid. The following default modules are available:

- `defaults`: A meta module that quickly initializes all of the default modules into the correct format (requires initialization object)
- `connect`: Checks that the dapp has access to accounts and fires the connect function if the selected wallet has one
- `network`: Checks that the users' wallet is connected to the desired network (requires initialization argument)
- `balance`: Checks that the users' account has enough balance as defined when initialized (requires initialization argument)

`defaults` Initialization:

```javascript
modules.ready.defaults({
  networkId: Number, // The network id your dapp runs on
  minimumBalance: String // the minimum balance in wei required to interact with your dapp
})
```

`network` Initialization:

```javascript
network(Number) //  the network id your dapp runs on
```

`balance` Initialization:

```javascript
balance(String) //  the minimum balance in wei required to interact with your dapp
```

#### Example

```javascript
import Onboard from "bnc-onboard"

// PICK AND CHOOSE MODULES

const { connect, network, balance } = Onboard.modules.ready

const onboard = Onboard.init({
  // ...
  modules: {
    //....
    walletReady: [connect(), network(1), balance("400000000000")]
  }
})

// OR

// USE ALL OF THE DEFAULT MODULES

const onboard = Onboard.init({
  // ...
  modules: {
    // ...
    walletReady: Onboard.modules.ready.defaults({
      networkId: 1,
      minimumBalance: "400000000000"
    })
  }
})
```
