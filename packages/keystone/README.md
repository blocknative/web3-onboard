# @bn-onboard/keystone

## Wallet module for connecting Keystone hardware wallets to Onboard V2

### Install

`npm i @bn-onboard/keystone`

### Options

```typescript
type KeystoneOptions = {
  customNetwork?: CustomNetwork
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
import Onboard from '@bn-onboard/core'
import keystoneModule from '@bn-onboard/keystone'

const keystone = keystoneModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    keystone
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
