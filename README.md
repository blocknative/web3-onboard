# Onboard

JavaScript library to easily onboard users to ethereum apps by enabling wallet selection, connection, wallet checks and real time state updates.

## Install

`npm install bnc-onboard`

## Quick Start

```javascript
import Onboard, { modules } from 'bnc-onboard'

// head to blocknative.com to create a key
const BLOCKNATIVE_KEY = 'blocknative-api-key'

// the network id that your dapp runs on
const NETWORK_ID = 1

// SDK Wallet api keys
const FORTMATIC_KEY = 'fortmatic-api-key'
const PORTIS_KEY = 'portis-api-key'
const INFURA_KEY = 'infura-api-key'
const SQUARELINK_KEY = 'squarelink-api-key'

// the wallets you would like the user to be able to select
// mobile wallets will only be displayed if the user is on a mobile device
// wallets will be displayed in order
const wallets = [
  { name: 'coinbase' },
  { name: 'trust' },
  { name: 'metamask' },
  { name: 'dapper' },
  {
    name: 'fortmatic',
    apiKey: FORTMATIC_KEY,
    networkId: NETWORK_ID
  },
  {
    name: 'portis',
    apiKey: PORTIS_KEY,
    networkId: NETWORK_ID
  },
  {
    name: 'squarelink',
    apiKey: SQUARELINK_KEY,
    networkId: NETWORK_ID
  },
  { name: 'authereum', networkId: NETWORK_ID },
  {
    name: 'walletConnect',
    infuraKey: INFURA_KEY,
    networkId: NETWORK_ID
  }
]

// the checks you would like the user's wallet to pass before being ready to transact
const walletChecks = [
  { name: 'connect' },
  { name: 'network', networkId: NETWORK_ID },
  { name: 'balance', minimumBalance: '1000000000' }
]

// initialize onboard
const onboard = Onboard({
  dappId: BLOCKNATIVE_KEY,
  networkId: NETWORK_ID,
  subscriptions: {
    address: address => console.log('user address has changed:', address),
    network: network => console.log('user network has changed:', network),
    balance: balance => console.log('user balance has changed:', balance),
    wallet: wallet =>
      console.log(
        'a new wallet has been selected by user',
        wallet.provider,
        wallet.name
      )
  },
  modules: {
    walletSelect: {
      heading: 'Select a Wallet',
      description: 'Please select a wallet to connect to this dapp:',
      wallets: modules.select(wallets)
    },
    walletCheck: modules.check(walletChecks)
  }
})

// Prompt user to select a wallet
await onboard.walletSelect()

// Run wallet checks to make sure that user is ready to transact
await onboard.walletCheck()
```

## Documentation

For detailed documentation head to [docs.blocknative.com](https://docs.blocknative.com/onboard)
