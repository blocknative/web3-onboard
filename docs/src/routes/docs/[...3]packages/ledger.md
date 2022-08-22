<script>
    import { Tabs, TabPanel } from '$lib/components'
    import { InstallYarnLedger, InstallNpmLedger } from '$lib/components/code-snippets/packages'
</script>

# @web3-onboard/ledger

## Wallet module for connecting Ledger hardware wallets to web3-onboard

### Install


<Tabs values={['yarn', 'npm']}>
  <TabPanel value="yarn"><InstallYarnLedger /></TabPanel>
  <TabPanel value="npm"><InstallNpmLedger /></TabPanel>
</Tabs> 


### Options

```typescript
type LedgerOptions = {
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
import Onboard from '@web3-onboard/core'
import ledgerModule from '@web3-onboard/ledger'

const ledger = ledgerModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    ledger
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```