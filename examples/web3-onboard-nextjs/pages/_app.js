import '../styles/globals.css'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()

const INFURA_KEY = '186cde1cc4ec45fdac45b9e7c120c34c'

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ropsten',
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`
}

const polygonMumbai = {
  id: '0x13881',
  token: 'MATIC',
  label: 'Mumbai',
  rpcUrl: 'https://matic-mumbai.chainstacklabs.com	'
}

const web3Onboard = init({
  wallets: [injected],
  chains: [ethereumRopsten, polygonMumbai],
  appMetadata: {
    name: 'Web3-Onboard Demo',
    icon: '<svg></svg>',
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
