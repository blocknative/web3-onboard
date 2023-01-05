<script>
  import Onboard from '@web3-onboard/core'
  import fortmaticModule from '@web3-onboard/fortmatic'
  import gnosisModule from '@web3-onboard/gnosis'
  import injectedModule from '@web3-onboard/injected-wallets'
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
  import transactionPreviewModule from '@web3-onboard/transaction-preview'
  import enkryptModule from '@web3-onboard/enkrypt'
  import mewWalletModule from '@web3-onboard/mew-wallet'
  import uauthModule from '@web3-onboard/uauth'
  import phantomModule from '@web3-onboard/phantom'
  import {
    recoverAddress,
    arrayify,
    hashMessage,
    verifyTypedData
  } from 'ethers/lib/utils'
  import { ethers } from 'ethers'
  import { share } from 'rxjs/operators'
  import VConsole from 'vconsole'
  import blocknativeIcon from './blocknative-icon'
  import blocknativeLogo from './blocknative-logo'
  import { onMount } from 'svelte'

  let windowWidth

  if (window.innerWidth < 700) {
    new VConsole()
  }

  const apiKey = '0fcf74ed-b95b-4b8d-a8d8-4d655ae479d9'
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
  let signTypedMsg

  const injected = injectedModule({
    custom: [
      // include custom injected wallet modules here
    ],
    filter: {
      // mapping of wallet label to filter here
    }
  })

  const coinbaseWallet = coinbaseModule()

  const walletConnect = walletConnectModule({
    connectFirstChainId: true
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
  const ledger = ledgerModule()
  const keepkey = keepkeyModule()
  const keystone = keystoneModule()
  const gnosis = gnosisModule()
  const tallyho = tallyHoModule()
  const phantom = phantomModule()

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
    // userEmail: 'test@test.com'
    // userEmail is optional - if user has already logged in and/or session is still active a login modal will not appear
    // for more info see the @web3-onboard/magic docs
  })

  const dcent = dcentModule()
  const sequence = sequenceModule()
  const enkrypt = enkryptModule()
  const mewWallet = mewWalletModule()
  const transactionPreview = transactionPreviewModule({requireTransactionApproval: false})

  const onboard = Onboard({
    wallets: [
      injected,
      web3auth,
      ledger,
      trezor,
      walletConnect,
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
      phantom
    ],
    transactionPreview,
    gas,
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum',
        rpcUrl: `https://mainnet.infura.io/v3/${infura_key}`
      },
      {
        id: 3,
        token: 'tROP',
        label: 'Ropsten',
        rpcUrl: `https://ropsten.infura.io/v3/${infura_key}`
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
        id: 137,
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
    // connect: {
    //   showSidebar: false
    // },
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
        notify: {
          watched: {
            // "txConfirmed": "you paid a foo {formattedValue} {asset}!"
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
          //     link: `https://ropsten.etherscan.io/tx/${transaction.hash}`
          //   }
          // }
        },
        position: 'topRight'
      }
    },
    // containerElements: {
    // El must be present at time of JS script execution
    // See ../public/index.html for element example
    //   accountCenter: '#sample-container-el'
    // },
    // Sign up for your free api key at www.Blocknative.com
    apiKey,
    theme: 'dark'
  })

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets').pipe(share())
  wallets$.subscribe(wallet => {
    const unstoppableUser = wallet.find(
      provider => provider.label === 'Unstoppable'
    )
    if (unstoppableUser) console.log(unstoppableUser.instance.user)
  })

  const signTransactionMessage = async provider => {
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
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const signer = ethersProvider.getSigner()

    const popTransaction = await signer.populateTransaction({
      to: toAddress,
      value: 100000000000000
    })

    const txn = await signer.sendTransaction(popTransaction)

    const receipt = await txn.wait()
    console.log(receipt)
  }

  const sendTransactionWithPreFlight = async (provider, balance) => {
    const balanceValue = Object.values(balance)[0]
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

  const signTypedMessage = async (provider, address) => {
    const data = JSON.parse(signTypedMsg)
    const signature = await provider.request({
      method: 'eth_signTypedData',
      params: [address, data]
    })
    const { domain, types, message } = data

    delete types.EIP712Domain
    console.log(verifyTypedData(domain, types, message, signature))
  }

  let selectedTheme = 'default'
  const themes = {
    default: {
      '--w3o-background-color': 'initial',
      '--w3o-text-color': 'initial',
      '--w3o-border-color': 'initial',
      '--w3o-accent-background': 'initial',
      '--w3o-accent-color': 'initial',
      '--w3o-secondary-text-color': 'initial',
      '--w3o-border-radius': 'initial',
      // '--w3o-accent-color-hover': 'initial', Replaced with accent-background
      '--w3o-secondary-accent-background': 'initial'
    },
    light: {
      '--w3o-background-color': '#ffffff',
      '--w3o-text-color': '#1a1d26',
      '--w3o-border-color': '#d0d4f7',
      '--w3o-accent-background': '#ebebed',
      '--w3o-accent-color': '#929bed',
      '--w3o-secondary-text-color': '#707481',
      '--w3o-border-radius': '24px',
      // '--w3o-accent-color-hover': '#eff1fc', Replaced with accent-background
      '--w3o-secondary-accent-background': '#242835'
    },
    dark: {
      '--w3o-background-color': '#1A1D26',
      '--w3o-text-color': '#EFF1FC',
      '--w3o-border-color': '#33394B',
      '--w3o-accent-background': '#242835',
      '--w3o-accent-color': '#929bed',
      '--w3o-secondary-text-color': '#999CA5',
      '--w3o-border-radius': '24px',
      // '--w3o-accent-color-hover': '#eff1fc',
      '--w3o-secondary-accent-background': '#242835'
    }
  }

  const baseStyling = ``

  const styleToString = style => {
    return Object.keys(style).reduce(
      (acc, key) => acc + key + ': ' + style[key] + '; \n  ',
      ''
    )
  }

  async function copyStylingConfig() {
    try {
      const copy = await navigator.clipboard.writeText(copyableStyles)
      return copy
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  let copyableStyles = `{\n  ${styleToString(
    themes[selectedTheme]
  )}${baseStyling}\n}`

  const updateThemeEl = (targetStyle, value) => {
    console.log(targetStyle, value)
    const iframe = document.getElementById('inlineFrameExample')
    // iframe.contentWindow.document.documentElement.style.setProperty(
    //   targetStyle,
    //   value
    // )

    copyableStyles = `{\n  ${styleToString(
      themes[selectedTheme]
    )}${baseStyling}\n}`
  }

  const updateTheme = theme => {
    Object.keys(themes[theme]).forEach(setting => {
      updateThemeEl(setting, themes[theme][setting])
    })
  }

  let checked = false

  const handleBackdrop = () => {
    const iframe = document.getElementById('inlineFrameExample')

    if (!checked) {
      iframe.contentWindow.document.documentElement.style.setProperty(
        '--onboard-modal-backdrop',
        'rgba(0, 0, 0, 0)'
      )
    } else {
      iframe.contentWindow.document.documentElement.style.setProperty(
        '--onboard-modal-backdrop',
        'rgba(0, 0, 0, 0.6)'
      )
    }
  }

  // Converts the image into a data URI
  const readImage = file => {
    const reader = new FileReader()
    reader.addEventListener('load', event => {
      uploaded_image = event.target.result
      document.querySelector(
        '#image_drop_area'
      ).style.backgroundImage = `url(${uploaded_image})`
    })
    reader.readAsDataURL(file)
  }

  let hideForIframe = false
  let uploaded_image
  const handleImageDrop = () => {
    if (window.location !== window.parent.location) {
      if (image_drop_area) {
        // Event listener for dragging the image over the div
        const connectButton = window.document.getElementById('connectBtn')
        connectButton.style.visibility = 'hidden'
        image_drop_area.addEventListener('dragover', event => {
          event.stopPropagation()
          event.preventDefault()
          // Style the drag-and-drop as a "copy file" operation.
          event.dataTransfer.dropEffect = 'copy'
        })

        // Event listener for dropping the image inside the div
        image_drop_area.addEventListener('drop', event => {
          const image_drop_area_direction = document.querySelector(
            '#image_drop_area_direction'
          )
          document.body.style.padding = 0
          image_drop_area_direction.style.display = 'none'
          connectButton.click()
          connectButton.style.display = 'none'
          event.stopPropagation()
          event.preventDefault()
          let fileList = event.dataTransfer.files

          readImage(fileList[0])
        })
      }
    }
  }
  const initIFrame = async () => {
    if (window.location !== window.parent.location) {
      return (hideForIframe = true)
    }
  }

  onMount(async () => {
    await initIFrame()
    handleImageDrop()
  })
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

  .copy-styles-container {
    display: flex;
    flex-direction: row;
    align-items: end;
  }

  .copy-styles-textarea {
    width: 30rem;
    height: 16rem;
    margin: 0 0 8px;
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

  .themes {
    padding: 1rem;
    border-radius: 4px;
    margin: 0.5rem;
    border: 1px solid gray;
    width: fit-content;
  }

  .themes-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .theming-container {
    height: 20rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 54rem;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .theming-inputs-wrapper {
    display: flex;
    align-items: center;
    width: 25rem;
  }
  .theming-inputs {
    display: inline-flex;
    overflow: hidden;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    box-shadow: 1px 1px 3px 0px grey;
    margin: 1em;
  }
  .theming-inputs-number {
    display: inline-flex;
    width: 2em;
    height: 2em;
    margin: 1em;
  }
  input[type='number'] {
    width: 3.5rem;
    height: 150%;
    margin: -25%;
  }
  input[type='color'] {
    padding: 0;
    width: 150%;
    height: 150%;
    margin: -25%;
  }
  iframe {
    height: 850px;
    width: 1000px;
    resize: both;
    overflow: auto;
    margin: 8px 8px 16px;
  }
  #image_drop_area {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #929bed;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #929bed;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .backdrop-toggle {
    display: flex;
    align-items: center;
    margin: 8px 8px 16px 4px;
  }

  .backdrop-toggle > label {
    margin-right: 8px;
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<main>
  {#if hideForIframe}
    <div id="image_drop_area">
      <p id="image_drop_area_direction">
        Drag and drop a screen shot of your site to customize styling.
        <br />
        Click color circles above to change the theme.
      </p>
      {#if uploaded_image}
        <button on:click={() => onboard.connectWallet()}>Connect Wallet</button>
        {#if $wallets$}
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
          </div>
        {/if}
      {/if}
    </div>
  {/if}
  <div class="cta">
    <button on:click={() => onboard.connectWallet()} id="connectBtn"
      >Connect Wallet</button
    >

    {#if $wallets$ && !hideForIframe}
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
          <button on:click={() => onboard.setChain({ chainId: '0x4' })}
            >Set Chain to Rinkeby</button
          >
          <button on:click={() => onboard.setChain({ chainId: '0x89' })}
            >Set Chain to Matic</button
          >
        </div>
      </div>
    {/if}
  </div>
  {#if $wallets$ && !hideForIframe}
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
            <input
              id="sign-type-msg-input"
              type="text"
              class="text-input"
              placeholder="Typed message..."
              bind:value={signTypedMsg}
            />
            <button on:click={signTypedMessage(provider, address)}>
              Sign Typed Message
            </button>
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
  {#if !hideForIframe && windowWidth > 1040}
    <div class="themes">
      <div class="themes-header">
        <label for="Theme"
          >Click Colored Circles to Customize the Theme:
        </label>
        <select
          bind:value={selectedTheme}
          on:change={() => updateTheme(selectedTheme)}
        >
          {#each Object.keys(themes) as theme}
            <option value={theme}>
              {theme}
            </option>
          {/each}
        </select>
      </div>
      <div class="theming-container">
        {#each Object.keys(themes[selectedTheme]) as target}
          <div class="theming-inputs-wrapper">
            {#if !target.includes('border-radius') && selectedTheme !== 'default'}
              <div class="theming-inputs">
                <input
                  type="color"
                  name="Theme"
                  bind:value={themes[selectedTheme][target]}
                  on:input={e => updateThemeEl(target, e.target.value)}
                />
              </div>
              <span class="text" id="current-theme"
                >{target} : {themes[selectedTheme][target]}</span
              >
            {:else if target.includes('border-radius')}
              <div class="theming-inputs-number">
                <input
                  type="number"
                  name="Theme"
                  on:input={e => {
                    themes[selectedTheme][target] = `${e.target.value}px`
                    updateThemeEl(target, `${e.target.value}px`)
                  }}
                />
              </div>
              <span class="text" id="current-theme"
                >{target} : {themes[selectedTheme][target]}</span
              >
            {/if}
          </div>
        {/each}
      </div>
      <div class="backdrop-toggle">
        <label class="switch">
          <input
            type="checkbox"
            on:change={() => handleBackdrop()}
            bind:checked
          />
          <span class="slider" />
        </label>
        Disabled Backdrop for Styling
      </div>
      <div class="copy-styles-container">
        <textarea
          readonly
          bind:value={copyableStyles}
          class="copy-styles-textarea"
        />
        <button on:click={async () => await copyStylingConfig()}>
          Copy Styling Config
        </button>
      </div>
    </div>
    <iframe
      id="inlineFrameExample"
      name="inlineFrameExample"
      title="Inline Frame Example"
      src={window.location.href}
    />
  {/if}
</main>
