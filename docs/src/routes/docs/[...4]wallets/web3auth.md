# Web3auth

Wallet module for connecting Web3auth to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/web3auth
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/web3auth
```

  </TabPanel>
</Tabs>

## Options

See the [Web3auth Docs](https://docs.web3auth.io/api-reference/web/plugnplay) for the extensive list of options.

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import web3authModule from '@web3-onboard/web3auth'

const web3auth = web3authModule({
  clientId:
    'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    web3auth
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

**web3auth** will require a Babel to compile from es6 if not already supported. See config for Babel and Webpack4 as follows

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