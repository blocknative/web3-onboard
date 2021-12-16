# Onboard Wallet Module - [Gnosis Safe](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-sdk)

## Options

```typescript
type GnosisOptions = {
  whitelistedDomains: RegExp[]
}
```

## Usage

```typescript
import Onboard from '@bn-onboard/core'
import gnosisModule from '@bn-onboard/gnosis'

const gnosis = gnosisModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    gnosis
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
