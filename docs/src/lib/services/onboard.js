import blocknativeIcon from '../components/icons/blocknative-icon'

let onboard
const getOnboard = async (passedTheme) => {
  const key = 'svelteness::color-scheme'
  const scheme = localStorage[key]
  let theme = passedTheme || scheme
  classMutationListener()
  onboard = await intiOnboard(theme)
  return onboard
}

const classMutationsCheck = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (onboard && mutation.attributeName === 'class') {
      if (mutation.target.className.includes('dark')) {
        onboard.state.actions.updateTheme('dark')
      } else {
        onboard.state.actions.updateTheme('light')
      }
    }
  })
}

const classMutationListener = () => {
  // Listens for class changes on HTML element
  const mutationObserver = new MutationObserver(classMutationsCheck)
  mutationObserver.observe(document.querySelector('html'), { attributes: true })
}

const intiOnboard = async (theme) => {
  const { default: Onboard } = await import('@web3-onboard/core')
  const { default: injectedModule } = await import('@web3-onboard/injected-wallets')
  const { default: trezorModule } = await import('@web3-onboard/trezor')
  const { default: ledgerModule } = await import('@web3-onboard/ledger')
  const { default: walletConnectModule } = await import('@web3-onboard/walletconnect')
  const { default: infinityWalletModule } = await import('@web3-onboard/infinity-wallet')
  const { default: coinbaseModule } = await import('@web3-onboard/coinbase')
  const { default: metamaskModule } = await import('@web3-onboard/metamask')
  const { default: dcentModule } = await import('@web3-onboard/dcent')
  const { default: portisModule } = await import('@web3-onboard/portis')
  const { default: magicModule } = await import('@web3-onboard/magic')
  const { default: keystoneModule } = await import('@web3-onboard/keystone')
  const { default: fortmaticModule } = await import('@web3-onboard/fortmatic')
  const { default: keepkeyModule } = await import('@web3-onboard/keepkey')
  const { default: gnosisModule } = await import('@web3-onboard/gnosis')
  const { default: sequenceModule } = await import('@web3-onboard/sequence')
  const { default: tahoModule } = await import('@web3-onboard/taho')
  const { default: enkryptModule } = await import('@web3-onboard/enkrypt')
  const { default: mewWalletModule } = await import('@web3-onboard/mew-wallet')
  const { default: torusModule } = await import('@web3-onboard/torus')
  const { default: uauthModule } = await import('@web3-onboard/uauth')
  const { default: trustModule } = await import('@web3-onboard/trust')
  const { default: xdefiModule } = await import('@web3-onboard/xdefi')
  const { default: cedeModule } = await import('@web3-onboard/cede-store')
  const { default: frameModule } = await import('@web3-onboard/frame')
  const { default: arcanaModule } = await import('@web3-onboard/arcana-auth')
  const { default: bloctoModule } = await import('@web3-onboard/blocto')
  const { default: venlyModule } = await import('@web3-onboard/venly')
  const { default: bitgetModule } = await import('@web3-onboard/bitget')
  const { default: capsuleModule, Environment } = await import('@web3-onboard/capsule')
  const { default: particleAuthModule } = await import('@web3-onboard/particle-network')
  const INFURA_ID = '8b60d52405694345a99bcb82e722e0af'

  const injected = injectedModule()
  const infinityWallet = infinityWalletModule()
  const arcanaWallet = arcanaModule({
    clientID: 'xar_test_c9c3bc702eb13255c58dab0e74cfa859711c13cb'
  })
  const coinbase = coinbaseModule()
  const metamask = metamaskModule({
    options: {
      dappMetadata: {
        name: 'Web3Onboard'
      }
    }
  })
  const dcent = dcentModule()
  const walletConnect = walletConnectModule({
    projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
    dappUrl: 'https://onboard.blocknative.com/'
  })
  const ledger = ledgerModule({
    walletConnectVersion: 2,
    projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5'
  })
  const keystone = keystoneModule()
  const keepkey = keepkeyModule()
  const gnosis = gnosisModule()
  const sequence = sequenceModule()
  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()
  const taho = tahoModule()
  const torus = torusModule()
  const trust = trustModule()
  const xdefi = xdefiModule()
  const cede = cedeModule()
  const bitget = bitgetModule()

  const portis = portisModule({
    apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
  })

  const fortmatic = fortmaticModule({
    apiKey: 'pk_test_886ADCAB855632AA'
  })

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com'
  }
  const trezor = trezorModule(trezorOptions)

  const uauthOptions = {
    clientID: 'a25c3a65-a1f2-46cc-a515-a46fe7acb78c',
    redirectUri: 'http://localhost:8080/',
    scope: 'openid wallet email:optional humanity_check:optional profile:optional social:optional',
    walletConnectProjectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5'
  }
  const uauth = uauthModule(uauthOptions)

  const magic = magicModule({
    apiKey: 'pk_live_02207D744E81C2BA'
  })

  const frame = frameModule()

  const blocto = bloctoModule()
  const venly = venlyModule({
    clientId: 'blocknative',
    environment: 'staging'
  })

  const capsule = capsuleModule({
    environment: Environment.DEVELOPMENT,
    apiKey: '992bbd9146d5de8ad0419f141d9a7ca7'
  })

  const particle = particleAuthModule({
    projectId: 'b385ccf0-73c3-485a-9941-159b7855b806',
    clientKey: 'cSTLqhvONB5j588Wz6E5WJLMPrHeUlGbymf1DFhO',
    appId: 'b1f0239a-edb0-41f9-b0f5-ab780bb02a9e'
  })


  return Onboard({
    connect: { autoConnectAllPreviousWallet: true },
    wallets: [
      metamask,
      injected,
      walletConnect,
      coinbase,
      ledger,
      trezor,
      trust,
      gnosis,
      taho,
      bitget,
      xdefi,
      uauth,
      cede,
      arcanaWallet,
      torus,
      sequence,
      dcent,
      enkrypt,
      mewWallet,
      magic,
      fortmatic,
      keystone,
      keepkey,
      portis,
      frame,
      infinityWallet,
      blocto,
      capsule,
      particle,
      // capsule

      // venly
    ],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
        secondaryTokens: [
          {
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#2775C9"/>
              <path d="M7.875 13.75C4.63 13.75 2 11.12 2 7.875C2 4.63 4.63 2 7.875 2C11.12 2 13.75 4.63 13.75 7.875C13.75 9.43315 13.131 10.9275 12.0293 12.0293C10.9275 13.131 9.43315 13.75 7.875 13.75ZM7.525 5.695C7.20355 5.71094 6.89968 5.84646 6.67303 6.07496C6.44638 6.30346 6.31333 6.60843 6.3 6.93C6.3 7.535 6.67 7.93 7.455 8.095L8.005 8.225C8.54 8.35 8.76 8.53 8.76 8.835C8.76 9.14 8.375 9.44 7.875 9.44C7.6974 9.45628 7.5188 9.42225 7.35964 9.34178C7.20048 9.26132 7.06718 9.13767 6.975 8.985C6.94769 8.92707 6.90457 8.87803 6.85061 8.84353C6.79665 8.80903 6.73404 8.79048 6.67 8.79H6.375C6.35231 8.7942 6.33068 8.80285 6.31135 8.81544C6.29202 8.82804 6.27537 8.84433 6.26236 8.86338C6.24935 8.88243 6.24023 8.90387 6.23554 8.92646C6.23084 8.94905 6.23066 8.97234 6.235 8.995C6.30686 9.28828 6.47393 9.54945 6.71007 9.73764C6.94621 9.92583 7.23808 10.0304 7.54 10.035V10.455C7.54 10.5485 7.57714 10.6381 7.64324 10.7043C7.70935 10.7704 7.79901 10.8075 7.8925 10.8075C7.98599 10.8075 8.07565 10.7704 8.14176 10.7043C8.20786 10.6381 8.245 10.5485 8.245 10.455V10.03C8.58639 10.0261 8.91279 9.88913 9.15467 9.64818C9.39655 9.40724 9.53481 9.08137 9.54 8.74C9.54 8.105 9.175 7.74 8.31 7.555L7.81 7.445C7.31 7.32 7.075 7.155 7.075 6.875C7.075 6.595 7.375 6.285 7.875 6.285C8.03247 6.26855 8.19133 6.29804 8.3324 6.36991C8.47348 6.44178 8.59073 6.55295 8.67 6.69C8.70213 6.75844 8.75301 6.81638 8.81672 6.85708C8.88044 6.89779 8.95439 6.91961 9.03 6.92H9.265C9.31843 6.90693 9.3646 6.87342 9.39358 6.82667C9.42257 6.77992 9.43205 6.72367 9.42 6.67C9.35226 6.39922 9.20073 6.15674 8.98704 5.97717C8.77335 5.7976 8.5084 5.69009 8.23 5.67V5.325C8.23 5.23151 8.19286 5.14185 8.12675 5.07574C8.06065 5.00964 7.97099 4.9725 7.8775 4.9725C7.78401 4.9725 7.69435 5.00964 7.62824 5.07574C7.56214 5.14185 7.525 5.23151 7.525 5.325V5.695ZM3.47 7.875C3.47057 8.79603 3.76049 9.69361 4.29879 10.441C4.8371 11.1883 5.59659 11.7477 6.47 12.04H6.54C6.59967 12.04 6.6569 12.0163 6.6991 11.9741C6.74129 11.9319 6.765 11.8747 6.765 11.815V11.71C6.76516 11.6169 6.73769 11.5259 6.68606 11.4485C6.63444 11.371 6.56098 11.3106 6.475 11.275C5.7948 11.0004 5.21217 10.5289 4.80189 9.92084C4.39161 9.3128 4.1724 8.59602 4.1724 7.8625C4.1724 7.12898 4.39161 6.4122 4.80189 5.80416C5.21217 5.19611 5.7948 4.72455 6.475 4.45C6.56058 4.41524 6.63387 4.35577 6.68552 4.27919C6.73717 4.2026 6.76484 4.11237 6.765 4.02V3.905C6.76532 3.87123 6.7575 3.83789 6.74219 3.80779C6.72689 3.77769 6.70455 3.75173 6.67707 3.7321C6.64959 3.71248 6.61779 3.69976 6.58435 3.69505C6.55092 3.69033 6.51684 3.69374 6.485 3.705C5.60798 3.99505 4.84465 4.55405 4.30342 5.30262C3.76218 6.05119 3.47057 6.95126 3.47 7.875ZM12.28 7.875C12.2784 6.95482 11.988 6.05836 11.4497 5.31201C10.9115 4.56566 10.1526 4.00707 9.28 3.715H9.205C9.14267 3.715 9.0829 3.73976 9.03883 3.78383C8.99476 3.8279 8.97 3.88767 8.97 3.95V4.025C8.97202 4.12143 9.00188 4.21523 9.056 4.29507C9.11012 4.37492 9.18617 4.4374 9.275 4.475C9.95365 4.75036 10.5347 5.22195 10.9438 5.82942C11.3529 6.43689 11.5714 7.15262 11.5714 7.885C11.5714 8.61738 11.3529 9.33311 10.9438 9.94058C10.5347 10.5481 9.95365 11.0196 9.275 11.295C9.18787 11.333 9.11337 11.395 9.06024 11.4738C9.0071 11.5527 8.97754 11.645 8.975 11.74V11.825C8.97543 11.8621 8.98462 11.8985 9.00182 11.9313C9.01902 11.9642 9.04375 11.9925 9.07398 12.0139C9.10421 12.0354 9.13909 12.0494 9.17576 12.0548C9.21244 12.0602 9.24987 12.0568 9.285 12.045C10.1583 11.7515 10.9173 11.1911 11.4547 10.4428C11.9921 9.69451 12.2808 8.79627 12.28 7.875Z" fill="white"/>
              </svg>`
          }
        ]
      },
      {
        id: 11155111,
        token: 'ETH',
        label: 'Sepolia',
        rpcUrl: 'https://rpc.sepolia.org/'
      },
      {
        id: 42161,
        token: 'ETH',
        label: 'Arbitrum One',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      },
      {
        id: '0xa4ba',
        token: 'ETH',
        label: 'Arbitrum Nova',
        rpcUrl: 'https://nova.arbitrum.io/rpc'
      },
      {
        id: '0x2105',
        token: 'ETH',
        label: 'Base',
        rpcUrl: 'https://mainnet.base.org'
      },
      {
        id: '0x89',
        token: 'MATIC',
        label: 'Polygon',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
      },
      {
        id: '0x38',
        token: 'BNB',
        label: 'Binance',
        rpcUrl: 'https://bsc-dataseed.binance.org/'
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
        label: 'OP Mainnet',
        rpcUrl: 'https://mainnet.optimism.io'
      },
      {
        id: 666666666,
        token: 'DEGEN',
        label: 'Degen',
        rpcUrl: 'https://rpc.degen.tips'
      }
    ],
    appMetadata: {
      name: 'Web3 Onboard Documentation',
      icon: blocknativeIcon,
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ],
      explore: 'https://onboard.blocknative.com/'
    },
    accountCenter: { desktop: { enabled: true }, mobile: { enabled: true } },
    theme: theme || 'system',
    apiKey: 'da1b962d-314d-4903-bfe1-426821d14a35'
  })
}

export default getOnboard
