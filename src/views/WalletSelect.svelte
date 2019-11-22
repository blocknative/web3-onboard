<script lang="ts">
  import BigNumber from 'bignumber.js'
  import { onDestroy } from 'svelte'
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'

  import { app, walletInterface, wallet } from '../stores'

  import Modal from '../components/Modal.svelte'
  import ModalHeader from '../components/ModalHeader.svelte'
  import Wallets from '../components/Wallets.svelte'
  import SelectedWallet from '../components/SelectedWallet.svelte'
  import Button from '../elements/Button.svelte'
  import IconButton from '../elements/IconButton.svelte'
  import walletIcon from '../elements/walletIcon'

  import {
    getProviderName,
    createLegacyProviderInterface,
    createModernProviderInterface,
    getAddress,
    getBalance,
    getNetwork,
    isPromise
  } from '../utilities'

  import {
    WalletSelectModalData,
    AppState,
    WalletModule,
    WalletSelectModule,
    WalletInterface
  } from '../interfaces'

  export let module: WalletSelectModule = {
    heading: '',
    description: '',
    wallets: []
  }

  let modalData: WalletSelectModalData | null
  let showWalletDefinition: boolean
  let walletAlreadyInstalled: string | undefined
  let installMessage: string | undefined

  let selectedWalletModule: WalletModule

  const { mobileDevice } = get(app)
  let { heading, description, wallets } = module

  let primaryWallets: WalletModule[]
  let secondaryWallets: WalletModule[] | undefined

  let loadingWallet: string | undefined = undefined

  let appState: AppState = {
    dappId: '',
    networkId: 1,
    version: '',
    mobileDevice: false,
    darkMode: false,
    autoSelectWallet: '',
    walletSelectInProgress: true,
    walletSelectCompleted: false,
    walletCheckInProgress: false,
    walletCheckCompleted: false
  }

  const unsubscribe = app.subscribe((store: AppState) => (appState = store))
  onDestroy(unsubscribe)

  renderWalletSelect()

  async function renderWalletSelect() {
    wallets = await wallets

    const deviceWallets = (wallets as WalletModule[]).filter(
      wallet => wallet[mobileDevice ? 'mobile' : 'desktop']
    )

    if (appState.autoSelectWallet) {
      const module = deviceWallets.find(
        (m: WalletModule) => m.name === appState.autoSelectWallet
      )
      module && handleWalletSelect(module)
    } else {
      if (deviceWallets.find(wallet => wallet.preferred)) {
        // if preferred wallets, then split in to preferred and not preferred
        primaryWallets = deviceWallets.filter(wallet => wallet.preferred)
        secondaryWallets = deviceWallets.filter(wallet => !wallet.preferred)
      } else {
        // otherwise make the first 4 wallets preferred
        primaryWallets = deviceWallets.slice(0, 4)
        secondaryWallets =
          deviceWallets.length > 4 ? deviceWallets.slice(4) : undefined
      }

      modalData = {
        heading,
        description,
        primaryWallets,
        secondaryWallets
      }
    }
  }

  async function handleWalletSelect(module: WalletModule) {
    loadingWallet = module.name

    const {
      provider,
      interface: selectedWalletInterface,
      instance
    } = await module.wallet({
      getProviderName,
      createLegacyProviderInterface,
      createModernProviderInterface,
      BigNumber,
      getNetwork,
      getAddress,
      getBalance
    })

    loadingWallet = undefined

    // if no interface then the user does not have the wallet they selected installed or available
    if (!selectedWalletInterface) {
      selectedWalletModule = module

      walletAlreadyInstalled = provider && getProviderName(provider)

      installMessage =
        module.installMessage &&
        module.installMessage({
          currentWallet: walletAlreadyInstalled || 'unknown',
          selectedWallet: selectedWalletModule.name
        })

      return
    }

    walletInterface.update((currentInterface: WalletInterface | null) => {
      if (currentInterface && currentInterface.disconnect) {
        currentInterface.disconnect()
      }

      return selectedWalletInterface
    })

    wallet.set({
      provider,
      instance,
      name: module.name,
      connect: selectedWalletInterface.connect,
      loading: selectedWalletInterface.loading
    })

    finish({ completed: true })
  }

  function finish(options: { completed: boolean }) {
    modalData = null

    app.update(store => ({
      ...store,
      walletSelectInProgress: false,
      walletSelectCompleted: options.completed,
      autoSelect: false
    }))
  }
</script>

<style>
  /* .bn-onboard-select-description, .bn-onboard-select-wallet-definition */
  p {
    font-size: 0.889em;
    margin: 1.6em 0 0 0;
    font-family: 'Helvetica Neue';
  }

  /* .bn-onboard-select-info-container */
  div {
    display: flex;
    font-size: inherit;
    font-family: inherit;
    justify-content: space-between;
  }

  /* .bn-onboard-select-wallet-info */
  div span {
    color: #4a90e2;
    font-size: inherit;
    font-family: inherit;
    margin-top: 0.66em;
    cursor: pointer;
  }
</style>

{#if modalData}
  <Modal closeModal={() => finish({ completed: false })}>
    <ModalHeader icon={walletIcon} heading={modalData.heading} />
    {#if !selectedWalletModule}
      <p class="bn-onboard-custom bn-onboard-select-description">
        {modalData.description}
      </p>
      <Wallets {modalData} {handleWalletSelect} {loadingWallet} />
      <div class="bn-onboard-custom bn-onboard-select-info-container">
        <span
          class="bn-onboard-custom bn-onboard-select-wallet-info"
          on:click={() => (showWalletDefinition = !showWalletDefinition)}>
          What is a wallet?
        </span>
        {#if mobileDevice}
          <Button onclick={() => finish({ completed: false })}>Dismiss</Button>
        {/if}
      </div>
      {#if showWalletDefinition}
        <p
          in:fade
          class="bn-onboard-custom bn-onboard-select-wallet-definition">
          Wallets are used to send, receive, and store digital assets like
          Ethereum. Wallets come in many forms. They are either built into your
          browser, an extension added to your browser, a piece of hardware
          plugged into your computer or even an app on your phone. They are
          hyper secure, and can be used for any other blockchain application you
          may want to use.
        </p>
      {/if}
    {:else}
      <SelectedWallet
        {selectedWalletModule}
        onBack={() => {
          selectedWalletModule = null
          walletAlreadyInstalled = null
        }}
        {installMessage} />
    {/if}
  </Modal>
{/if}
