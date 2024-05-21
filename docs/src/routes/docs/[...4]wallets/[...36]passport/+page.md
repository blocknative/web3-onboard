---
title: Passport Protocol
---

# {$frontmatter.title}

Wallet module for connecting Passport Protocol to Web3 Onboard.

See [Passport Protocol Docs](https://docs.0xpass.io/) for details.

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/passport @0xpass/webauthn-signer
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/core @web3-onboard/passport @0xpass/webauthn-signer
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import passportModule, { Network } from '@web3-onboard/passport'
import { WebauthnSigner } from '@0xpass/webauthn-signer'

// Firstly you set up your passkey / webauthn signer
// The rpId and rpName are the same as the ones you set up in your passport application scope. They follow the webauthn standard, of the following values
// rpId: the domain of where the passkey is generated
// rpName: human readable name for the domain
// You can read more on this here https://docs.0xpass.io/authentication/configuring-your-scope#scope-configuration
const webauthnSigner = new WebauthnSigner({
  rpId: 'localhost',
  rpName: '0xPass'
})

const passport = passportModule({
  network: Network.TESTNET,
  scopeId: 'd8ae4424-c1f6-42b0-ab5e-2688bdaa0ff2', // replace this with your scope id
  signer: webauthnSigner,
  fallbackProvider: 'https://eth-mainnet.g.alchemy.com/v2/xxx' // insert your alchemy / infura url here
  // encryptionSecret: '' // encryption secret is optional, but advised to securely store values in browser storage
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    passport
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
