# @web3-onboard/uauth

## Wallet module for connecting Unstoppable Domains to web3-onboard

### Install

`npm i @web3-onboard/uauth`

## Options

Follow the [Login Client Congifuration Docs](https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-client-configuration/) on the Unstoppable Domains website to get setup with your clientID and redirectUri.

```typescript
interface uauthOptions {
  clientID: string
  redirectUri: string
  scope?: string // openid and wallet are required and are the default scopes
  shouldLoginWithRedirect?: boolean
  bridge?: string // default = 'https://bridge.walletconnect.org'
  qrcodeModalOptions?: {
    mobileLinks: string[] // set the order and list of mobile linking wallets
  }
  connectFirstChainId?: boolean // if true, connects to the first network chain provided
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import uauthModule from '@web3-onboard/uauth'

// initialize the module with options
const uauth = uauthModule({
  clientID: "YOUR_CLIENT_ID",
  redirectUri: "YOUR_REDIRECT_URI",
  scope?: "YOUR_SCOPES",// openid and wallet are required and are the default scopes
  bridge?: 'YOUR_CUSTOM_BRIDGE_SERVER',
  qrcodeModalOptions?: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  },
  connectFirstChainId?: true
})

// can also initialize with basic options...
// const uauth = uauthModule({
//  clientID: "YOUR_CLIENT_ID",
//  redirectUri: "YOUR_REDIRECT_URI"
// })


const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    uauth
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
