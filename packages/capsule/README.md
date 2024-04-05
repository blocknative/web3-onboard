# @web3-onboard/capsule

## Wallet module for connecting Capsule to web3-onboard

[Capsule](https://usecapsule.com/) is a signing solution that you can use to create secure embedded MPC wallets to onboard your users with just an email or social login. Capsule wallets are recoverable, portable, and permissioned across different crypto applications, so your users don't need to create different signers or contract accounts for every app they use.

If you'd like to use Capsule's full functionality within the web3onboard package without any extra integration steps, you can also [request a Capsule API Key](https://usecapsule.com/api) and use it with this package.

Adding the Capsule Module to web3onboard without an API Key still gives your users the ability to log in with Capsule wallets created elsewhere.

To learn more, check out the [Capsule Developer Docs](https://docs.usecapsule.com/)

### Install

`yarn add @web3-onboard/capsule`

## Options

```typescript
type CapsuleInitOptions = {
  environment: string
  apiKey: string
  constructorOpts?: ConstructorOpts
  appName: string
  modalProps: CapsuleModalV2Props
}
```

`environment` - The environment to which you want to connect, either `Environment.DEVELOPMENT` for testnets and development only or `Environment.PRODUCTION` for production use.
`appName` - Your Application's name - displayed in the modal when your users are prompted to log in.
`apiKey` - Your Capsule API Key. Required for new user creation, but not required if you are only allowing users to log in. To get an API key, fill out [this form](https://usecapsule.com/api).

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import Capsule, { Environment } from '@usecapsule/react-sdk';
import capsuleModule from '@web3-onboard/capsule'

// initialize capsule
const capsule = new Capsule(
  Environment.DEVELOPMENT,  // for production, use ENVIRONMENT.PROD
  "YOUR_API_KEY"
  { opts }    // find these at docs.usecapsule.com
);

// initialize the module with options
const capsuleWallet = capsuleModule(capsule)

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
