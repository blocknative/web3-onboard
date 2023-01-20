# @web3-onboard/injected-wallets

## Quickstart

To allow all injected wallets that are supported, don't pass in any options:

```javascript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule()

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    description: 'My app using Onboard'
  }
})

const connectedWallets = await onboard.connectWallet()

console.log(connectedWallets)
```

## Filtering Wallets

Injected wallets that you do not want to support can be filtered based on the `Platform` the user is on. For example you may not want to support the 'Detected Wallet' that is detected automatically and filter it via all platforms by passing `false`:

```javascript
import Onboard from '@web3-onboard/core'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule({
  filter: {
    [ProviderLabel.Detected]: false
  }
})

const onboard = Onboard({
  wallets: [injected]
  //... other options
})
```

Or you may want to only filter the 'Detected Wallet' on a select few platforms:

```javascript
import Onboard from '@web3-onboard/core'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule({
  filter: {
    // allow only on non android mobile
    [ProviderLabel.Detected]: ['Android', 'desktop']
  }
})

const onboard = Onboard({
  wallets: [injected]
  //... other options
})
```

The following platforms can be used to filter wallets:

```typescript
type Platform =
  | 'Windows Phone'
  | 'Windows'
  | 'macOS'
  | 'iOS'
  | 'Android'
  | 'Linux'
  | 'Chrome OS'
  | 'Android Browser'
  | 'Chrome'
  | 'Chromium'
  | 'Firefox'
  | 'Microsoft Edge'
  | 'Opera'
  | 'Safari'
  | 'desktop'
  | 'mobile'
  | 'tablet'
```

## Adding Custom Injected Wallets

If there is an injected wallet that you would like to support in your app, but is not yet included in this repo, you can add a custom wallet module in the `custom` field:

```typescript
const equal = {
  // The label that will be displayed in the wallet selection modal
  label: 'Equal',
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: 'ethereum',
  // A function that returns a bool indicating whether or not the provider is
  // of a certain identity. In this case, a unique property on the provider
  // is used to identify the provider.
  // In most cases this is in the format: `is<provider-name>`.
  // You may also include custom logic here if checking for the property
  // isn't sufficient.
  checkProviderIdentity: ({ provider }) =>
    !!provider && !!provider[ProviderIdentityFlag.MetaMask],

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('<PATH_TO_ICON>')).default,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: () => ({
    provider: window.ethereum
  }),
  // A list of platforms that this wallet supports
  platforms: ['desktop']
}

const injected = injectedModule({
  custom: [equal]
})

const onboard = Onboard({
  wallets: [injected]
  //... other options
})
```

## Display Unavailable Wallets

You may want to display injected wallets that are not currently available to the user and you can use the `displayUnavailable` option to do that:

```javascript
const injected = injectedModule({
  displayUnavailable: true
})
```

This will render every injected wallet as regardless of whether it has been detected in the window, happy days.
Then the issue of the order of wallets displayed becomes apparent when you have 21 injected wallets at the top of the wallets list. To solve this, all injected wallets are sorted alphabetically by default and there is an additional `sort` parameter which receives the final list of wallets and then returns the list to be rendered. This allows for example setting MetaMask and Coinbase first and then just the rest alphabetically:

```javascript
const injected = injectedModule({
  // display all wallets even if they are unavailable
  displayUnavailable: true,
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: wallets => {
    const metaMask = wallets.find(
      ({ label }) => label === ProviderLabel.MetaMask
    )
    const coinbase = wallets.find(
      ({ label }) => label === ProviderLabel.Coinbase
    )

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) =>
            label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter(wallet => wallet)
    )
  }
})
```

You may want to display all wallets, but filter out specific wallets based on their availability. For example I may want to display all unavailable wallets except when Binance and Bitski wallet is unavailable, then don't show them, but if they are available, then do show them. To do this, the filters value has been extended to have a new value: `'unavailable'`, as in; remove this wallet if it is unavailable, even though `displayUnavailable` wallets is set:

```javascript
const injected = injectedModule({
  // display all wallets even if they are unavailable
  displayUnavailable: true,
  // but only show Binance and Bitski wallet if they are available
  filter: {
    [ProviderLabel.Binance]: 'unavailable',
    [ProviderLabel.Bitski]: 'unavailable'
  },
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: wallets => {
    const metaMask = wallets.find(
      ({ label }) => label === ProviderLabel.MetaMask
    )
    const coinbase = wallets.find(
      ({ label }) => label === ProviderLabel.Coinbase
    )

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) =>
            label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter(wallet => wallet)
    )
  }
})
```

If a wallet is selected, but is not available the default error message is: `Please install or enable ${walletName} to continue`. You may want to customise that message, so there is the `walletUnavailableMessage` parameter which is a function that takes the wallet object that is unavailable and returns a string which is the message to display:

```javascript
const injected = injectedModule({
  custom: [
    // include custom (not natively supported) injected wallet modules here
  ],
  // display all wallets even if they are unavailable
  displayUnavailable: true,
  // but only show Binance and Bitski wallet if they are available
  filter: {
    [ProviderLabel.Binance]: 'unavailable',
    [ProviderLabel.Bitski]: 'unavailable'
  },
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: wallets => {
    const metaMask = wallets.find(
      ({ label }) => label === ProviderLabel.MetaMask
    )
    const coinbase = wallets.find(
      ({ label }) => label === ProviderLabel.Coinbase
    )

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) =>
            label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter(wallet => wallet)
    )
  },
  walletUnavailableMessage: wallet => `Oops ${wallet.label} is unavailable!`
})
```
