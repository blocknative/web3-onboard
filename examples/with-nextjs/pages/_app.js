import '../styles/globals.css'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const INFURA_KEY = ''

const ethereumSepolia = {
  id: 11155111,
  token: 'ETH',
  label: 'Sepolia',
  rpcUrl: 'https://rpc.sepolia.org/'
}

const polygonMainnet = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
}
const baseMainnet = {
  id: '0x2105',
  token: 'ETH',
  label: 'Base',
  rpcUrl: 'https://mainnet.base.org'
}
const celoMainnet = {
  id: '0xa4ec',
  token: 'ETH',
  label: 'Celo',
  rpcUrl: 'https://1rpc.io/celo'
},
{
  id: 666666666,
  token: 'DEGEN',
  label: 'Degen',
  rpcUrl: 'https://rpc.degen.tips'
}

const chains = [ethereumRopsten, polygonMainnet, baseMainnet,celoMainnet]
const wallets = [injectedModule()]

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: 'Web3-Onboard Demo',
    icon: '<svg>My App Icon</svg>',
    description: 'A demo of Web3-Onboard.'
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
  )
}

export default MyApp
