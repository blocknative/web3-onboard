<script lang="ts">
  import Onboard from '@web3-onboard/core'
  import injectedModule from '@web3-onboard/injected-wallets'
  import trezorModule from '@web3-onboard/trezor'
  import ledgerModule from '@web3-onboard/ledger'
  import walletConnectModule from '@web3-onboard/walletconnect'
  import coinbaseModule from '@web3-onboard/coinbase'
  import dcentModule from '@web3-onboard/dcent'
  import portisModule from '@web3-onboard/portis'
  import magicModule from '@web3-onboard/magic'
  import keystoneModule from '@web3-onboard/keystone'
  import fortmaticModule from '@web3-onboard/fortmatic'
  import keepkeyModule from '@web3-onboard/keepkey'
  import gnosisModule from '@web3-onboard/gnosis'
  // import torusModule from '@web3-onboard/torus'
  import uauthModule from '@web3-onboard/uauth'
  // import sequenceModule from '@web3-onboard/sequence'
  import tallyModule from '@web3-onboard/tallyho'
  import enkryptModule from '@web3-onboard/enkrypt'
  import mewWalletModule from '@web3-onboard/mew-wallet'
  import { onMount } from 'svelte'
  const INFURA_ID = '8b60d52405694345a99bcb82e722e0af'

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

  // const torus = torusModule()
  const ledger = ledgerModule()
  const keystone = keystoneModule()
  const keepkey = keepkeyModule()
  const gnosis = gnosisModule()
  // const sequence = sequenceModule()
  const tally = tallyModule()

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com'
  }

  const trezor = trezorModule(trezorOptions)

  const magic = magicModule({
    apiKey: 'pk_live_02207D744E81C2BA'
  })

  // const web3auth = web3authModule({
  //   clientId:
  //     'DJuUOKvmNnlzy6ruVgeWYWIMKLRyYtjYa9Y10VCeJzWZcygDlrYLyXsBQjpJ2hxlBO9dnl8t9GmAC2qOP5vnIGo'
  // })

  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()

  const onboard = Onboard({
    wallets: [
      // keepkey,
      // sequence,
      // web3auth,
      // torus,
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
      icon: '<svg></svg>',
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    },
    accountCenter: { desktop: { enabled: true }, mobile: { enabled: true } }
  })

  let connecting = false

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets')

  async function connectWallet() {
    console.log('click')
    if ($wallets$?.[0]?.provider) {
      onboard.disconnectWallet({ label: $wallets$?.[0]?.label })
    } else {
      connecting = true
      console.log('connecting')
      await onboard.connectWallet()
      connecting = false
    }
  }

  $: buttonText = $wallets$?.[0]?.provider ? 'Disconnect' : connecting ? 'Connecting' : 'Connect'

  onMount(() => {
    const uauthOptions = {
      clientID: '4d88178c-07c5-420c-99dc-c1b3a73aeb7d',
      redirectUri: window.location.href,
      scope: 'openid wallet email:optional humanity_check:optional profile:optional social:optional'
    }
    const uauth = uauthModule(uauthOptions)
    onboard.state.actions.setWalletModules([
      uauth,
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
    ])
  })
</script>

<button
  class="ml-auto rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
  on:click={connectWallet}
>
  {buttonText}
</button>
