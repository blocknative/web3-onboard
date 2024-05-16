---
title: wagmi
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
  disconnect
} from '@wagmi/core'

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
  const wagmiConfig = onboard.state.get().wagmiConfig
  const result = await wagmiSendTransaction(wagmiConfig, {
    to: toAddress,
    value: parseEther('0.001')
  })
  console.log(result)
}

async function switchWagmiChain(chainId) {
  let chainAsNumber
  if (typeof chainId === 'string' && /^0x[0-9A-Fa-f]+$/.test(chainId)) {
    chainAsNumber = parseInt(chainId, 16)
  } else if (typeof chainId === 'number') {
    chainAsNumber = chainId
  } else {
    throw new Error('Invalid chainId')
  }
  const wagmiConfig = onboard.state.get().wagmiConfig
  await switchChain(wagmiConfig, { chainId: chainAsNumber })
}

async function disconnectWallet() {
  disconnect(wagmiConfig, wagmiConfig.connectors[0])
}
```
