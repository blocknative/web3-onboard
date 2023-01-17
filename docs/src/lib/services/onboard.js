import bnIcon from '$lib/components/icons/bnWhiteBackground.js'
let onboard
const getOnboard = async () => {
  if (!onboard) {
    onboard = await intiOnboard()
  }
  return onboard
}

const intiOnboard = async () => {
  const { default: Onboard } = await import('@web3-onboard/core')
  const { default: injectedModule } = await import('@web3-onboard/injected-wallets')
  const { default: trezorModule } = await import('@web3-onboard/trezor')
  const { default: ledgerModule } = await import('@web3-onboard/ledger')
  const { default: walletConnectModule } = await import('@web3-onboard/walletconnect')
  const { default: coinbaseModule } = await import('@web3-onboard/coinbase')
  const { default: dcentModule } = await import('@web3-onboard/dcent')
  const { default: portisModule } = await import('@web3-onboard/portis')
  const { default: magicModule } = await import('@web3-onboard/magic')
  const { default: keystoneModule } = await import('@web3-onboard/keystone')
  const { default: fortmaticModule } = await import('@web3-onboard/fortmatic')
  const { default: keepkeyModule } = await import('@web3-onboard/keepkey')
  const { default: gnosisModule } = await import('@web3-onboard/gnosis')
  const { default: sequenceModule } = await import('@web3-onboard/sequence')
  const { default: tallyModule } = await import('@web3-onboard/tallyho')
  const { default: enkryptModule } = await import('@web3-onboard/enkrypt')
  const { default: mewWalletModule } = await import('@web3-onboard/mew-wallet')
  const { default: torusModule } = await import('@web3-onboard/torus')
  const { default: web3authModule } = await import('@web3-onboard/web3auth')
  const { default: uauthModule } = await import('@web3-onboard/uauth')
  const INFURA_ID = '8b60d52405694345a99bcb82e722e0af'

  const injected = injectedModule()
  const coinbase = coinbaseModule()
  const dcent = dcentModule()
  const walletConnect = walletConnectModule()
  const ledger = ledgerModule()
  const keystone = keystoneModule()
  const keepkey = keepkeyModule()
  const gnosis = gnosisModule()
  const sequence = sequenceModule()
  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()
  const tally = tallyModule()
  const torus = torusModule()

  const portis = portisModule({
    apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
  })

  const fortmatic = fortmaticModule({
    apiKey: 'pk_test_886ADCAB855632AA'
  })

  const web3auth = web3authModule({
    clientId:
      'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
  })

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com'
  }
  const trezor = trezorModule(trezorOptions)

  const uauthOptions = {
    clientID: 'a25c3a65-a1f2-46cc-a515-a46fe7acb78c',
    redirectUri: 'http://localhost:8080/',
    scope:
      'openid wallet email:optional humanity_check:optional profile:optional social:optional'
  }
  const uauth = uauthModule(uauthOptions)
  
  const magic = magicModule({
    apiKey: 'pk_live_02207D744E81C2BA'
  })

  return Onboard({
    wallets: [
      injected,
      walletConnect,
      coinbase,
      ledger,
      trezor,
      gnosis,
      uauth,
      tally,
      torus,
      sequence,
      web3auth,
      dcent,
      enkrypt,
      mewWallet,
      magic,
      fortmatic,
      keystone,
      keepkey,
      portis
    ],
    chains: [
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
        id: '0x89',
        token: 'MATIC',
        label: 'Polygon',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
      },
      {
        id: '0xfa',
        token: 'FTM',
        label: 'Fantom',
        rpcUrl: 'https://rpc.ftm.tools/'
      },
      {
        id: '0xA',
        token: 'OETH',
        label: 'Optimism',
        rpcUrl: 'https://mainnet.optimism.io'
      },
      {
        id: '0x150',
        token: 'SDN',
        label: 'Shiden',
        rpcUrl: 'https://evm.shiden.astar.network'
      },
      {
        id: '0x250',
        token: 'ASTR',
        label: 'Astar',
        rpcUrl: 'https://evm.astar.network'
      },
      {
        id: '0x51',
        token: 'SBY',
        label: 'Shibuya',
        rpcUrl: 'https://evm.shibuya.astar.network'
      },
      {
        id: '0xA4B1',
        token: 'ARB-ETH',
        label: 'Arbitrum',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      }
    ],
    appMetadata: {
      name: 'Documentation',
      icon: bnIcon,
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    },
    accountCenter: { desktop: { enabled: true }, mobile: { enabled: true } }
  })
}

export default getOnboard
