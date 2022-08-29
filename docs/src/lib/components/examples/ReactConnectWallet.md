
## Step 1: Import

Import the libraries and any wallets you would like to use. For this example, we are going to use just the injected wallets module.


```js title="App.tsx"
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ethereum Ropsten',
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`
}

const polygonMainnet = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
}

const chains = [ethereumRopsten, polygonMainnet]

const wallets = [injectedModule()]

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const web3Onboard = init({
  wallets,
  chains
  appMetadata
})

function App() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <ConnectWallet />
    </Web3OnboardProvider>
  )
}

export default MyApp
```

## Step 2: Display the connect wallet button

In another file we'll create the component that will display our connect wallet button. We'll be using the `useConnectWallet` hook in order to achieve this.

```js title="ConnectWallet.tsx"
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function MyApp() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect({ label: wallet.label }) : connect())}>

        {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}

      </button>
    </div>
  )
}
```
