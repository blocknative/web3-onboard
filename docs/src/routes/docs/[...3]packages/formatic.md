<script>
    import { Tabs, TabPanel } from '$lib/components'
    import { InstallYarnFortmatic, InstallNpmFortmatic } from '$lib/components/code-snippets/packages'
</script>

# @web3-onboard/fortmatic

Wallet module for connecting Ledger hardware wallets to web3-onboard

### Install

<Tabs values={['yarn', 'npm']}>
  <TabPanel value="yarn"><InstallYarnFortmatic /></TabPanel>
  <TabPanel value="npm"><InstallNpmFortmatic /></TabPanel>
</Tabs>

## Options

```typescript
type FortmaticOptions = {
  apiKey: string
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import fortmaticModule from '@web3-onboard/fortmatic'

const fortmatic = fortmaticModule({ apiKey: 'API_KEY' })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    fortmatic
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```