# @web3-onboard/metamask

## Wallet module for connecting MetaMask Connect EVM to web3-onboard

The MetaMask Web3-Onboard module provides a reliable, secure, and seamless connection from your dapp to the MetaMask browser extension and MetaMask Mobile.

This module uses [MetaMask Connect EVM](https://docs.metamask.io/metamask-connect/evm/) (`@metamask/connect-evm`) under the hood — the successor to the legacy `@metamask/sdk`. The integration surface for `@web3-onboard/metamask` is unchanged: the legacy options below are mapped to their MetaMask Connect EVM equivalents internally so existing dapps keep working without code changes.

![MetaMask SDK ConnectionFlow](https://github.com/blocknative/web3-onboard/blob/develop/assets/metaMaskSDK-connect.gif?raw=true 'MetaMask SDK ConnectionFlow')

### Install

`npm i @web3-onboard/metamask`

### If using this package with the `@web3-onboard/injected-wallets` module

_When utilizing this package alongside the `@web3-onboard/injected-wallets` module, ensure to list this package prior to the initialized injected-wallets module within the wallets list of the Web3-Onboard init._
_This order prioritizes the MetaMask Connect EVM client when a MetaMask browser wallet is detected, allowing it to take precedence._

## Options

```typescript
// All fields are optional. Legacy MetaMaskSDK option names are accepted for
// backwards compatibility and mapped to MetaMask Connect EVM internally.
interface MetaMaskSDKOptions {
  dappMetadata?: {
    url?: string
    name?: string
    iconUrl?: string
    base64Icon?: string
  }
  /**
   * If MetaMask browser extension is detected, prefer it over the mobile flow.
   * Mapped to `ui.preferExtension`.
   */
  extensionOnly?: boolean
  /** Mapped to `ui.headless`. */
  headless?: boolean
  /** Used to populate `api.supportedNetworks` via `getInfuraRpcUrls`. */
  infuraAPIKey?: string
  /** Merged into `api.supportedNetworks`. */
  readonlyRPCMap?: Record<string, string>
  /** Mapped to `mobile.preferredOpenLink`. */
  openDeeplink?: (deeplink: string) => void
  /** Mapped to `mobile.useDeeplink`. */
  useDeeplink?: boolean
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import metamaskSDK from '@web3-onboard/metamask'

// initialize the module with options
const metamaskSDKWallet = metamaskSDK({
  options: {
    extensionOnly: false,
    dappMetadata: {
      name: 'Demo Web3Onboard'
    }
  }
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    metamaskSDKWallet,
    //... other wallets
    // Make sure to pass in before or above the injected-wallets module
    injectedWalletModule
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
