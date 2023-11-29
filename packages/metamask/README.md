# @web3-onboard/metamask

## Wallet module for connecting MetaMask Wallet SDK to web3-onboard
The MetaMask Web3-Onboard module provides a reliable, secure, and seamless connection from your dapp to the MetaMask browser extension and MetaMask Mobile.
See [MetaMask SDK Developer Docs](https://docs.metamask.io/wallet/how-to/connect/set-up-sdk/)

![MetaMask SDK ConnectionFlow](https://github.com/blocknative/web3-onboard/blob/develop/assets/metaMaskSDK-connect.gif?raw=true 'MetaMask SDK ConnectionFlow')

### Install

`npm i @web3-onboard/metamask`

### If using this package with the `@web3-onboard/injected-wallets` module
_When utilizing this package alongside the `@web3-onboard/injected-wallets` module, ensure to list this package prior to the initialized injected-wallets module within the wallets list of the Web3-Onboard init._ 
_This order prioritizes the SDK when a MetaMask browser wallet is detected, allowing the SDK to take precedence._

## Options

```typescript
// For a complete list of options check https://docs.metamask.io/wallet/how-to/connect/set-up-sdk/
interface MetaMaskSDKOptions {
  dappMetadata: {
    url?: string;
    name?: string;
    base64Icon?: string;
  },
  /**
   * If MetaMask browser extension is detected, directly use it without prompting the user.
   */
  extensionOnly?: boolean;
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import metamaskSDK from '@web3-onboard/metamask'

// initialize the module with options
const metamaskSDKWallet = metamaskSDK({options: {
  extensionOnly: false,
  dappMetadata: {
    name: 'Demo Web3Onboard'
  }
}})

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
