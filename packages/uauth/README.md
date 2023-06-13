# @web3-onboard/uauth

## Wallet module for connecting Unstoppable Domains to web3-onboard

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/uauth`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/uauth`

## Options

Follow the [Login Client Congifuration Docs](https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-client-configuration/) on the Unstoppable Domains website to get setup with your clientID and redirectUri.
**Note:** The Redirection URI value(s) in the client configuration MUST exactly match the redirect_uri parameter value used in `UauthInitOptions`. More specifics can be found in the [Rules for Redirect URIs Docs](https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-client-configuration/#rules-for-redirect-uris).

```typescript
type UauthInitOptions = {
  clientID: string // required and will throw an error if not included: links dapp to Unstoppable Domains for customization
  redirectUri: string // required and will throw an error if not included: used for pop-up and callback redirection
  scope?: string // default = 'openid wallet'
  shouldLoginWithRedirect?: boolean // if true, redirects to your callback page
  bridge?: string // default = 'https://derelay.rabby.io'
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
  clientID: 'YOUR_CLIENT_ID',
  redirectUri: 'YOUR_REDIRECT_URI',
  scope?: 'YOUR_SCOPES',
  shouldLoginWithRedirect?: false
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

### Accessing the UAuth configuration

When Unstoppable Domains is connected the UAuth user instance is exposed.
This can be used to get information related to the user scopes requested through the `UauthInitOptions`.

```typescript
const wallets$ = onboard.state.select('wallets').pipe(share())
wallets$.subscribe(wallet => {
  const unstoppableUser = wallet.find(
    provider => provider.label === 'Unstoppable'
  )
  if (unstoppableUser) console.log(unstoppableUser.instance.user)
})
```
