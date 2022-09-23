<script>
    import { ConnectWallet, ReactConnectWallet, SvelteConnectWallet } from '$lib/components'

    import uniswapExampleVideo from '$lib/assets/uniswap-example.mp4'

    const frameworks = ['yarn', 'npm']
</script>

# Uniswap Widget Example

This example will walk you through how to integrate `@web3-onboard` with the [Uniswap Widget](https://docs.uniswap.org/sdk/widgets/swap-widget)! 

## Step 1: Install

To start, we'll install the widgets library and the web3-onboard react library using npm or Yarn.

<Tabs values={frameworks}>
  <TabPanel value="yarn">
    
```bash copy
yarn add @web3-onboard/react @web3-onboard/injected-wallets
```

  </TabPanel>
  <TabPanel value="npm">

```bash copy
npm install @web3-onboard/react @web3-onboard/injected-wallets
```

  </TabPanel>
</Tabs>



## Step 2: Import + Configure

Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet.

We'll create a file called `web3-onboard.ts` and then export the initialized `web3-onboard` instance and use this throughout our dapp.

```ts title="web3-onboard.ts"|copy
import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ethereum Ropsten',
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
}

const polygonMainnet = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
}

const chains = [ethereumRopsten, polygonMainnet]

const wallets = [injectedModule()]

const appMetadata = {
  name: 'Uniswap Widget Example',
  icon: '<svg>My App Icon</svg>',
  description:
    'Example showcasing how to integrate web3-onboard with uniswap widget.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
  ],
}

// initialize and export Onboard
export default init({
  wallets,
  chains,
  appMetadata,
})
```

## Step 3: Add the react hooks
In our main `App` component we'll setup our Web3-Onboard react hooks. For this example we'll be using the `useConnectWallet` react hook. This will give us access to the currently connected wallets, as well as, methods for us to facilitate connecting and disconnecting a wallet. 

```tsx title="App.tsx"|copy
import { useState, useEffect } from 'react'

import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

export default function App() {

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  // Once the wallet is connected the provider will be defined and we'll set the provider value
  // This provider will then be passed to the Uniswap component in the next step.
  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    } else {
      // Reset the provider back to 'undefined' such that the 
      // connect wallet option will reappear in the uniswap modal
      setProvider(undefined)
    }
  }, [wallet])

  // The connect wallet function which will be based to the Uniswap component in the next step.
  const connectWallet = () => {
    connect()
  }

  return (
    <main>
      <h1>Uniswap Swap Widget</h1>
      // Uniswap widget will go here
    </main>
  )
}
```

## Step 4: Add the Uniswap widget

To begin, we'll import the `SwapWidget` along with the corresponding fonts. We'll define a few constants that will be passed to the swap widget:

  - The json rpc endpoint that will be used to provide trade quotes prior to the user connecting a wallet
  - The token list url used to provide a list of tokens for the user to select from
  - The Uniswap token address which will be used as the default selected token

To learn more about all of the `SwapWidget` props, check out [the api reference](https://docs.uniswap.org/sdk/widgets/swap-widget/api).

We will take the `connectWallet` function that we previously defined and pass it to the `onConnectWallet` prop on the `SwapWidget`. This will allow us to initiate the web3-onboard connect wallet modal once the user clicks the on the connect wallet button within the `SwapWidget`. Finally, we'll also pass the `provider` to the SwapWidget such that once the `provider` is defined, the `SwapWidget` will be able to use the wallet's provider to facilitate the swap.

```tsx title="App.tsx"|copy|{6-13,40-58}
import { useState, useEffect } from 'react'

import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

const JSON_RPC_URL = 'https://cloudflare-eth.com'
// The url of the default uniswap token list. This list will be passed to the Uniswap component
// and will appear by default in the token selector UI.
const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

export default function App() {

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  // Once the wallet is connected the provider will be defined and we'll set the provider value
  // This provider will then be passed to the Uniswap component below.
  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    } else {
      // Reset the provider back to 'undefined' such that the 
      // connect wallet option will reappear in the uniswap modal
      setProvider(undefined)
    }
  }, [wallet])

  // The connect wallet function which will be based to the Uniswap component below.
  const connectWallet = () => {
    connect()
  }

  return (
    <main>
      <h1>Uniswap Swap Widget</h1>
      <SwapWidget
        jsonRpcEndpoint={JSON_RPC_URL}
        // Specifies the set of tokens that appear by default in the token selector list.
        tokenList={TOKEN_LIST}
        // This is the provider that we receive from the user's connected wallet
        provider={provider}
        // When the Uniswap connect wallet button gets hit
        // the function gets called. We'll hook this up to 
        // our connect wallet method from web3-onboard.
        onConnectWallet={connectWallet}
        // Address of the token to be selected by default in the 
        // input field (e.g. USDC) for each network chain ID.
        defaultInputTokenAddress="NATIVE"
        // Default amount for the input field in this case 1 ETH
        defaultInputAmount="1"
        // Address of the token to be selected by default in the input field (e.g. USDC) 
        // for each network chain ID.
        defaultOutputTokenAddress={UNI}
      />
    </main>
  )
}
```

## Step 5: Wrap the context provider

Finally, we'll wrap our main App component with the `web3-onboard` context provider in order for us to access the `web3-onboard` instance throughout our app.

```js title="index.tsx"|copy|{8-9,13-15}
import React from 'react'
import ReactDOM from 'react-dom'
import { Web3OnboardProvider } from '@web3-onboard/react'

import './index.css'
import App from './App.tsx'

// Import the web3-onboard singleton
import web3Onboard from './web3-onboard'

ReactDOM.render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App />
    </Web3OnboardProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```
## See in action! 

<video width="100%" height="240" style="border-radius: 0.375rem" controls>
  <source src={uniswapExampleVideo} type="video/mp4">
  Your browser does not support the video tag.
</video>

## Live Example 🚀

Check out the live example on StackBlitz!

<iframe title="Uniswap + Web3-Onboard" src="https://stackblitz.com/edit/node-avakex?ctl=1&embed=1&hideExplorer=1&hideNavigation=1&view=preview" 
width="100%" height="500px" style="border-radius: 0.375rem" />
