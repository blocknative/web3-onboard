# Torus

## Wallet module for connecting Torus wallet to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/torus
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/torus
```

  </TabPanel>
</Tabs>

## Options

See the [Torus Docs](https://docs.tor.us/wallet/api-reference/class) for the extensive list of options

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import torusModule from '@web3-onboard/torus'

const torus = torusModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    torus
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments
For other build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
### Webpack 4

Node built-ins are automatically bundled in v4 so that portion is handled automatically.

**Torus** support will require a Babel to compile from es6 if not already supported. See config for Babel and Webpack4 as follows

`npm i --save-dev @babel/cli @babel/core @babel/node @babel/plugin-proposal-nullish-coalescing-operator @babel/plugin-proposal-optional-chaining @babel/plugin-syntax-bigint @babel/register`
**AND**
`npm i babel-loader`

**babel.config.js**

```javascript
module.exports = (api) => {
  api.cache(true)
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-bigint'
  ]
  return { plugins }
}
```

**webpack.config.js**

```javascript
config.module.rules = [
  ...otherModuleRules,
  {
    test: /\.js$/,
    exclude: (_) => !/node_modules\/(@web3auth|@ethereumjs)/.test(_),
    loader: 'babel-loader'
  }
]
```