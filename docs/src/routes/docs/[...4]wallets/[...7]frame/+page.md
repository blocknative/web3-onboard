---
title: Frame
---

# {$frontmatter.title}

[Frame](https://frame.sh/) is a privacy focused EVM desktop wallet, enabling a secure system-wide interface to your chains and web3 accounts.

### Install

```sh copy
yarn add @web3-onboard/core @web3-onboard/frame
```

or

```sh copy
npm install @web3-onboard/core @web3-onboard/frame
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import frameModule from '@web3-onboard/frame'
// initialize the module
const frame = frameModule()
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    frame
    //... other wallets
  ]
})
const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

### Filtering Platforms

You may decide that on certain platforms you do not want to display this wallet as a selectable option. To do that you can use the `filter` init option which is an array of platforms that you would like this wallet to **not** be displayed to the end user:

```typescript
import Onboard from '@web3-onboard/core'
import frameModule from '@web3-onboard/frame'
const frame = frameModule({ filter: ['iOS', 'Android'] })
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    frame
    //... other wallets
  ]
})
const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

The following is a list of the platforms that can be filtered:

```typescript
type Platform =
  | 'Windows Phone'
  | 'Windows'
  | 'macOS'
  | 'iOS'
  | 'Android'
  | 'Linux'
  | 'Chrome OS'
  | 'Android Browser'
  | 'Chrome'
  | 'Chromium'
  | 'Firefox'
  | 'Microsoft Edge'
  | 'Opera'
  | 'Safari'
  | 'desktop'
  | 'mobile'
  | 'tablet'
```