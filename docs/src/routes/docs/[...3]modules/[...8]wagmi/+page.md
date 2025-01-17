---
title: WAGMI
---

# {$frontmatter.title}

A module for connecting wallets using WAGMI which returns a WAGMI config object to be used with [@wagmi/core](https://wagmi.sh/core/getting-started) functions.

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/wagmi
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/wagmi
```

  </TabPanel>
</Tabs>

## WAGMI Usage

To add [WAGMI API](https://wagmi.sh/core/getting-started) support to your project you can simply install `web3-onboard/wagmi` import and pass in the WAGMI package default export directly into your onboard configuration. After doing so you can use all of the native WAGMI API functions directly from `@web3-onboard/wagmi`. This will give access to all WAGMI function available on or before `@wagmi/core` version `2.10.4`.

Full documentation for `wagmi/core` API functions can be found [here](https://wagmi.sh/core/getting-started).

### wagmiConfig

After initialization an up-to-date WAGMI config will will be available from the onboard state object `onboard.state.get().wagmiConfig` which will need to be passed as the first prop of most [@wagmi/core](https://wagmi.sh/core/getting-started) methods.

### wagmiConnector and Connectors

Wallets will also have a `wagmiConnector` prop within the onboard state object which will allow you to target specific wallets for interactions. This can also be bi-passed if the primary or most recently connected wallet is the wallet meant for the transactions.
The config and connectors can be used with the WAGMI API returned from this module or an external WAGMI instance.

## WAGMI Example

This example assumes you have already setup web3-onboard to connect wallets to your dapp.
For more information see [web3-onboard docs](https://onboard.blocknative.com/docs/modules/core#install).

```ts
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import wagmi from '@web3-onboard/wagmi'
import {
  sendTransaction as wagmiSendTransaction,
  switchChain,
  disconnect,
  getConnectors
} from '@web3-onboard/wagmi'
import { parseEther, isHex, fromHex } from 'viem'

const injected = injectedModule()

const onboard = Onboard({
  // This javascript object is unordered meaning props do not require a certain order
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

const sendTransaction = async () => {
  // current primary wallet - as multiple wallets can connect this value is the currently active
  const [activeWallet] = onboard.state.get().wallets
  const { wagmiConnector } = activeWallet
  const wagmiConfig = onboard.state.get().wagmiConfig
  const result = await wagmiSendTransaction(wagmiConfig, {
    to: toAddress,
    // desired connector to send txn from
    connector: wagmiConnector,
    value: parseEther('0.001')
  })
  console.log(result)
}

async function signMessage(chainId) {
  // current primary wallet - as multiple wallets can connect this value is the currently active
  const [activeWallet] = onboard.state.get().wallets
  const wagmiConfig = onboard.state.get().wagmiConfig
  await wagmiSignMessage(wagmiConfig, {
    message: 'This is my message to you',
    connector: activeWallet.wagmiConnector
  })
}

async function switchWagmiChain(chainId) {
  // current primary wallet - as multiple wallets can connect this value is the currently active
  const [activeWallet] = onboard.state.get().wallets
  const { wagmiConnector } = activeWallet
  let chainAsNumber
  if (isHex(chainId)) {
    chainAsNumber = fromHex(chainId, 'number')
  } else if (!isHex(chainId) && typeof chainId === 'number') {
    chainAsNumber = chainId
  } else {
    throw new Error('Invalid chainId')
  }
  const wagmiConfig = onboard.state.get().wagmiConfig
  await switchChain(wagmiConfig, {
    chainId: chainAsNumber,
    connector: wagmiConnector
  })
}

async function disconnectWallet() {
  const wagmiConfig = onboard.state.get().wagmiConfig
  const [activeWallet] = onboard.state.get().wallets
  const { wagmiConnector } = activeWallet
  disconnect(wagmiConfig, { connector: wagmiConnector })
}
```
