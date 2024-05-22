# @web3-onboard/wagmi

## A module for connecting wallets using WAGMI which returns a WAGMI config object to be used with [@wagmi/core](https://wagmi.sh/core/getting-started) functions.

### Install

**NPM**
`npm i @web3-onboard/wagmi`

**Yarn**
`yarn add @web3-onboard/wagmi`

## Usage

This example assumes you have already setup web3-onboard to connect wallets to your dapp.
For more information see [web3-onboard docs](https://onboard.blocknative.com/docs/modules/core#install).

```ts
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import wagmi from '@web3-onboard/wagmi'
import { parseEther } from 'viem'
import {
  sendTransaction as wagmiSendTransaction,
  switchChain,
  disconnect,
  getConnectors
} from '@web3-onboard/wagmi'
import { parseEther, isHex, fromHex } from 'viem'

const injected = injectedModule()

const onboard = Onboard({
  wagmi,
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/17c1e1500e384acfb6a72c5d2e67742e'
    }
  ]
  // ... other Onboard options
})

const sendTransaction = async provider => {
  // current primary wallet - as multiple wallets can connect this value is the currently active
  const [currentPrimaryWallet] = onboard.state.get().wallets
  const wagmiConfig = onboard.state.get().wagmiConfig
  const result = await wagmiSendTransaction(wagmiConfig, {
    to: toAddress,
    // desired connector to send txn from
    account: currentPrimaryWallet.accounts[0], 
    value: parseEther('0.001')
  })
  console.log(result)
}

async function switchWagmiChain(chainId) {
  let chainAsNumber
  if (isHex(chainId)) {
    chainAsNumber = fromHex(chainId, 'number')
  } else if (!isHex(chainId) && typeof chainId === 'number') {
    chainAsNumber = chainId
  } else {
    throw new Error('Invalid chainId')
  }
  const wagmiConfig = onboard.state.get().wagmiConfig
  await switchChain(wagmiConfig, { chainId: chainAsNumber })
}

async function disconnectWallet() {
  const wagmiConfig = onboard.state.get().wagmiConfig
  const disconnectThisWallet = getConnectors(wagmiConfig).find(
    connector => connector.name === label
  )
  disconnect(wagmiConfig, { connector: disconnectThisWallet })
}
```
