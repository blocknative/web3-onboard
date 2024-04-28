<script>
  import Onboard from '@web3-onboard/core'
  import fortmaticModule from '@web3-onboard/fortmatic'
  import frameModule from '@web3-onboard/frame'
  import safeModule from '@web3-onboard/gnosis'
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
  import metamaskSDK from '@web3-onboard/metamask'
  import enkryptModule from '@web3-onboard/enkrypt'
  import mewWalletModule from '@web3-onboard/mew-wallet'
  import uauthModule from '@web3-onboard/uauth'
  import phantomModule from '@web3-onboard/phantom'
  import trustModule from '@web3-onboard/trust'
  import frontierModule from '@web3-onboard/frontier'
  import bloctoModule from '@web3-onboard/blocto'
  import cedeStoreModule from '@web3-onboard/cede-store'
  import arcanaAuthModule from '@web3-onboard/arcana-auth'
  import venlyModule from '@web3-onboard/venly'
  import bitgetModule from '@web3-onboard/bitget'
  import particleAuthModule from '@web3-onboard/particle-network'
  import echoooModule from '@web3-onboard/echooo'
  import capsuleModule, {
    Environment,
    OAuthMethod,
    Theme
  } from '@web3-onboard/capsule'
  import {
    recoverAddress,
    arrayify,
    hashMessage,
    verifyTypedData
  } from 'ethers/lib/utils'
  import { ethers } from 'ethers'
  import { share } from 'rxjs/operators'
  import VConsole from 'vconsole'
  import blocknativeIcon from './blocknative-icon.js'
  import DappAuth from '@blocto/dappauth'

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
    ],
    // display all unavailable injected wallets
    // displayUnavailable: true,
    // ||
    // display specific unavailable wallets
    displayUnavailable: [
      ProviderLabel.MetaMask,
      ProviderLabel.Trust,
      ProviderLabel.Phantom
    ]
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
    // walletUnavailableMessage: wallet =>
    //   wallet.externalUrl
    //     ? `Oops ${wallet.label} is unavailable! Please <a href="${wallet.externalUrl}" target="_blank">install</a>`
    //     : `Oops ${wallet.label} is unavailable!`
  })

  const coinbaseWallet = coinbaseModule()

  const metamaskSDKWallet = metamaskSDK({
    options: {
      extensionOnly: false,
      i18nOptions: {
        enabled: true
      },
      dappMetadata: {
        name: 'Demo Web3Onboard'
      }
    }
  })

  const walletConnect = walletConnectModule({
    handleUri: uri => console.log(uri),
    projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
    dappUrl: 'https://www.onboard.blocknative.com'
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

  const arcanaAuth = arcanaAuthModule({
    clientID: 'xar_test_c9c3bc702eb13255c58dab0e74cfa859711c13cb'
  })

  const torus = torusModule()
  const infinityWallet = infinityWalletModule()
  const ledger = ledgerModule({ projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5' })
  const keepkey = keepkeyModule()
  const keystone = keystoneModule()
  const safe = safeModule()
  const xdefi = xdefiWalletModule()
  const zeal = zealModule()
  const phantom = phantomModule()
  const trust = trustModule()
  const frontier = frontierModule()
  const cedeStore = cedeStoreModule()
  const blocto = bloctoModule()
  const tallyho = tallyHoModule()

  const trezorOptions = {
    email: 'test@test.com',
    appUrl: 'https://www.blocknative.com',
    consecutiveEmptyAccountThreshold: 10
    // containerElement: '#sample-container-el'
  }
  const trezor = trezorModule(trezorOptions)

  const uauthOptions = {
    clientID: 'a25c3a65-a1f2-46cc-a515-a46fe7acb78c',
    walletConnectProjectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5',
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

  const particle = particleAuthModule({
    projectId: 'b385ccf0-73c3-485a-9941-159b7855b806',
    clientKey: 'cSTLqhvONB5j588Wz6E5WJLMPrHeUlGbymf1DFhO',
    appId: 'b1f0239a-edb0-41f9-b0f5-ab780bb02a9e'
  })

  const dcent = dcentModule()
  const bitget = bitgetModule()
  const frameWallet = frameModule()
  const sequence = sequenceModule()
  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()
  const transactionPreview = transactionPreviewModule({
    requireTransactionApproval: true
  })
  const venly = venlyModule({
    clientId: 'blocknative',
    environment: 'staging'
  })
  const capsule = capsuleModule({
    environment: Environment.DEVELOPMENT,
    apiKey: '992bbd9146d5de8ad0419f141d9a7ca7',
    modalProps: {
      oAuthMethods: [OAuthMethod.GOOGLE, OAuthMethod.TWITTER],
      theme: Theme.dark
    },
    constructorOpts: {
      portalBackgroundColor: '#5e5656',
      portalPrimaryButtonColor: '#ff6700',
      portalTextColor: '#ffffff'
    }
  })
  const echooo = echoooModule()

  const onboard = Onboard({
    wallets: [
      metamaskSDKWallet,
      coinbaseWallet,
      injected,
      ledger,
      trezor,
      walletConnect,
      phantom,
      safe,
      trust,
      tallyho,
      bitget,
      enkrypt,
      infinityWallet,
      mewWallet,
      keepkey,
      keystone,
      magic,
      fortmatic,
      portis,
      torus,
      dcent,
      sequence,
      uauth,
      web3auth,
      capsule,
      zeal,
      frontier,
      xdefi,
      frameWallet,
      cedeStore,
      arcanaAuth,
      blocto,
      venly,
      particle,
      echooo
    ],
    // transactionPreview,
    gas,
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        secondaryTokens: [
          {
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#2775C9"/>
              <path d="M7.875 13.75C4.63 13.75 2 11.12 2 7.875C2 4.63 4.63 2 7.875 2C11.12 2 13.75 4.63 13.75 7.875C13.75 9.43315 13.131 10.9275 12.0293 12.0293C10.9275 13.131 9.43315 13.75 7.875 13.75ZM7.525 5.695C7.20355 5.71094 6.89968 5.84646 6.67303 6.07496C6.44638 6.30346 6.31333 6.60843 6.3 6.93C6.3 7.535 6.67 7.93 7.455 8.095L8.005 8.225C8.54 8.35 8.76 8.53 8.76 8.835C8.76 9.14 8.375 9.44 7.875 9.44C7.6974 9.45628 7.5188 9.42225 7.35964 9.34178C7.20048 9.26132 7.06718 9.13767 6.975 8.985C6.94769 8.92707 6.90457 8.87803 6.85061 8.84353C6.79665 8.80903 6.73404 8.79048 6.67 8.79H6.375C6.35231 8.7942 6.33068 8.80285 6.31135 8.81544C6.29202 8.82804 6.27537 8.84433 6.26236 8.86338C6.24935 8.88243 6.24023 8.90387 6.23554 8.92646C6.23084 8.94905 6.23066 8.97234 6.235 8.995C6.30686 9.28828 6.47393 9.54945 6.71007 9.73764C6.94621 9.92583 7.23808 10.0304 7.54 10.035V10.455C7.54 10.5485 7.57714 10.6381 7.64324 10.7043C7.70935 10.7704 7.79901 10.8075 7.8925 10.8075C7.98599 10.8075 8.07565 10.7704 8.14176 10.7043C8.20786 10.6381 8.245 10.5485 8.245 10.455V10.03C8.58639 10.0261 8.91279 9.88913 9.15467 9.64818C9.39655 9.40724 9.53481 9.08137 9.54 8.74C9.54 8.105 9.175 7.74 8.31 7.555L7.81 7.445C7.31 7.32 7.075 7.155 7.075 6.875C7.075 6.595 7.375 6.285 7.875 6.285C8.03247 6.26855 8.19133 6.29804 8.3324 6.36991C8.47348 6.44178 8.59073 6.55295 8.67 6.69C8.70213 6.75844 8.75301 6.81638 8.81672 6.85708C8.88044 6.89779 8.95439 6.91961 9.03 6.92H9.265C9.31843 6.90693 9.3646 6.87342 9.39358 6.82667C9.42257 6.77992 9.43205 6.72367 9.42 6.67C9.35226 6.39922 9.20073 6.15674 8.98704 5.97717C8.77335 5.7976 8.5084 5.69009 8.23 5.67V5.325C8.23 5.23151 8.19286 5.14185 8.12675 5.07574C8.06065 5.00964 7.97099 4.9725 7.8775 4.9725C7.78401 4.9725 7.69435 5.00964 7.62824 5.07574C7.56214 5.14185 7.525 5.23151 7.525 5.325V5.695ZM3.47 7.875C3.47057 8.79603 3.76049 9.69361 4.29879 10.441C4.8371 11.1883 5.59659 11.7477 6.47 12.04H6.54C6.59967 12.04 6.6569 12.0163 6.6991 11.9741C6.74129 11.9319 6.765 11.8747 6.765 11.815V11.71C6.76516 11.6169 6.73769 11.5259 6.68606 11.4485C6.63444 11.371 6.56098 11.3106 6.475 11.275C5.7948 11.0004 5.21217 10.5289 4.80189 9.92084C4.39161 9.3128 4.1724 8.59602 4.1724 7.8625C4.1724 7.12898 4.39161 6.4122 4.80189 5.80416C5.21217 5.19611 5.7948 4.72455 6.475 4.45C6.56058 4.41524 6.63387 4.35577 6.68552 4.27919C6.73717 4.2026 6.76484 4.11237 6.765 4.02V3.905C6.76532 3.87123 6.7575 3.83789 6.74219 3.80779C6.72689 3.77769 6.70455 3.75173 6.67707 3.7321C6.64959 3.71248 6.61779 3.69976 6.58435 3.69505C6.55092 3.69033 6.51684 3.69374 6.485 3.705C5.60798 3.99505 4.84465 4.55405 4.30342 5.30262C3.76218 6.05119 3.47057 6.95126 3.47 7.875ZM12.28 7.875C12.2784 6.95482 11.988 6.05836 11.4497 5.31201C10.9115 4.56566 10.1526 4.00707 9.28 3.715H9.205C9.14267 3.715 9.0829 3.73976 9.03883 3.78383C8.99476 3.8279 8.97 3.88767 8.97 3.95V4.025C8.97202 4.12143 9.00188 4.21523 9.056 4.29507C9.11012 4.37492 9.18617 4.4374 9.275 4.475C9.95365 4.75036 10.5347 5.22195 10.9438 5.82942C11.3529 6.43689 11.5714 7.15262 11.5714 7.885C11.5714 8.61738 11.3529 9.33311 10.9438 9.94058C10.5347 10.5481 9.95365 11.0196 9.275 11.295C9.18787 11.333 9.11337 11.395 9.06024 11.4738C9.0071 11.5527 8.97754 11.645 8.975 11.74V11.825C8.97543 11.8621 8.98462 11.8985 9.00182 11.9313C9.01902 11.9642 9.04375 11.9925 9.07398 12.0139C9.10421 12.0354 9.13909 12.0494 9.17576 12.0548C9.21244 12.0602 9.24987 12.0568 9.285 12.045C10.1583 11.7515 10.9173 11.1911 11.4547 10.4428C11.9921 9.69451 12.2808 8.79627 12.28 7.875Z" fill="white"/>
              </svg>`
          },
          {
            address: '0x111111111117dc0aa78b770fa6a738034120c302',
            icon: `https://avatars.githubusercontent.com/u/43341157`
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
        id: 42161,
        token: 'ARB-ETH',
        label: 'Arbitrum One',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      },
      {
        id: '0xa4ba',
        token: 'ARB',
        label: 'Arbitrum Nova',
        rpcUrl: 'https://nova.arbitrum.io/rpc'
      },
      {
        id: '0x13881',
        token: 'MATIC',
        label: 'Polygon - Mumbai',
        rpcUrl: 'https://polygon-mumbai-bor-rpc.publicnode.com'
      },
      {
        id: '0x2105',
        token: 'ETH',
        label: 'Base',
        rpcUrl: 'https://mainnet.base.org'
      },
      {
        id: '0xa4ec',
        token: 'ETH',
        label: 'Celo',
        rpcUrl: 'https://1rpc.io/celo'
      },
      {
        id: '0x38',
        token: 'BNB',
        label: 'Binance',
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        secondaryTokens: [
          {
            address: '0x4d61577d8fd2208a0afb814ea089fdeae19ed202',
            icon: `https://assets.coingecko.com/coins/images/15363/small/vfox2.png?1629870083`
          },
          {
            address: '0xde2f075f6f14eb9d96755b24e416a53e736ca363',
            icon: `https://assets.coingecko.com/coins/images/13423/small/frax_share.png?1608478989`
          }
        ]
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
    connect: {
      // disableClose: true,
      // removeWhereIsMyWalletWarning: true,
      autoConnectAllPreviousWallet: true
    },
    appMetadata: {
      name: 'Blocknative',
      icon: blocknativeIcon,
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
        enabled: true
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
          //     link: `https://sepolia.etherscan.io/tx/${transaction.hash}`
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
    theme: 'default'
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
    let verifySign = false
    let recoveredAddress = null

    try {
      recoveredAddress = recoverAddress(
        arrayify(hashMessage(signMsg)),
        signature
      )
      verifySign = recoveredAddress === addr
    } catch (error) {
      console.error('Error recovering address', error)
    }

    // contract wallets verify EIP-1654
    const verifySignBy1654 = new DappAuth(provider)
    const isAuthorizedSigner = await verifySignBy1654.isAuthorizedSigner(
      signMsg,
      signature,
      address
    )
    if (!verifySign && !isAuthorizedSigner) {
      console.error(
        "Signature failed. Recovered address doesn' match signing address."
      )
      verifySign = recoveredAddress === addr
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

  function isSVG(str) {
    return str.includes('<svg')
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
  .position-buttons {
    display: flex;
    flex-direction: column;
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
          <button on:click={() => onboard.setChain({ chainId: 11155111 })}
            >Set Chain to Sepolia</button
          >
          <button on:click={() => onboard.setChain({ chainId: '0x89' })}
            >Set Chain to Matic</button
          >
          <button on:click={() => onboard.setChain({ chainId: 10 })}
            >Set Chain to OP Mainnet</button
          >
        </div>
        <div class="position-buttons">
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'bottomLeft'
              })}>AC Bottom Left</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'topRight'
              })}>AC Top Right</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'bottomRight'
              })}>AC Bottom Right</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                position: 'topLeft'
              })}>AC Top Left</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                minimal: false
              })}>Large Trigger</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAccountCenter({
                minimal: true
              })}>Small Trigger</button
          >
          <button
            on:click={() =>
              onboard.state.actions.updateAppMetadata({
                // Checkmark
                icon: `<svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="currentColor"/></svg>`,
                // Hourglass
                logo: `<svg width="100%" height="100%" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L0.0100002 6L4 10L0.0100002 14.01L0 20H12V14L8 10L12 6.01V0H0ZM10 14.5V18H2V14.5L6 10.5L10 14.5Z" fill="#929BED"/>
                  </svg>`,
                description: 'Updated Description!',
                agreement: {
                  version: '2.0.0',
                  termsUrl: 'https://onboard.blocknative.com/',
                  privacyUrl: 'https://onboard.blocknative.com/'
                },
                gettingStartedGuide: 'https://onboard.blocknative.com/',
                explore: 'https://onboard.blocknative.com/'
              })}>Update appMetadata</button
          >
        </div>
      </div>
    {/if}
  </div>
  {#if $wallets$}
    {#each $wallets$ as { icon, label, accounts, chains, provider, instance }}
      <div class="connected-wallet" data-testid="connected-wallet">
        <div class="flex-centered" style="width: 10rem;">
          <div style="width: 2rem; height: 2rem">
            {#if isSVG(icon)}
              <!-- render svg string -->
              {@html icon}
            {:else}
              <!-- load img url -->
              <img style="width: 2rem; height: 2rem" src={icon} alt="logo" />
            {/if}
          </div>
          <span data-testid={label}>{label}</span>
        </div>

        <div data-testid="chains">
          Chains: {JSON.stringify(chains, null, 2)}
        </div>

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
              data-testid="sendTransaction"
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
              data-testid="sendWithPreflight"
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
