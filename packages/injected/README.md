# @bn-onboard/injected-wallets

### Usage

Example Usage:

```typescript
import { ProviderLabel } from '@bn-onboard/types'

const wallets: InjectedWalletModule[] = [
  {
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
    platforms: ['all']
  }
]

const exclusions: WalletExclusions = {
  // Exclude Binance Smart Wallet on mobile
  [ProviderLabel.Binance]: ['mobile']
}

// Call the injected wallet method which will return a method that takes WalletHelpers
// and returns a detected injected wallet or a list if more than one wallet are detected.
// This is then passed to the O2 options.
const injectedWallet = injected({
  wallets,
  exclude
})

const options = {
  wallets: [injectedWallet]
}

const onboard = O2(options)
```

Types:

```typescript
export interface InjectedWalletOptions {
  // A list of injected wallets to include that are not included by default here: ./packages/injected/
  wallets?: InjectedWalletModule[]
  // A mapping of a provider label to a list of excluded platforms
  // or a boolean indicating if it should be included or not.
  // By default all wallets listed in ./packages/injected/ are included add them to here to remove them.
  exclude?: WalletExclusions
}

export type WalletExclusions = {
  // A provider label mapped to a list of excluded platforms or a boolean indicating if it should be included.
  [key in ProviderLabel | string]?: Platform[] | boolean
}

export interface InjectedWalletModule extends WalletModule {
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: InjectedNameSpace
  // A unique property on the provider that is used to identify the provider
  // In most cases this is in the format: `is<provider-name>`.
  // Example: window.ethereum.isEQLWallet
  providerIdentityFlag: ProviderIdentityFlag | string
  // A list of platforms that this wallet supports
  platforms: Platform[]
}
```
