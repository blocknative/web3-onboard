# Onboard

Client library to onboard users to web3 apps

## Running Locally

- Clone the repo
- Run `yarn` to install dependencies
- Run `yarn dev` to start dev server
- Navigate to `localhost:5000` in your browser

## Build

- `yarn build`

## Using Onboard in a Dapp

### Importing with Script Tag

- Drag the built Onboard.js file in to your public folder
- Link to it via a script tag in the body of your HTML
- Library will be available on the window object: window.Onboard

### Importing with JS Bundler

- Drag the built bundle.js file in to your src folder
- Import it into the file you would like to use it in: `import Onboard from './Onboard`

### Initialize

```javascript
const onboard = Onboard({
  dappId: String,
  networkId: Number,
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
    prepareWallet: Array // Array of prepare wallet functions
  }
})
```

#### Initialize With Default Select and Prepare Wallet modules

```javascript
const onboard = Onboard.init({
  // ..... other init params
  modules: {
    selectWallet: window.SelectWallet.defaultModules({
      fortmatic: { apiKey: "pk_test_886ADCAB855632AA" },
      trezor: {
        email: "aaron@flexdapps.com",
        appUrl: "https://flexdapps.com",
        apiKey: "d5e29c9b9a9d4116a7348113f57770a8"
      },
      networkId: 4
    }),
    prepareWallet: window.PrepareWallet.defaultModules({
      networkId: 4,
      minimumBalance: "200000000000000000"
    })
  }
})
```

### Select Wallet

```javascript
const walletSelected = await onboard.selectWallet()
// resolves with true if user selected a wallet and provider is good to go
// resolves with false if user exited from select wallet modal
```

### Prepare Wallet

```javascript
const readyToTransact = await onboard.prepareWallet()
// resolves with true if user is ready to transact
// resolves with false if user exited before completing all prepare wallet modules
```
