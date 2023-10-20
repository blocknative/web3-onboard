---
title: Web3auth
---

# {$frontmatter.title}

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
For troubleshooting web3Auth errors, framework, polyfill, etc please see the [official Web3Auth troubleshooting docs](https://web3auth.io/docs/troubleshooting/webpack-issues).

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

## Types

```typescript
type Web3AuthModuleOptions = Omit<Web3AuthOptions, 'chainConfig'> & {
  chainConfig?: Partial<CustomChainConfig> & Pick<CustomChainConfig, 'chainNamespace'>

  modalConfig?: Record<string, ModalConfig> | undefined

  /**
   * @deprecated use web3Auth native Z-Index config through
   * uiConfig.modalZIndex
   */
  loginModalZIndex?: string
}

interface Web3AuthOptions extends Web3AuthNoModalOptions {
  /**
   * web3auth instance provides different adapters for different type of usages. If you are a dapp and want to
   * use external wallets like metamask, then you can use the `DAPP` authMode.
   * If you are a wallet and only want to use you own wallet implementations along with openlogin,
   * then you should use `WALLET` authMode.
   *
   * @defaultValue `DAPP`
   */
  authMode?: 'DAPP' | 'WALLET'
  /**
   * Config for configuring modal ui display properties
   */
  uiConfig?: Omit<UIConfig, 'adapterListener'>
}

interface UIConfig {
  /**
   * App name to display in the UI.
   */
  appName?: string
  /**
   * Logo for your app.
   */
  appLogo?: string
  /**
   * theme for the modal
   *
   * @defaultValue `auto`
   */
  theme?: 'light' | 'dark' | 'auto'
  /**
   * order of how login methods are shown
   *
   * @defaultValue `["google", "facebook", "twitter", "reddit", "discord", "twitch", "apple", "line", "github", "kakao", "linkedin", "weibo", "wechat", "email_passwordless"]`
   */
  loginMethodsOrder?: string[]
  /**
   * language which will be used by web3auth. app will use browser language if not specified. if language is not supported it will use "en"
   * en: english
   * de: german
   * ja: japanese
   * ko: korean
   * zh: mandarin
   * es: spanish
   * fr: french
   * pt: portuguese
   *
   */
  defaultLanguage?: string
  /**
   * Z-index of the modal and iframe
   * @defaultValue 99998
   */
  modalZIndex?: string
  /**
   * Whether to show errors on Web3Auth modal.
   *
   * @defaultValue `true`
   */
  displayErrorsOnModal?: boolean
  /**
   * number of columns to display the Social Login buttons
   *
   * @defaultValue `3`
   */
  loginGridCol?: 2 | 3
  /**
   * decides which button will be displayed as primary button in modal
   * only one button will be primary and other buttons in modal will be secondary
   *
   * @defaultValue `socialLogin`
   */
  primaryButton?: 'externalLogin' | 'socialLogin' | 'emailLogin'
  adapterListener: SafeEventEmitter
  web3AuthNetwork?: OPENLOGIN_NETWORK_TYPE
}
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
