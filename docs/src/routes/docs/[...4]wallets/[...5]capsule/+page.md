# Capsule

## Wallet module for connecting Capsule Embedded Wallets to web3-onboard

[Capsule](https://usecapsule.com/) is a signing solution that you can use to create secure embedded MPC wallets to onboard your users with just an email or social login. Capsule wallets are recoverable, portable, and permissioned across different crypto applications, so your users don't need to create different signers or contract accounts for every app they use

If you'd like to use Capsule's full functionality within the web3onboard package without any extra integration steps, you can also [request a Capsule API Key](https://usecapsule.com/api) and use it with this package.

To learn more, check out the [Capsule Developer Docs](https://docs.usecapsule.com/)

### Install

<Tabs values={['yarn', 'npm', 'pnpm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/capsule
```

</TabPanel>
<TabPanel value="npm">

```sh copy
npm install @web3-onboard/capsule
```

</TabPanel>
<TabPanel value="pnpm">

```sh copy
pnpm install @web3-onboard/capsule
```

</TabPanel>
</Tabs>

## Options

For configuration options, check out the [Integration Guide Docs](https://docs.usecapsule.com/integration-guide)

```typescript
type CapsuleInitOptions = {
  environment: string
  apiKey: string
  /** @optional capsule object opts */
  constructorOpts?: Partial<ConstructorOpts>
  appName: string
  /** @optional capsule modal props */
  modalProps?: Partial<CapsuleModalPropsForInit>
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import Capsule, { Environment } from '@usecapsule/react-sdk';
import capsuleModule from '@web3-onboard/capsule'

// initialize capsule
const capsule = new Capsule(
  Environment.BETA,  // for production, use ENVIRONMENT.PROD
  "YOUR_API_KEY"
  { opts }    // find these at docs.usecapsule.com
);

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
