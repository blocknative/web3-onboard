
## Step 1: Import + Configure

Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet.

```js title="App.tsx"|copy
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

```js title="ConnectWallet.tsx"|copy
import { useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
```

## Step 3: Display account information

Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar.

```js title="ConnectWallet.tsx"|copy{8,10-19,28-36}
import { useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  if(wallet?.provider) {
    return (
        <div>
          <img src={ens?.avatar} alt="ENS Avatar" />
          <div>{ ens?.name ? ens.name : address }</div>
          <div>Connected to {wallet.label}</div>
          <button onClick={() => { disconnect({ label: wallet.label }) }>Disconnect</button>
        </div>
    )
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
```

