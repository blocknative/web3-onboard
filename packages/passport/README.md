# @web3-onboard/passport

## Wallet module for connecting Passport Wallets to web3-onboard

[Passport](https://0xpass.io/) is an MPC-based programmable, distributed, and non-custodial key management system, that allows users to generate wallets, scoped to their application, either via user Passkeys, our signer allows you to sign messages and transactions with a Passport Network account.

To learn more, check out the [Passpor Developer Docs](https://docs.0xpass.io/)

### Install

```bash
pnpm install @web3-onboard/passport @0xpass/webauthn-signer
# OR
yarn add @web3-onboard/passport @0xpass/webauthn-signer
# OR
npm install @web3-onboard/passport @0xpass/webauthn-signer
```

## Setup

To use Passport with web3-onboard, you'll first need to make sure you have configured a scope for your application. For this you can follow the guides below:

- Refer to the [Passport documentation](https://docs.0xpass.io/) for instructions on setting up your application with Passport.
- For a primer on setting up your scope you can check [here](https://docs.0xpass.io/authentication/configuring-your-scope).

```typescript
/**
 * Options for initializing the Passport environment.
 *
 * @property {string} iconPath - Path to the icon image.
 * @property {string} scopeId - Identifier for the scope.
 * @property {SignerWithOptionalCreator} signer - This will be the WebauthnSigner you pass
 * @property {string} [fallbackProvider] -  fallback provider URL e.g an alchemy or infura endpoint.
 * @property {Chain} [chain] - Optional blockchain chain configuration, defaults to mainnet.
 * @property {Network} [network] - Optional passport network configuration, defaults to Passport testnet.
 * @property {string} [encryptionSecret] - Optional encryption secret for securing data.
 */
type PassportOptions = {
  iconPath: string
  scopeId: string
  signer: SignerWithOptionalCreator
  fallbackProvider: string
  chain?: Chain
  network?: Network
  encryptionSecret?: string
}
```

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
