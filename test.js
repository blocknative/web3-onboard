const isMobile = () =>
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    navigator.userAgent
  )

const metamaskWallet = isMobile
  ? [{ walletName: 'metamask', preferred: true }]
  : []

const wallets = [
  ...metamaskWallet
  // ... rest of wallets
]

const onboard = Onboard({
  dappId: apiKey, // [String] The API key created by step one above
  networkId: networkId, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: wallet => {
      web3 = new Web3(wallet.provider)
    }
  },
  walletSelect: {
    wallets: wallets
  }
})
