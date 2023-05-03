<script>
  import Onboard from '@web3-onboard/core'
  import fortmaticModule from '@web3-onboard/fortmatic'
  import gnosisModule from '@web3-onboard/gnosis'
  import infinityWalletModule from '@web3-onboard/infinity-wallet'
  import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
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
  import gas from '@web3-onboard/gas'
  import dcentModule from '@web3-onboard/dcent'
  import sequenceModule from '@web3-onboard/sequence'
  import tallyHoModule from '@web3-onboard/tallyho'
  import xdefiWalletModule from '@web3-onboard/xdefi'
  import zealModule from '@web3-onboard/zeal'
  import transactionPreviewModule from '@web3-onboard/transaction-preview'
  import enkryptModule from '@web3-onboard/enkrypt'
  import mewWalletModule from '@web3-onboard/mew-wallet'
  import uauthModule from '@web3-onboard/uauth'
  import phantomModule from '@web3-onboard/phantom'
  import trustModule from '@web3-onboard/trust'
  import frontierModule from '@web3-onboard/frontier'
  import cedeStoreModule from '@web3-onboard/cede-store'
  import {
    recoverAddress,
    arrayify,
    hashMessage,
    verifyTypedData
  } from 'ethers/lib/utils'
  import { ethers } from 'ethers'
  import { share } from 'rxjs/operators'
  import VConsole from 'vconsole'

  if (window.innerWidth < 700) {
    new VConsole()
  }

  const apiKey = '7ed5f4aa-fb90-4124-8ef9-f69e3e8e666d'
  const infura_key = '80633e48116943128cbab25e402764ab'

  let defaultTransactionObject = JSON.stringify(
    {
      from: '0xD87927847330FC926afd2B66C478A42a004aB4e7',
      to: '0xd0d6d6c5fe4a677d343cc433536bb717bae167dd',
      value: '0xf4240',
      data: '0xa',
      chainId: 1,
      nonce: '0x0',
      maxFeePerGas: '0x14',
      maxPriorityFeePerGas: '0x0',
      gasLimit: '0x14'
    },
    undefined,
    4
  )

  let transactionObject = defaultTransactionObject
  let signMsg = 'Any string message'

  const injected = injectedModule({
    custom: [
      // include custom (not natively supported) injected wallet modules here
    ]
    // display all wallets even if they are unavailable
    // displayUnavailable: true
    // but only show Binance and Bitski wallet if they are available
    // filter: {
    //   [ProviderLabel.Binance]: 'unavailable',
    //   [ProviderLabel.Bitski]: 'unavailable'
    // }
    // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
    // sort: wallets => {
    //   const metaMask = wallets.find(
    //     ({ label }) => label === ProviderLabel.MetaMask
    //   )
    //   const coinbase = wallets.find(
    //     ({ label }) => label === ProviderLabel.Coinbase
    //   )

    //   return (
    //     [
    //       metaMask,
    //       coinbase,
    //       ...wallets.filter(
    //         ({ label }) =>
    //           label !== ProviderLabel.MetaMask &&
    //           label !== ProviderLabel.Coinbase
    //       )
    //     ]
    //       // remove undefined values
    //       .filter(wallet => wallet)
    //   )
    // }
    // walletUnavailableMessage: wallet => `Oops ${wallet.label} is unavailable!`
  })

  const coinbaseWallet = coinbaseModule()

  const walletConnect = walletConnectModule({
    connectFirstChainId: true,
    version: 2,
    handleUri: uri => console.log(uri),
    projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
    qrcodeModalOptions: {
      mobileLinks: [
        'rainbow',
        'metamask',
        'argent',
        'trust',
        'imtoken',
        'pillar'
      ]
    }
  })
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

  const torus = torusModule()
  const infinityWallet = infinityWalletModule()
  const ledger = ledgerModule()
  const keepkey = keepkeyModule()
  const keystone = keystoneModule()
  const gnosis = gnosisModule()
  const tallyho = tallyHoModule()
  const xdefi = xdefiWalletModule()
  const zeal = zealModule()
  const phantom = phantomModule()
  const trust = trustModule()
  const frontier = frontierModule()
  const cedeStore = cedeStoreModule()

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com'
    // containerElement: '#sample-container-el'
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
    // userEmail: 'test@test.com'
    // userEmail is optional - if user has already logged in and/or session is still active a login modal will not appear
    // for more info see the @web3-onboard/magic docs
  })

  const dcent = dcentModule()
  const sequence = sequenceModule()
  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()
  const transactionPreview = transactionPreviewModule({
    requireTransactionApproval: true
  })

  const onboard = Onboard({
    wallets: [
      injected,
      ledger,
      trezor,
      walletConnect,
      infinityWallet,
      trust,
      enkrypt,
      mewWallet,
      keepkey,
      keystone,
      coinbaseWallet,
      magic,
      fortmatic,
      portis,
      torus,
      gnosis,
      dcent,
      sequence,
      tallyho,
      uauth,
      web3auth,
      zeal,
      frontier,
      phantom,
      xdefi,
      cedeStore
    ],
    transactionPreview,
    gas,
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        tokens: [
          {
            address: '0x111111111117dc0aa78b770fa6a738034120c302',
            name: '1inch',
            icon: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" transform="matrix(.381985 0 0 .381985 145.038 72.9536)"><path d="m168.2 366.5 18.7-140.5-162.2-112.6 148.2 50.2 35-53.7 127.8-79.3 281.7 155.2 14.6 236.8-125.5 174.4-99.2 15.2 51.3-93.9v-90.4l-37.3-70.6-37.9-25.1-58.3 60.1v63.6l-45.5 42.6-57.8 7-25.6 14.5-42-13.4-17.5-63 31.5-44.3z" fill="#fff"/><path d="m427.2 112.2c-30.9-6.4-64.7-4.7-64.7-4.7s-11.1 51.3-79.9 64.8c.5 0 90.9 30.9 144.6-60.1z" fill="#94a6c3"/><path d="m455.2 577.7c37.3-29.2 65.3-69.4 78.2-114.9.6-1.7 5.8-4.7 9.3-7 5.8-3.5 11.7-6.4 12.8-11.1 2.3-13.4 3.5-27.4 3.5-41.4 0-5.2-5.3-10.5-10.5-15.7-4.1-3.5-8.2-7.6-8.2-10.5-5.8-53.1-30.3-102.7-69.4-138.8l-4.1 4.1c37.9 35.6 62.4 84 67.7 135.3.6 4.7 5.2 9.3 9.9 14 4.1 3.5 8.8 8.8 8.8 11.1 0 13.4-1.2 26.8-3.5 40.2-.6 2.3-5.8 4.7-9.9 7-5.8 2.9-11.1 5.8-12.2 10.5-14 49.6-46.1 92.8-88.7 120.8 7.6-16.3 31.5-69.4 44.3-96.3l-2.3-86.3-74.1-71.7-42 5.8-46.1 74.7s21.6 27.4-8.8 59.5c-29.7 31.5-53.1 38.5-53.1 38.5l-21.6-11.7c6.4-8.2 19.3-20.4 29.2-28.6 16.9-14 33.8-15.2 33.8-30.3.7-31.6-33.2-22.9-33.2-22.9l-12.3 11.7-5.2 43.2-25.6 32.1-2.9-.6-42-9.3s25.7-13.4 29.8-28.6c4.1-14.6-8.2-63-8.8-65.9.6.6 12.3 10.5 17.5 26.8 9.3-25.7 21.6-50.2 25.1-52.5s50.7-27.4 50.7-27.4l-15.7 41.4 11.7-6.4 28-68.8s27.4-13.4 47.8-13.4c36.7-.6 91-45.5 66.5-126 7 2.9 128.3 63.6 149.3 182.6 15.7 91.5-36.2 177.2-123.7 226.8z" fill="#94a6c3"/><g fill="#1b314f"><path d="m316.4 125c13.4-15.8 8.2-39.1 8.2-39.1l-39.1 57.8c-.6 0 13.9.6 30.9-18.7z"/><path d="m185.1 440.6 4.7-23.3s-19.3 33.8-21 38.5c-1.8 5.3 1.2 14.6 8.7 14 7.6-.6 16.9-11.7 16.9-19.8 0-10.5-9.3-9.4-9.3-9.4z"/><path d="m531.6 69.6s29.2 1.2 59.5 4.7c-68.3-53.7-133-69.4-185.5-69.4-72.3 0-121.3 29.8-124.3 31.5l22.8-36.2s-91-8.8-123.1 87.5c-8.2-20.4-15.7-50.2-15.7-50.2s-47.3 41.5-25.1 110.3c-54.3-19.8-131.8-47.3-134.8-47.8-4.1-.6-5.3 1.2-5.3 1.2s-1.2 1.7 2.3 4.7c6.5 5.1 129 95.6 155.9 113.1-5.8 21-5.8 30.9 0 40.8 8.2 13.4 8.7 20.4 7.6 30.3-1.2 9.9-11.7 95.7-14 106.2s-26.8 47.8-25.7 58.9c1.2 11.1 16.3 58.3 29.8 63.6 9.9 3.5 34.4 11.1 50.7 11.1 5.8 0 11.1-1.2 13.4-3.5 9.9-8.7 12.8-10.5 19.8-10.5h1.7c2.9 0 6.4.6 10.5.6 9.3 0 21.6-1.8 30.3-9.9 12.8-12.8 35-30.3 42-38.5 8.8-11.1 13.4-26.2 11.1-41.4-1.8-14 5.8-26.3 14.6-38.5 11.1-14.6 31.5-40.8 31.5-40.8 40.3 30.2 65.4 76.3 65.4 127.6 0 91-79.3 164.5-177.3 164.5-15.2 0-29.7-1.7-44.3-5.2 44.9 15.7 82.8 21 113.8 21 65.9 0 100.9-23.9 100.9-23.9s-12.2 15.8-32.1 33.8h.6c109.1-15.2 162.2-105 162.2-105s-4.1 29.2-9.3 49c145.1-109.1 120.6-245.6 120-250.2 1.2 1.7 15.8 19.2 23.3 28.6 23.4-240.4-173.2-318-173.2-318zm-223.4 383.9c-2.3 2.9-12.2 11.7-19.2 18.1s-14.6 12.8-20.4 18.7c-2.3 2.3-7 3.5-14 3.5h-17.5c8.8-11.7 34.4-38.5 43.2-44.3 10.5-7 15.8-14 9.3-26.2-6.4-12.3-23.3-9.3-23.3-9.3s9.9-4.1 18.7-4.1c-11.1-2.9-25.1 0-31.5 6.4-7 6.4-5.8 29.2-8.7 43.7-2.9 15.2-12.8 22.8-28 36.8-8.2 7.6-14 9.9-18.7 9.9-9.9-1.7-21.6-4.7-29.8-7.6-5.8-7.6-14.6-32.7-16.9-43.2 1.7-5.8 8.7-18.1 12.2-25.1 7-13.4 11.1-21 12.3-28 2.3-9.9 9.9-71.2 12.8-96.8 7.6 9.9 18.1 26.3 15.7 36.8 16.9-23.9 4.7-47.3-1.2-56.6-5.2-9.3-12.2-28-6.4-47.8s26.8-74.7 26.8-74.7 7 12.3 16.9 9.9c9.9-2.3 89.8-122.5 89.8-122.5s21.6 47.2-1.2 81.7c-23.3 34.4-46.1 40.8-46.1 40.8s32.1 5.8 61.8-15.8c12.2 28.6 23.9 58.3 24.5 62.4-1.8 4.1-25.1 60.1-27.4 63.6-1.2 1.2-9.3 3.5-15.2 4.7-9.9 2.9-15.7 4.7-18.1 6.4-4.1 3.5-22.8 54.8-31.5 79.9-10.5 2.9-21 8.8-28.6 20.4 4.1-2.9 16.9-4.7 26.3-5.8 8.2-.6 33.2 12.8 39.7 37.9v1.2c1.3 9.2-1.6 18-6.3 25zm-54.8 7c5.3-7.6 4.7-20.4 5.3-24.5s1.7-11.7 6.4-12.8c4.7-1.2 15.8.6 15.8 8.7 0 7.6-8.2 9.3-14 14.6-4.2 4-12.4 12.8-13.5 14zm232.7-111.5c5.8-29.7 6.4-55.4 4.7-76.4 22.7 30.3 36.7 67.1 40.8 105 .6 4.7 5.2 9.3 9.9 14 4.1 3.5 8.8 8.2 8.8 11.1 0 13.4-1.2 26.8-3.5 40.3-.6 1.7-5.8 4.7-9.9 7-5.8 2.9-11.1 5.8-12.2 10.5-12.8 44.9-40.3 84.6-77 112.6 54.2-56.6 80.4-150 38.4-224.1zm-36.7 229.3c37.9-29.2 67.1-70 79.9-116.1.6-1.7 5.8-4.7 9.3-7 5.8-2.9 11.7-6.4 12.8-11.1 2.3-13.4 3.5-27.4 3.5-41.4 0-5.2-5.3-10.5-10.5-15.7-2.9-3.5-7.6-7.6-7.6-10.5-4.7-42.6-21.6-82.8-47.8-116.1-11.7-70-58.3-91.6-59.5-92.2 1.2 1.8 31.5 45.5 10.5 96.8-21.6 51.9-77 43.8-81.7 44.3-4.7 0-22.7 23.3-45.5 66.5-2.9-1.2-15.2-4.1-29.2-1.7 10.5-29.2 26.3-70.6 29.2-74.1 1.2-1.2 9.9-3.5 15.8-5.2 11.1-2.9 16.3-4.7 18.1-7 1.2-1.8 7-15.2 12.8-29.2 5.3 0 18.7-1.2 19.8-1.8 1.2-1.2 12.3-29.7 12.3-33.2 0-2.9-22.8-59.5-31.5-81.1 4.1-4.7 8.2-10.5 12.2-16.9 119.6 12.9 213 114.4 213 237.4 0 94.5-55.4 176.8-135.9 215.3z"/><path d="m294.2 263.3c11.1-12.8 5.3-36.7-15.2-40.8 5.3-12.2 12.8-36.7 12.8-36.7s-59.5 93.3-64.7 95.1c-5.3 1.8-10.5-18.7-10.5-18.7-11.1 42.6 18.7 48.4 22.2 35 16.3-4.2 44.3-21.7 55.4-33.9z"/></g><path d="m243.4 286 30.3-51.9s17.5 8.8 8.7 22.8c-11 16.3-39 29.1-39 29.1z" fill="#ffd923"/><g fill="#d82122"><path d="m618.5 526.4c-8.8 11.7-18.7 23.9-30.3 35.6 75.2-144.7 3.5-277.1.6-282.3 5.3 5.3 10.5 11.1 15.2 16.3 57.7 64.1 64.7 160.4 14.5 230.4z"/><path d="m688.5 340.3c-26.3-70.6-63.6-130.7-145.8-184.9-79.3-52.5-164.5-48.4-169.2-47.8h-1.2c2.9-1.2 5.8-1.8 8.7-2.3 18.1-5.8 41.4-10.5 64.8-13.4 61.9-8.9 124.3 12.1 166.9 57.1.6.6.6.6 1.2 1.2 48.4 51.3 73.5 115.4 74.6 190.1z"/><path d="m524 51.5c-86.9-16.3-142.9-8.2-183.2 7-1.2-4.7-5.3-14-8.8-21.6-12.1 14.6-25 32.1-33.1 43.2-22.2 15.2-31.5 29.8-31.5 29.8 12.8-43.8 50.2-76.4 95.7-84.6 12.8-2.3 26.8-3.5 42-3.5 40.2.6 80.4 10.5 118.9 29.7z"/><path d="m202.6 163.5c-68.2-2.3-45.5-81.7-44.3-86.3 0 .6 4.6 62.4 44.3 86.3z"/><path d="m269.7 20.6c-52.5 31.5-42 106.7-42 106.7-50.2-76.3 37.9-104.9 42-106.7z"/></g><path d="m183.4 184.5c3.5 2.9 7 8.2 2.9 15.8-2.3 4.1-5.8 3.5-11.1 1.2-7-3.5-49-28-86.9-53.1 43.2 15.2 86.9 31.5 93.9 35 0 0 .6.6 1.2 1.1z" fill="#fff"/></g></svg>'
          },
          {
            address: '0x1d37986f252d0e349522ea6c3b98cb935495e63e',
            name: 'chart',
            icon: 'https://chartex.pro/static/media/chartex-logo-text.6a4fdd53.svg'
          }
        ],
        label: 'Ethereum',
        rpcUrl: `https://mainnet.infura.io/v3/${infura_key}`
      },
      {
        id: 11155111,
        token: 'ETH',
        label: 'Sepolia',
        rpcUrl: 'https://rpc.sepolia.org/'
      },
      {
        id: '0x5',
        token: 'ETH',
        label: 'Goerli',
        rpcUrl: `https://goerli.infura.io/v3/${infura_key}`
      },
      {
        id: '0x13881',
        token: 'MATIC',
        label: 'Polygon - Mumbai',
        rpcUrl: 'https://matic-mumbai.chainstacklabs.com	'
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
        id: 10,
        token: 'OETH',
        label: 'Optimism',
        rpcUrl: 'https://mainnet.optimism.io'
      },
      {
        id: 42161,
        token: 'ARB-ETH',
        label: 'Arbitrum',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      }
    ],
    connect: {
      // disableClose: true,
      autoConnectLastWallet: true,
      autoConnectAllPreviousWallet: true
    },
    appMetadata: {
      name: 'Blocknative',
      // icon: blocknativeIcon,
      // logo: blocknativeLogo,
      description: 'Demo app for Onboard V2',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ],
      agreement: {
        version: '1.0.0',
        termsUrl: 'https://www.blocknative.com/terms-conditions',
        privacyUrl: 'https://www.blocknative.com/privacy-policy'
      },
      gettingStartedGuide: 'https://blocknative.com',
      explore: 'https://blocknative.com'
    },
    // // example customizing account center
    accountCenter: {
      desktop: {
        position: 'topRight',
        enabled: true,
        minimal: false
      }
    },
    // example customizing copy
    i18n: {
      en: {
        connect: {
          connectingWallet: {
            paragraph:
              '{wallet, select, MetaMask {{wallet} can only present one account, so connect just the one account you want.} other {Please connect to all of your accounts in {wallet}.}}'
          }
        }
      }
    },
    notify: {
      desktop: {
        enabled: true,
        transactionHandler: transaction => {
          console.log({ transaction })
          if (transaction.eventCode === 'txConfirmed') {
            return {
              autoDismiss: 0
            }
          }
          // if (transaction.eventCode === 'txPool') {
          //   return {
          //     type: 'hint',
          //     message: 'Your in the pool, hope you brought a towel!',
          //     autoDismiss: 0,
          //     link: `https://goerli.etherscan.io/tx/${transaction.hash}`
          //   }
          // }
        },
        position: 'topRight'
      }
    },
    // containerElements: {
    // // El must be present at time of JS script execution
    // // See ../public/index.html for element example
    //   connectModal: '#sample-container-el',
    //   accountCenter: '#sample-container-el2'
    // },
    // Sign up for your free api key at www.Blocknative.com
    apiKey,
    theme: 'system'
  })

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets').pipe(share())
  wallets$.subscribe(wallet => {
    console.log(wallet)
    const unstoppableUser = wallet.find(
      provider => provider.label === 'Unstoppable'
    )
    if (unstoppableUser) console.log(unstoppableUser.instance.user)
    const wc = wallet.find(provider => provider.label === 'WalletConnect')
    if (wc) console.log(wc)
  })

  const signTransactionMessage = async provider => {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()

    const signature = await signer.signTransaction({
      to: '',
      value: 100000000000000
    })

    console.log(signature)
  }

  let toAddress
  const sendTransaction = async provider => {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()

    const popTransaction = await signer.populateTransaction({
      to: toAddress,
      value: 10000000000000
    })

    const txn = await signer.sendTransaction(popTransaction)

    const receipt = await txn.wait()
    console.log(receipt)
  }

  const sendTransactionWithPreFlight = async (provider, balance) => {
    await onboard.setChain({ chainId: '0x5' })

    const balanceValue = Object.values(balance)[0]
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()
    const txDetails = {
      to: toAddress,
      value: 100000000000000
    }

    const sendTransaction = () => {
      return signer.sendTransaction(txDetails).then(tx => tx.hash)
    }

    const gasPrice = () =>
      ethersProvider.getGasPrice().then(res => res.toString())

    const estimateGas = () => {
      return ethersProvider.estimateGas(txDetails).then(res => res.toString())
    }

    const transactionHash = await onboard.state.actions.preflightNotifications({
      sendTransaction,
      gasPrice,
      estimateGas,
      balance: balanceValue,
      txDetails: txDetails
    })

    console.log(transactionHash)
  }

  const signMessage = async (provider, address) => {
    // if using ethers v6 this is:
    // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider?.getSigner()
    const addr = await signer?.getAddress()
    const signature = await signer?.signMessage(signMsg)

    const recoveredAddress = recoverAddress(
      arrayify(hashMessage(signMsg)),
      signature
    )

    if (recoveredAddress !== address) {
      console.error(
        "Signature failed. Recovered address doesn' match signing address."
      )
    }

    console.log({ signMsg, signature, recoveredAddress, addr })
  }

  let typedMsg = JSON.stringify(
    {
      domain: {
        chainId: '0x5',
        name: 'Web3-Onboard Test App',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1'
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'
          ]
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000'
            ]
          }
        ]
      },
      primaryType: 'Message',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' }
        ],
        Message: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' }
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' }
        ]
      }
    },
    undefined,
    2
  )
  const signTypedMessage = async (provider, address) => {
    await onboard.setChain({ chainId: '0x5' })
    const signature = await provider.request({
      method: 'eth_signTypedData_v4',
      params: [address, typedMsg]
    })
    const { domain, types, message } = JSON.parse(typedMsg)

    delete types.EIP712Domain
    console.log(verifyTypedData(domain, types, message, signature))
  }

  const themes = ['system', 'default', 'light', 'dark']
  let selectedTheme = 'system'
  const updateTheme = () => {
    onboard.state.actions.updateTheme(selectedTheme)
  }
</script>

<style>
  main {
    height: 100%;
  }
  button {
    width: 14rem;
    margin: 8px;
  }
  .connected-wallet {
    padding: 1rem;
    border-radius: 4px;
    margin: 0.5rem;
    border: 1px solid gray;
  }

  .flex-centered {
    display: flex;
    align-items: center;
  }

  .account-info div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .text-input {
    width: 18rem;
  }

  .sign-transaction {
    display: flex;
    align-items: end;
  }

  .sign-transaction-textarea {
    width: 24rem;
    height: 12rem;
    margin: 0;
  }
  .notify-chain-container {
    display: flex;
    flex-wrap: wrap;
  }
  .switch-chain-container,
  .notify-action-container {
    display: flex;
    flex-direction: column;
    width: 15rem;
  }
</style>

<main>
  <div class="cta">
    <button on:click={() => onboard.connectWallet()} id="connectBtn"
      >Connect Wallet</button
    >
    <select bind:value={selectedTheme} on:change={() => updateTheme()}>
      {#each themes as theme}
        <option value={theme}>
          {theme}
        </option>
      {/each}
    </select>
    {#if $wallets$}
      <button
        class="updateBalanceBtn"
        on:click={() => {
          // Only necessary if a Blocknative API key is not provided and notify is disabled
          onboard.state.actions.updateBalances()
        }}>Update Wallet Balance</button
      >
      <div class="notify-chain-container">
        <div class="notify-action-container">
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                type: 'hint',
                message: 'This is a custom DApp hint',
                autoDismiss: 0
              })}>Send Hint Notification</button
          >
          <button
            on:click={() => {
              const { update, dismiss } =
                onboard.state.actions.customNotification({
                  type: 'pending',
                  message:
                    'This is a custom DApp pending notification to use however you want',
                  autoDismiss: 0
                })
              setTimeout(
                () =>
                  update({
                    eventCode: 'dbUpdateSuccess',
                    message: 'Updated status for custom notification',
                    type: 'success',
                    autoDismiss: 0
                  }),
                4000
              )
            }}>Send Success Notification</button
          >
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                message:
                  'This is a custom DApp success notification to use however you want',
                autoDismiss: 0,
                type: 'pending'
              })}>Send Pending Notification</button
          >
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                type: 'error',
                message:
                  'This is a custom DApp Error notification to use however you want',
                autoDismiss: 0
              })}>Send Error Notification</button
          >
          <button
            on:click={() =>
              onboard.state.actions.customNotification({
                message:
                  'This is a custom non-descript DApp notification to use however you want',
                autoDismiss: 0
              })}>Send DApp Notification</button
          >
        </div>
        <div class="switch-chain-container">
          <button on:click={() => onboard.setChain({ chainId: '0x1' })}
            >Set Chain to Mainnet</button
          >
          <button on:click={() => onboard.setChain({ chainId: '0x5' })}
            >Set Chain to Goerli</button
          >
          <button on:click={() => onboard.setChain({ chainId: '0x89' })}
            >Set Chain to Matic</button
          >
          <button on:click={() => onboard.updateChain({ chainId: 10 })}
            >Set Chain to Optimism</button
          >
        </div>
      </div>
    {/if}
  </div>
  {#if $wallets$}
    {#each $wallets$ as { icon, label, accounts, chains, provider, instance }}
      <div class="connected-wallet">
        <div class="flex-centered" style="width: 10rem;">
          <div style="width: 2rem; height: 2rem">{@html icon}</div>
          <span>{label}</span>
        </div>

        <div>Chains: {JSON.stringify(chains, null, 2)}</div>

        {#each accounts as { address, ens, uns, balance }}
          <div
            class="account-info"
            style="margin-top: 0.25rem; margin-bottom: 0.25rem; padding: 0.25rem; border: 1px solid gray;"
          >
            <div>Address: {address}</div>
            {#if balance}
              <div>Balances:</div>
              {#each Object.entries(balance) as [token, amount]}
                <div style="margin-left: 1rem;">{token}: {amount}</div>
              {/each}
            {/if}

            {#if ens}
              <div>ENS Name: {(ens && ens.name) || ''}</div>
            {/if}

            {#if uns}
              <div>UNS Name: {(uns && uns.name) || ''}</div>
            {/if}

            {#if label === 'Unstoppable'}
              <div>Unstoppable Email: {instance.user.email || ''}</div>
              <div>
                Unstoppable Humanity: {instance.user.humanity_check_id || ''}
              </div>
              <div>Unstoppable Profile: {instance.user.profile || ''}</div>
            {/if}
          </div>
          <div>
            <input
              type="text"
              class="text-input"
              placeholder="0x..."
              bind:value={toAddress}
            />
            <button on:click={sendTransaction(provider)}>
              Send Transaction
            </button>
          </div>
          <div>
            <input
              type="text"
              class="text-input"
              placeholder="0x..."
              bind:value={toAddress}
            />
            <button on:click={sendTransactionWithPreFlight(provider, balance)}>
              Send with Preflight Notifications
            </button>
          </div>
          <div>
            <input
              id="sign-msg-input"
              type="text"
              class="text-input"
              placeholder="Message..."
              bind:value={signMsg}
            />
            <button on:click={signMessage(provider, address)}>
              Sign Message
            </button>
          </div>
          <div>
            <textarea
              bind:value={typedMsg}
              type="text"
              class="sign-transaction-textarea"
            />
            <button on:click={signTypedMessage(provider, address)}>
              Sign Typed Message
            </button>
          </div>
          <div class="sign-transaction">
            <textarea
              bind:value={transactionObject}
              id="sign-transaction-input"
              type="text"
              class="sign-transaction-textarea"
            />
            <button
              on:click={signTransactionMessage(provider)}
              style="margin: 0 0 0 .5rem"
            >
              Sign Transaction
            </button>
          </div>
        {/each}
        <button
          style="margin-top: 0.5rem;"
          on:click={() => onboard.disconnectWallet({ label })}
        >
          Disconnect Wallet
        </button>
      </div>
    {/each}
  {/if}
</main>
