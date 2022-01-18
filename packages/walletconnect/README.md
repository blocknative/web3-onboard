# @bn-onboard/walletconnect

## Wallet module for connecting Ledger hardware wallets to Onboard V2

### Install

`npm i @bn-onboard/walletconnect`

## Options

```typescript
type WalletConnectOptions = {
  bridge?: string // default = 'https://bridge.walletconnect.org'
  qrcodeModalOptions?: {
    mobileLinks: string[] // set the order and list of mobile linking wallets
  }
}
```

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import walletConnectModule from '@bn-onboard/walletconnect'

// initialize the module with options
const walletConnect = walletConnectModule({
  bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
})

// can also initialize with no options...
// const walletConnect = walletConnectModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    walletConnect
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
