# @web3-onboard/capsule

## Wallet module for connecting Capsule to web3-onboard

[Capsule](https://usecapsule.com/) is a signing solution that you can use to create secure embedded MPC wallets with just an email or social login that are recoverable, portable, and permissioned across different crypto applications, so your users don't need to create different signers or contract accounts for every app they use.

Adding the Capsule Module to web3onboard gives your users the ability to log in with Capsule wallets created elsewhere. You can also [request a Capsule API Key](https://form.typeform.com/to/hLaJeYJW) to allow users to easily create embedded wallets within web3onboard without any extra integration steps.

To learn more, check out the [Capsule Developer Docs](https://docs.usecapsule.com/)

### Install

`yarn add @web3-onboard/capsule`

## Options

```typescript
type CapsuleInitOptions = {
    environment: Environment
    appName: string
    apiKey?: string
}
```

`environment` - The environment to which you want to connect, either `Environment.DEVELOPMENT` for testnets and development only or `Environment.PRODUCTION` for production use.
`appName` - Your Application's name - displayed in the modal when your users are prompted to log in.
`apiKey` - Your Capsule API Key. Required for new user creation, but not required if you are only allowing users to log in. To get an API key, fill out [this form](https://form.typeform.com/to/hLaJeYJW).

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import capsuleModule from '@web3-onboard/capsule'

// initialize the module with options
const capsule = capsuleModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    capsule
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build env settings (webpack config)

You may need to add the following rule to your webpack config module
in order to handle certain styling files (See the config for the 
Blocknative demo app):

```typescript
{
  test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
  type: 'asset/resource',
  generator: {
    filename: 'fonts/[name][ext][query]'
  }
}
```
