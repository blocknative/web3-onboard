# @web3-onboard/keepkey

## Wallet module for connecting KeepKey hardware wallets to web3-onboard

### Install

`npm i @web3-onboard/keepkey`

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import keepkeyModule from '@web3-onboard/keepkey'

const keepkey = keepkeyModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    keepkey
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
import keepkeyModule from '@web3-onboard/keepkey'

const keepkey = keepkeyModule({ filter: ['Safari'] })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    keepkey
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

Initialization options:

```typescript
type keepkeyInitOptions = {
  containerElement?: string
  filter?: Platform
  /**
   * A number that defines the amount of consecutive empty addresses displayed
   * within the Account Select modal. Default is 5
   */
  consecutiveEmptyAccountThreshold?: number
}
```

The following is a list of the platforms that can be filtered:

```typescript
type Platform = DeviceOSName | DeviceBrowserName | DeviceType | 'all'

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
