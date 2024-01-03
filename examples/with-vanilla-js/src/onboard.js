import Onboard from '@web3-onboard/core'
import injectedWalletsModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import bitgetModule from '@web3-onboard/bitget'

const injected = injectedWalletsModule()
const walletConnect = walletConnectModule({})
const coinbaseWallet = coinbaseModule()
const bitgetWallet = bitgetModule()

const wallets = [injected, walletConnect, bitgetWallet, coinbaseWallet]

const chains = [
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://rpc.flashbots.net`
  },
  {
    id: 137,
    token: 'MATIC',
    label: 'Matic Mainnet',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
  },
  {
    id: '0x2105',
    token: 'ETH',
    label: 'Base',
    rpcUrl: 'https://mainnet.base.org'
  }
]

const appMetadata = {
  name: 'Web3-Onboard Vanilla JS Demo',
  icon: '<svg />',
  logo: '<svg />',
  description: 'Demo using Onboard',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' }
  ]
}
let onboard

if (!onboard) {
  onboard = Onboard({
    wallets,
    chains,
    appMetadata
  })
}

export default onboard
