# Gnosis

Wallet module for connecting Gnosis Safe to web3-onboard

## Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/gnosis
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/gnosis
```

  </TabPanel>
</Tabs>

## Options

```typescript
type GnosisOptions = {
  whitelistedDomains: RegExp[]
}
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import gnosisModule from '@web3-onboard/gnosis'

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

## Customizing Gnosis Transaction Gas

If you are looking to set the `gasLimit` of a transaction within Gnosis, the gas properties within the transaction WILL BE IGNORED.
Instead you will need to use the `safeTxGas` prop AND the web3-onboard Gnosis instance that is exposed through the provider to send along the transaction.
The Gnosis sdk instance exposed by the web3-onboard must be used to set the `safeTxGas` prop and send the transaction.
Check [Gnosis docs](https://github.com/safe-global/safe-contracts/blob/a6504a9afdeac186a8cdb29ad68b189523c80eda/docs/safe_tx_gas.md) for full detail as it can be a bit confusing.
An example of accessing the Gnosis SDK instance and sending a transaction can be found below.

```typescript
const tx = {
  to: toAddress,
  value: 1000000000000000,
  data: '0x',
}
const params = {
  safeTxGas: 5000000,
};

// wallet is the provider exposed by web3-onboard after the Gnosis wallet is connected
let trans = await wallet.instance.txs.send({txs:[tx], params})
```

Note: With the `safeTxGas` you will see additional value on the `gasLimit` displayed in the Safe. Check [Gnosis docs](https://github.com/safe-global/safe-contracts/blob/a6504a9afdeac186a8cdb29ad68b189523c80eda/docs/safe_tx_gas.md) for full details on that computation.
