<script>
    import { ConnectWallet } from '$lib/components'
</script>

## Connect Wallet

<ConnectWallet />


<div class="w-full  h-10"/>

<Tabs values={['vanilla', 'react']}>
<div class="w-full  h-10"/> 
<TabPanel value="vanilla">

:::steps

!!!step title="Step 1"|description="Import the libraries"|orientation="vertical"

```js
import Onboard from '@web3-onboard/core'

// Import the wallets modules you'd like to use
import injectedModule from '@web3-onboard/injected-wallets'
```

!!!

!!!step title="Step 2"|(slot=description)=Configure the wallets and chains that you'd like your app to support.|orientation="vertical"

```js
    const wallets = [injectedModule()]
    const chains = [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
      },
      {
        id: '0x3',
        token: 'tROP',
        label: 'Ethereum Ropsten Testnet',
        rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
      }
    ],
```

!!!

!!!step title="Step 3"|(slot=description)=Initialize Web3-Onboard|orientation="vertical"

```js
  const onboard = Onboard({
    wallets,
    chains
    appMetadata: {
      name: 'Documentation',
      icon: '<svg>Your Logo</svg>',
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    }
  })
```

!!!

:::

  </TabPanel>
  <TabPanel value="react">

:::steps

!!!step title="Step 1"|description="Import the libraries"|orientation="vertical"

```js
import Onboard from '@web3-onboard/core'

// Import the wallets modules you'd like to use
import injectedModule from '@web3-onboard/injected-wallets'
```

!!!

!!!step title="Step 2"|(slot=description)=Configure the wallets and chains that you'd like your app to support.|orientation="vertical"

```js
    const wallets = [injectedModule()]
    const chains = [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
      },
      {
        id: '0x3',
        token: 'tROP',
        label: 'Ethereum Ropsten Testnet',
        rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
      }
    ],
```

!!!

!!!step title="Step 3"|(slot=description)=Initialize Web3-Onboard|orientation="vertical"

```js
  const onboard = Onboard({
    wallets,
    chains
    appMetadata: {
      name: 'Documentation',
      icon: '<svg>Your Logo</svg>',
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    }
  })
```

!!!

:::

  </TabPanel>
</Tabs>


