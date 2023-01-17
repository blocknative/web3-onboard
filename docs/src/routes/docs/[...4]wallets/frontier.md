# Frontier

[Frontier](https://frontier.xyz/) is a Crypto, DeFi, and NFT wallet browser extension where you can send, store & invest in crypto assets across multiple chains. Explore DeFi in multiple ecosystems, collect and display NFTs, and browse all of Web3 from a single place.
For more information on Frontier, please refer to the [Frontier support](https://help.frontier.xyz/).

### Install

```sh copy
yarn add @web3-onboard/core @web3-onboard/frontier
```

or

```sh copy
npm install @web3-onboard/core @web3-onboard/frontier
```

## Usage

```typescript
import Onboard from '@web3-onboard/core'
import frontierModule from '@web3-onboard/frontier'

// initialize the module
const frontier = frontierModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    frontier
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
