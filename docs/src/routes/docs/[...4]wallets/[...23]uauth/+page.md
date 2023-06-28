---
title: UAuth
---

# {$frontmatter.title}

Wallet module for connecting Unstoppable Domains to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/uauth
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/uauth
```

  </TabPanel>
</Tabs>

## Options

Follow the [Login Client Congifuration Docs](https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-client-configuration/) on the Unstoppable Domains website to get setup with your clientID and redirectUri.
**Note:** The Redirection URI value(s) in the client configuration MUST exactly match the redirect_uri parameter value used in `UauthInitOptions`. More specifics can be found in the [Rules for Redirect URIs Docs](https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-client-configuration/#rules-for-redirect-uris).

```typescript
type UauthInitOptions = {
  /**
   * Required and will throw an error if not included: links dapp to Unstoppable Domains for customization
   */
  clientID: string
  /**
   * Required and will throw an error if not included: used for pop-up and callback redirection
   */
  redirectUri: string
  /**
   * Optional string: Default = 'openid wallet'
   */
  scope?: string
  /**
   * Optional boolean: If true, redirects to your callback page
   */
  shouldLoginWithRedirect?: boolean
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  walletConnectProjectId: string
  /**
   * Defaults to version: 2
   */
  version?: 2
  /**
   * List of Required Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to [1] - Ethereum
   */
  requiredChains?: number[] | undefined
  /**
   * List of Optional Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to the chains provided within the web3-onboard init chain property
   */
  optionalChains?: number[] | undefined
  /**
   * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  additionalOptionalMethods?: string[] | undefined
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import uauthModule from '@web3-onboard/uauth'

// initialize the module with options
const uauth = uauthModule({
  clientID: 'a25c3a65-a1f2-46cc-a515-a46fe7acb78c',
  walletConnectProjectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
  redirectUri: 'http://localhost:8080/',
  scope:
    'openid wallet email:optional humanity_check:optional profile:optional social:optional'
})

// can also initialize with basic options...
// const uauth = uauthModule({
//  clientID: "YOUR_CLIENT_ID",
//  redirectUri: "YOUR_REDIRECT_URI",
//  walletConnectProjectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
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
wallets$.subscribe((wallet) => {
  const unstoppableUser = wallet.find((provider) => provider.label === 'Unstoppable')
  if (unstoppableUser) {
    // This will allow insight into the approved user details
    console.log(unstoppableUser.instance.user)
  }
})
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
