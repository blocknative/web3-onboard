<script>
    import {Gas} from '$lib/components'
</script>
# Gas

A module for requesting streams or single requests of gas price estimates from the [Blocknative Gas Platform API](https://docs.blocknative.com/gas-platform).

Supports both Eth Mainnet and Polygon gas pricing.

<Gas />

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/gas
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/gas
```

  </TabPanel>
</Tabs>

### Standalone Setup

```typescript
import gas from '@web3-onboard/gas'

// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'],
  apiKey: '<OPTIONAL_API_KEY>',
  endpoint: 'blockPrices'
})

const { unsubscribe: ethGasUnsub } = ethMainnetGasBlockPrices.subscribe(
  estimates => console.log(estimates)
)

// .... sometime later, unsubscribe to stop polling
setTimeout(ethGasUnsub, 10000)

// OR you can subscribe to multiple chains at once:
const gasBlockPrices = gas.stream({
  chains: ['0x1', '0x89'],
  apiKey: '<OPTIONAL_API_KEY>',
  endpoint: 'blockPrices',
  // can override default poll rate as well
  poll: 1000
})

const { unsubscribe } = gasBlockPrices.subscribe(estimates =>
  console.log(estimates)
  console.log(estimates[0].blockPrices[0].estimatedPrice)
  // block inclusion confidence options: 70, 80, 90, 95, 99
  console.log(bnGasPrices.find(gas => gas.confidence === 90))
)

// .... sometime later, unsubscribe to stop polling
setTimeout(unsubscribe, 10000)

// Can also just do a one time get rather than a stream
const gasBlockPrices = await gas.get({
  chains: ['0x1', '0x89'],
  apiKey: '<OPTIONAL_API_KEY>',
  endpoint: 'blockPrices'
})
```


## Usage with Web3-Onboard wallet Connect and Ethers.js

This example assumes you have already setup web3-onboard to connect wallets to your dapp. 
For more information see [web3-onboard docs](/docs/packages/core#install).
```ts
import gas from '@web3-onboard/gas'
import { ethers } from 'ethers'

// Set provider using the Web3-Onboard wallet.provider instance from the connected wallet
let provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
let bnGasPrices

const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'], // '0x89' can also be added/replaced here for Polygon gas data 
  apiKey: '<OPTIONAL_API_KEY>', // for faster refresh rates
  endpoint: 'blockPrices'
})

ethMainnetGasBlockPrices.subscribe(estimates => {
  console.log(estimates)
  bnGasPrices = estimates[0].blockPrices[0].estimatedPrices
})


const gweiToWeiHex = gwei => {
  return `0x${(gwei * 1e9).toString(16)}`
}

const sendTransaction = async () => {
  if (!toAddress) {
    alert('An Ethereum address to send Eth to is required.')
    return
  }

  const signer = provider.getUncheckedSigner()
  
  // define desired confidence for transaction inclusion in block and set in transaction
  // block inclusion confidence options: 70, 80, 90, 95, 99
  const bnGasForTransaction = bnGasPrices.find(gas => gas.confidence === 90)

  const rc = await signer.sendTransaction({
    to: toAddress,
    value: 1000000000000000

    // This will set the transaction gas based on desired confidence
    maxPriorityFeePerGas: gweiToWeiHex(
      bnGasForTransaction.maxPriorityFeePerGas
    ),
    maxFeePerGas: gweiToWeiHex(bnGasForTransaction.maxFeePerGas)
  })
  console.log(rc)
}
```
