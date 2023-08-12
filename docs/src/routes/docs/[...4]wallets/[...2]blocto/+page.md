---
title: Blocto
---

# {$frontmatter.title}

Wallet module for connecting Blocto SDK to web3-onboard. Check out the [Blocto Developer Docs](https://docs.blocto.app/blocto-sdk/javascript-sdk/evm-sdk) for more information.

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/blocto
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/blocto
```

  </TabPanel>
</Tabs>

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import bloctoModule from '@web3-onboard/blocto'

// initialize the module with options
const blocto = bloctoModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    blocto
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)

### Webpack 4

Node built-ins are automatically bundled in v4 so that portion is handled automatically.

**Blocto** support will require a Babel to compile from es6 if not already supported. See config for Babel and Webpack4 as follows

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
