# @web3-onboard/trezor

## Wallet module for connecting Trezor hardware wallets to web3-onboard

### Install

`npm i @web3-onboard/trezor`

### Options

```typescript
type TrezorOptions = {
  email: string
  appUrl: string
  customNetwork?: CustomNetwork
  filter?: Platform[]
}

interface CustomNetwork {
  networkId: number
  genesis: GenesisBlock
  hardforks: Hardfork[]
  bootstrapNodes: BootstrapNode[]
}

interface GenesisBlock {
  hash: string
  timestamp: string | null
  gasLimit: number
  difficulty: number
  nonce: string
  extraData: string
  stateRoot: string
}

interface Hardfork {
  name: string
  block: number | null
}

interface BootstrapNode {
  ip: string
  port: number | string
  network?: string
  chainId?: number
  id: string
  location: string
  comment: string
}
```

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import trezorModule from '@web3-onboard/trezor'

const trezor = trezorModule({
  email: '<EMAIL_CONTACT>',
  appUrl: '<APP_URL>'
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    trezor
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
import trezorModule from '@web3-onboard/trezor'

const trezor = trezorModule({
  email: '<EMAIL_CONTACT>',
  appUrl: '<APP_URL>',
  filter: ['Safari'] // do not display on Safari
})

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    trezor
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
