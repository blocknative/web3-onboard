<script lang="ts">
  import type { OnboardAPI, WalletState } from '@web3-onboard/core'
  import bnIcon from '$lib/components/icons/bnWhiteBackground.js'
  const INFURA_ID = '8b60d52405694345a99bcb82e722e0af'
  let onboard: OnboardAPI

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

    const injected = injectedModule()
    const coinbase = coinbaseModule()
    const dcent = dcentModule()
    const walletConnect = walletConnectModule()

    const portis = portisModule({
      apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
    })

    const fortmatic = fortmaticModule({
      apiKey: 'pk_test_886ADCAB855632AA'
    })

    const ledger = ledgerModule()
    const keystone = keystoneModule()
    const keepkey = keepkeyModule()
    const gnosis = gnosisModule()
    const sequence = sequenceModule()
    const tally = tallyModule()

    const trezorOptions = {
      email: 'test@test.com',
      appUrl: 'https://www.blocknative.com'
    }

    const trezor = trezorModule(trezorOptions)

    const magic = magicModule({
      apiKey: 'pk_live_02207D744E81C2BA'
    })

    const enkrypt = enkryptModule()
    const mewWallet = mewWalletModule()

    onboard = Onboard({
      wallets: [
        keepkey,
        sequence,
        injected,
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
    onboard.state.select('wallets').subscribe((wallets) => {
      connectedWallets = wallets
    })
  }
  intiOnboard()

  let connecting = false
  let connectedWallets: WalletState[]

  async function connectWallet() {
    if (!onboard) {
      await intiOnboard()
    }
    if (onboard && connectedWallets?.[0]?.provider) {
      onboard.disconnectWallet({ label: connectedWallets?.[0]?.label })
    }
    if (onboard) {
      connecting = true
      await onboard.connectWallet()
      connecting = false
    }
  }

  $: buttonText =
    onboard && connectedWallets?.[0]?.provider
      ? 'Disconnect'
      : connecting
      ? 'Connecting'
      : 'Connect'
</script>

<button
  class="ml-auto rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
  on:click={() => connectWallet()}
>
  {buttonText}
</button>
