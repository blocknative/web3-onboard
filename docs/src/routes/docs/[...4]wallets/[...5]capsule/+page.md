# Para

## Wallet module for connecting Para Embedded Wallets to web3-onboard

[Para](https://getpara.com/) is a signing solution that you can use to create secure embedded MPC wallets to onboard your users with just an email or social login. Para wallets are recoverable, portable, and permissioned across different crypto applications, so your users don't need to create different signers or contract accounts for every app they use

If you'd like to use Para's full functionality within the web3onboard package without any extra integration steps, you can also [request a Para API Key](https://getpara.com/api) and use it with this package.

To learn more, check out the [Para Developer Docs](https://docs.getpara.com/)

### Install

<Tabs values={['yarn', 'npm', 'pnpm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/para
```

</TabPanel>
<TabPanel value="npm">

```sh copy
npm install @web3-onboard/para
```

</TabPanel>
<TabPanel value="pnpm">

```sh copy
pnpm install @web3-onboard/para
```

</TabPanel>
</Tabs>

## Options

For configuration options, check out the [Integration Guide Docs](https://docs.getpara.com/integration-guide)

```typescript
type ParaInitOptions = {
  environment: string
  apiKey: string
  /** @optional para object opts */
  constructorOpts?: Partial<ConstructorOpts>
  appName: string
  /** @optional para modal props */
  modalProps?: Partial<ParaModalPropsForInit>
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import Para, { Environment } from '@getpara/react-sdk';
import paraModule from '@web3-onboard/para'

// initialize para
const para = new Para(
  Environment.BETA,  // for production, use ENVIRONMENT.PROD
  "YOUR_API_KEY"
  { opts }    // find these at docs.getpara.com
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
