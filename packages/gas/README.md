# @web3-onboard/gas

## A module for getting a stream of gas price estimates from the [Blocknative Gas Platform API](https://docs.blocknative.com/gas-platform). Can be used standalone, or can be passed in to Web3 Onboard on initialization.

### Install

**NPM**
`npm i @web3-onboard/gas`

**Yarn**
`yarn add @web3-onboard/gas`

### Standalone Usage

```typescript
import gasModule from '@web3-onboard/gas'

// init the gas module
const gas = gasModule({
  // Create a key at https://explorer.blocknative.com/account
  apiKey: '<BLOCKNATIVE_API_KEY>',
  // the default poll rate for all subscriptions
  // see gas platform docs for available poll rates per account plan
  defaultPoll: 5000 // optional
})

// subscribe to a single chain for estimates
const ethMainnetGasEstimates = gas.estimates({ chains: ['0x1'] })

const { unsubscribe: ethGasUnsub } = ethMainnetGasEstimates.subscribe(
  estimates => console.log(estimates)
)

// .... sometime later, unsubscribe to stop polling
setTimeout(ethGasUnsub, 10000)

// OR you can subscribe to multiple chains at once:
const gasEstimates = gas.estimates({
  chains: ['0x1', '0x89'],
  // can override default poll rate as well
  poll: 1000
})

const { unsubscribe } = gasEstimates.subscribe(estimates =>
  console.log(estimates)
)

// .... sometime later, unsubscribe to stop polling
setTimeout(unsubscribe, 10000)
```

### Web3 Onboard Usage

Onboard will automatically start polling for gas estimates for all chains that it has been initialized with, and are supported by Gas Platform. For example if your app supports both Ethereum mainnet and Polygon mainnet and you initialize Onboard with both of those chains, then Onboard will start polling for gas estimates for both of those networks.

```typescript
import web3Onboard from '@web3-onboard/core'
import gasModule from '@web3-onboard/gas'

// init the gas module
const gas = gasModule({
  // Create a key at https://explorer.blocknative.com/account
  apiKey: '<BLOCKNATIVE_API_KEY>',
  // the default poll rate for all subscriptions
  // see gas platform docs for available poll rates per account plan
  defaultPoll: 5000 // optional
})

// pass to web3-onboard
const onboard = web3Onboard({
  // ... other init options
  gas
})

// then subscribe to gas updates
const gasEstimates = onboard.state.select('gas')
const unsubscribe = gasEstimates.subscribe(estimates => console.log(estimates))

// ... sometime later
setTimeout(unsubscribe, 10000)
```
