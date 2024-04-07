---
title: Injected Wallets
---

# {$frontmatter.title}

This module lets web3-onboard automatically detect Browser Injected Wallets such as Metamask or Coinbase Wallet. We recommend you install this module to get the most out of your w3o implementation. This module supports [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) and [recognizes many injected wallets natively](#injected-wallets-supported-natively) as well as supports all [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) compatible wallets.

Note: Make sure to install the core module before installing other modules to w3o.

### Support all EIP-6963 Wallets out of the box

Web3-Onboard supports all [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) compatible wallets out of the box and will automatically recognizes any wallet which has integrated 6963 support.

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/injected-wallets
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/injected-wallets
```

  </TabPanel>
</Tabs>

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
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
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
  // In most cases this is in the format: is<provider-name>.
  // You may also include custom logic here if checking for the property
  // isn't sufficient.
  checkProviderIdentity: ({ provider }) => !!provider && !!provider[ProviderIdentityFlag.MetaMask],

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('<PATH_TO_ICON>')).default,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: () => ({
    provider: window.ethereum
  }),
  // A list of platforms that this wallet supports
  platforms: ['desktop'],
  /**
   * A Url to link users to a download page for the wallet
   * to be shown if not installed or available on the browser
   */
  externalUrl: 'http://www.CoolEqualWalletDownload.com'
}

const injected = injectedModule({
  custom: [equal]
})

const onboard = Onboard({
  wallets: [injected]
  //... other options
})
```

### This module supports any injected wallet that has implemented support for [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963)

This can be disabled by passing in `disable6963Support` as true within the injected module init object.

```ts
const injected = injectedModule({ disable6963Support: true })

const onboard = Onboard({
  wallets: [injected],
  ...
})
```

## Display Unavailable Wallets

You may want to display injected wallets that are not currently available to the user and you can use the `displayUnavailable` option to do that:

```javascript
const injected = injectedModule({
  // display all unavailable injected wallets
  displayUnavailable: true,
  ||
  // display specific unavailable wallets
  displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust]
})
```

This can be set to an array top specify which unavailable injected wallets to show or set to true to display all unavailable injected wallets regardless of whether it has been detected in the window, happy days.
Then the issue of the order of wallets displayed becomes apparent when you have 21 injected wallets at the top of the wallets list. To solve this, all injected wallets are sorted **alphabetically** by default and there is an additional `sort` parameter which receives the final list of wallets and then returns the list to be rendered. This allows for example setting MetaMask and Coinbase first and then just the rest alphabetically:

```javascript
const injected = injectedModule({
  // display specific injected wallets even if they are unavailable
  // can also be set to `true` to display all unavailable injected wallets
  displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust],
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: (wallets) => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)
    const coinbase = wallets.find(({ label }) => label === ProviderLabel.Coinbase)

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) => label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter((wallet) => wallet)
    )
  }
})
```

You may want to display all unavailable injected wallets, but filter out specific wallets based on their availability. For example I may want to display all unavailable wallets except when Binance and Bitski wallet is unavailable, then don't show them, but if they are available, then do show them. To do this, the filters value has been extended to have a new value: `'unavailable'`, as in; remove this wallet if it is unavailable, even though `displayUnavailable` wallets is set:

```javascript
const injected = injectedModule({
  // display specific injected wallets even if they are unavailable
  // can also be set to `true` to display all unavailable injected wallets
  displayUnavailable: true,
  // but only show Binance and Bitski wallet if they are available
  filter: {
    [ProviderLabel.Binance]: 'unavailable',
    [ProviderLabel.Bitski]: 'unavailable'
  },
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: (wallets) => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)
    const coinbase = wallets.find(({ label }) => label === ProviderLabel.Coinbase)

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) => label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter((wallet) => wallet)
    )
  }
})
```

If a wallet is selected, but is not available the default error message is: `Oops ${wallet.label} is unavailable! Please <a href="${wallet.externalUrl}" target="_blank">install</a>` if a download link is available for that wallet. If there isn't a download link for that wallet the default is: `Please install or enable ${walletName} to continue`. You may want to customize that message, so there is the `walletUnavailableMessage` parameter which is a function that takes the wallet object that is unavailable and returns a string which is the message to display:

```javascript
const injected = injectedModule({
  custom: [
    // include custom (not natively supported) injected wallet modules here
  ],
  // display specific injected wallets even if they are unavailable
  // can also be set to `true` to display all unavailable injected wallets
  displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust],
  // but only show Binance and Bitski wallet if they are available
  filter: {
    [ProviderLabel.Binance]: 'unavailable',
    [ProviderLabel.Bitski]: 'unavailable'
  },
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  sort: (wallets) => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)
    const coinbase = wallets.find(({ label }) => label === ProviderLabel.Coinbase)

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) => label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .filter((wallet) => wallet)
    )
  },
  walletUnavailableMessage: (wallet) =>
    wallet.externalUrl
      ? `Oops ${wallet.label} is unavailable! Please <a href="${wallet.externalUrl}" target="_blank">install</a>`
      : `Oops ${wallet.label} is unavailable!`
})
```

### Injected Wallets Supported Natively

- Metamask - _Desktop & Mobile_
- Binance - _Desktop_
- Coinbase - _Desktop & Mobile_
- Phantom - _Desktop & Mobile_
- Trust - _Desktop & Mobile_
- SafePal - _Desktop & Mobile_
- Zerion - _Desktop & Mobile_
- OKX Wallet - _Desktop & Mobile_
- Taho (Previously named Tally Ho wallet) - _Desktop_
- Opera - _Desktop & Mobile_
- Status - _Mobile_
- Alphawallet - _Mobile_
- Atoken - _Mobile_
- Bitpie - _Mobile_
- Blockwallet - _Desktop_
- Brave - _Desktop & Mobile_
- D'Cent - _Mobile_
- Frame - _Desktop_
- Huobiwallet - _Mobile_
- Hyperpay - _Mobile_
- IMtoken - _Mobile_
- Liquality - _Desktop_
- Meetone - _Mobile_
- Mykey - _Mobile_
- Ownbit - _Mobile_
- xDefi - _Desktop & Mobile_
- Tokenpocket - _Desktop & Mobile_
- TP - _Mobile_
- 1inch - _Mobile_
- Tokenary - _Mobile_
- Rabby - _Desktop & Mobile_
- MathWallet - _Desktop & Mobile_
- Bitkeep - _Desktop & Mobile_
- BitGet Wallet - _Desktop & Mobile_
- Sequence - _Desktop & Mobile_
- Core - _Desktop_
- Bitski - _Desktop & Mobile_
- Enkrypt - _Desktop & Mobile_
- Zeal - _Desktop_
- Exodus - _Desktop & Mobile_
- Frontier - _Desktop & Mobile_
- Rainbow - _Desktop & Mobile_
- DeFiWallet - _Desktop & Mobile_
- ApexWallet - _Desktop_
- BifrostWallet - _Desktop & Mobile_
- Safeheron - _Desktop_
- Talisman - _Desktop_
- OneKey - _Desktop & Mobile_
- Fordefi - _Desktop_
- Ronin Wallet - _Desktop & Mobile_
- Coin98 Wallet - _Desktop & Mobile_
- SubWallet - _Desktop & Mobile_
- Kayros - _Desktop_
- Lif3Wallet - _Mobile_
- StableWallet - _Mobile_

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
