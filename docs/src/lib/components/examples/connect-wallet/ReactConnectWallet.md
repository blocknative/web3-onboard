## Step 1: Import + Configure

Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet.

```js title="App.tsx"|copy
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import fortmaticModule from '@web3-onboard/fortmatic'
import gnosisModule from '@web3-onboard/gnosis'
import injectedModule from '@web3-onboard/injected-wallets'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
import web3authModule from '@web3-onboard/web3auth'
import dcentModule from '@web3-onboard/dcent'
import sequenceModule from '@web3-onboard/sequence'
import tallyHoModule from '@web3-onboard/tallyho'
import trustModule from '@web3-onboard/trust'

const INFURA_KEY = ''

const injected = injectedModule()
const coinbase = coinbaseModule()
const dcent = dcentModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'apiKey'
})

const fortmatic = fortmaticModule({
  apiKey: 'apiKey'
})

const ledger = ledgerModule()
const keystone = keystoneModule()
const keepkey = keepkeyModule()
const gnosis = gnosisModule()
const sequence = sequenceModule()
const tally = tallyModule()
const trust = trustModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  apiKey: 'apiKey'
})

const enkrypt = enkryptModule()
const mewWallet = mewWalletModule()

const wallets = [
  keepkey,
  sequence,
  injected,
  trust,
  tally,
  ledger,
  coinbase,
  dcent,
  trezor,
  walletConnect,
  enkrypt,
  mewWallet,
  gnosis,
  magic,
  fortmatic,
  keystone,
  portis
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
  },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
  }
]

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

```js title="ConnectWallet.tsx"|copy{8,10-19,28-37}
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
