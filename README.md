# Onboard

JavaScript library to easily onboard users to ethereum apps by enabling wallet selection, connection, wallet checks and real time state updates.

## Install

`npm install bnc-onboard-metamask`

## Quick Start

```javascript
import Onboard from 'bnc-onboard-metamask'
import Web3 from 'web3'

// set a variable to store instantiated web3
let web3

// head to blocknative.com to create a key
const BLOCKNATIVE_KEY = 'blocknative-api-key'

// the network id that your dapp runs on
const NETWORK_ID = 1

// initialize onboard
const onboard = Onboard({
  dappId: BLOCKNATIVE_KEY,
  networkId: NETWORK_ID,
  subscriptions: {
    wallet: wallet => {
      // instantiate web3 when the user has selected a wallet
      web3 = new Web3(wallet.provider)
      console.log(`${wallet.name} connected!`)
    }
  }
})

// Prompt user to select a wallet
await onboard.walletSelect()

// Run wallet checks to make sure that user is ready to transact
await onboard.walletCheck()
```

## Documentation

For detailed documentation head to [docs.blocknative.com](https://docs.blocknative.com/onboard)
