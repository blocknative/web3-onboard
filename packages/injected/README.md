# @bn-onboard/injected-wallets

## Quickstart

To allow all injected wallets that are supported, don't pass in any options:

```javascript
import Onboard from '@bn-onboard/core'
import injectedModule from '@bn-onboard/injected-wallets'

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

## Excluding Wallets

Injected wallets that you do not want to support can be excluded based on the `Platform` the user is on. For example you may not want to support the 'Detected Wallet' that is detected automatically and exclude it via all platforms by passing `false`:

```javascript
import Onboard from '@bn-onboard/core'
import injectedModule from '@bn-onboard/injected-wallets'
import { ProviderLabel } from '@bn-onboard/types'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule({
  exclude: {
    [ProviderLabel.Detected]: false
  }
})

const onboard = Onboard({
  wallets: [injected]
  //... other options
})
```

Or you may want to only exclude the 'Detected Wallet' on a select few platforms:

```javascript
import Onboard from '@bn-onboard/core'
import injectedModule from '@bn-onboard/injected-wallets'
import { ProviderLabel } from '@bn-onboard/types'

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

The following platforms can be used to exclude wallets:

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

### Adding Custom Injected Wallets

If there is an injected wallet that you would like to support in your app, but is not yet included in this repo, you can add a custom wallet module in the `custom` field:

```typescript
const equal = {
  // The label that will be displayed in the wallet selection modal
  label: 'Equal',
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: 'ethereum',
  // A unique property on the provider that is used to identify the provider
  // In most cases this is in the format: `is<provider-name>`.
  // Example: window.ethereum.isEQLWallet
  providerIdentityFlag: 'isEQLWallet',
  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('./injected/icons/equal')).default,
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
