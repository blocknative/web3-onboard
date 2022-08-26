# @web3-onboard/injected-wallets

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/injected
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/injected
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
