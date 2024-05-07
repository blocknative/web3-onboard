# @web3-onboard/finoaconnect

## Wallet module for connecting FinoaConnect SDK to web3-onboard

#### Install

`npm i @web3-onboard/core @web3-onboard/finoaconnect`

## Usage

```typescript
import Onboard from '@web3-onboard/core';
import finoaConnectModule from '@web3-onboard/finoaconnect';

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    finoaConnectModule()
    //... other wallets
  ]
})

// alternatively to connect to a localised development environment
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    finoaConnectModule([
      {
        labelSuffix: 'localhost',
        url: 'http://localhost:8080',
      }
    ])
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```