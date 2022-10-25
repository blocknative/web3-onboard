# @web3-onboard/gas

## A module for requesting streams or single requests of gas price estimates from the [Blocknative Gas Platform API](https://onboard.blocknative.com/docs/packages/gas).

### Install

**NPM**
`npm i @web3-onboard/gas`

**Yarn**
`yarn add @web3-onboard/gas`

### Standalone Usage

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
