<script lang="ts">
  import BigNumber from 'bignumber.js'
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { onDestroy, onMount } from 'svelte'

  import { app, walletInterface, wallet, resetWalletState } from '../stores'

  import Modal from '../components/Modal.svelte'
  import ModalHeader from '../components/ModalHeader.svelte'
  import Wallets from '../components/Wallets.svelte'
  import SelectedWallet from '../components/SelectedWallet.svelte'
  import Button from '../elements/Button.svelte'
  import walletIcon from '../elements/walletIcon'

  import {
    getProviderName,
    createLegacyProviderInterface,
    createModernProviderInterface,
    getAddress,
    getBalance,
    getNetwork,
    networkName
  } from '../utilities'

  import {
    WalletSelectModalData,
    WalletModule,
    WalletSelectModule,
    WalletInterface
  } from '../interfaces'
  import { STORAGE_KEYS } from '../constants'

  export let module: WalletSelectModule = {
    heading: '',
    description: '',
    wallets: Promise.resolve([]),
    agreement: undefined
  }

  let modalData: WalletSelectModalData | null
  let showWalletDefinition: boolean
  let walletAlreadyInstalled: string | undefined
  let installMessage: string

  let selectedWalletModule: WalletModule | null

  const { mobileDevice, os } = get(app)
  let { heading, description, explanation, agreement } = module

  const { termsUrl, privacyUrl, version } = agreement || {}
  const {
    terms: termsAgreed,
    privacy: privacyAgreed,
    version: versionAgreed
  } = JSON.parse(localStorage.getItem(STORAGE_KEYS.TERMS_AGREEMENT) || '{}')

  const showTermsOfService: boolean = !!(
    (termsUrl && !termsAgreed) ||
    (privacyUrl && !privacyAgreed) ||
    (version && version !== versionAgreed)
  )

  let walletsDisabled: boolean = showTermsOfService

  let agreed: boolean | undefined = undefined

  $: if (agreed) {
    localStorage.setItem(
      STORAGE_KEYS.TERMS_AGREEMENT,
      JSON.stringify({
        version,
        terms: !!termsUrl,
        privacy: !!privacyUrl
      })
    )
    walletsDisabled = false
  } else if (agreed === false) {
    localStorage.removeItem(STORAGE_KEYS.TERMS_AGREEMENT)
    walletsDisabled = true
  }

  let primaryWallets: WalletModule[]
  let secondaryWallets: WalletModule[] | undefined

  let loadingWallet: string | undefined = undefined

  let showingAllWalletModules = false
  const showAllWallets = () => (showingAllWalletModules = true)

  function lockScroll() {
    window.scrollTo(0, 0)
  }

  let originalOverflowValue: string

  onMount(() => {
    originalOverflowValue = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    window.addEventListener('scroll', lockScroll)
  })

  onDestroy(() => {
    window.removeEventListener('scroll', lockScroll)
    window.document.body.style.overflow = originalOverflowValue
  })

  renderWalletSelect()

  async function renderWalletSelect() {
    const appState = get(app)
    const wallets = await module.wallets

    const deviceWallets = (wallets as WalletModule[])
      .filter(wallet => wallet[mobileDevice ? 'mobile' : 'desktop'])
      .filter(wallet => {
        const { osExclusions = [] } = wallet
        return !osExclusions.includes(os.name)
      })

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

    if (appState.autoSelectWallet) {
      const module = deviceWallets.find(
        (m: WalletModule) => m.name === appState.autoSelectWallet
      )

      app.update(store => ({ ...store, autoSelectWallet: '' }))

      if (module) {
        handleWalletSelect(module, true)
        return
      }
    }

    modalData = {
      heading,
      description,
      explanation,
      primaryWallets,
      secondaryWallets
    }

    app.update(store => ({ ...store, walletSelectDisplayedUI: true }))
  }

  async function handleWalletSelect(
    module: WalletModule,
    autoSelected?: boolean
  ) {
    const currentWalletInterface = get(walletInterface)
    const { browser, os } = get(app)

    if (currentWalletInterface && currentWalletInterface.name === module.name) {
      finish({ completed: true })
      return
    }

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
      getBalance,
      resetWalletState,
      networkName,
      browser,
      os
    })

    loadingWallet = undefined

    // if no interface then the user does not have the wallet they selected installed or available
    if (!selectedWalletInterface) {
      selectedWalletModule = module

      walletAlreadyInstalled = provider && getProviderName(provider)

      installMessage = module.installMessage
        ? module.installMessage({
            currentWallet: walletAlreadyInstalled,
            selectedWallet: selectedWalletModule.name
          })
        : ''

      // if it was autoSelected then we need to add modalData to show the modal
      if (autoSelected) {
        modalData = {
          heading,
          description,
          explanation,
          primaryWallets,
          secondaryWallets
        }

        app.update(store => ({ ...store, walletSelectDisplayedUI: true }))
      }

      return
    }

    walletInterface.update((currentInterface: WalletInterface | null) => {
      if (currentInterface && currentInterface.disconnect) {
        currentInterface.disconnect()
      }

      return selectedWalletInterface
    })
    const { name, type, svg, iconSrc, iconSrcSet } = module
    wallet.set({
      provider,
      instance,
      dashboard: selectedWalletInterface.dashboard,
      name,
      connect: selectedWalletInterface.connect,
      type,
      icons: {
        svg,
        iconSrc,
        iconSrcSet
      }
    })

    finish({ completed: true })
  }

  function finish(options: { completed: boolean }) {
    modalData = null
    app.update(store => ({
      ...store,
      walletSelectInProgress: false,
      walletSelectCompleted: options.completed
    }))
  }
</script>

<style>
  /* .bn-onboard-select-description, .bn-onboard-select-wallet-definition */
  p {
    font-size: 0.889em;
    margin: 1.6em 0 0 0;
    font-family: inherit;
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
  .bn-onboard-modal-terms-of-service {
    display: flex;
    align-items: center;
  }
  .bn-onboard-modal-terms-of-service-check-box {
    margin-right: 7px;
  }
</style>

{#if modalData}
  <Modal closeModal={() => finish({ completed: false })}>
    <ModalHeader icon={walletIcon} heading={modalData.heading} />
    {#if showTermsOfService}
      <p>
        <label class="bn-onboard-custom bn-onboard-modal-terms-of-service">
          <input
            class="bn-onboard-custom bn-onboard-modal-terms-of-service-check-box"
            type="checkbox"
            bind:checked={agreed}
          />
          <span>
            I agree to the
            {#if termsUrl}<a href={termsUrl} target="_blank"
                >Terms & Conditions</a
              >{privacyUrl ? ' and' : '.'}
            {/if}
            {#if privacyUrl}<a href={privacyUrl} target="_blank"
                >Privacy Policy</a
              >.{/if}
          </span>
        </label>
      </p>
    {/if}
    {#if !selectedWalletModule}
      <p class="bn-onboard-custom bn-onboard-select-description">
        {@html modalData.description}
      </p>
      <Wallets
        {modalData}
        {handleWalletSelect}
        {loadingWallet}
        {showingAllWalletModules}
        {showAllWallets}
        {walletsDisabled}
      />
      <div class="bn-onboard-custom bn-onboard-select-info-container">
        <span
          class="bn-onboard-custom bn-onboard-select-wallet-info"
          on:click={() => (showWalletDefinition = !showWalletDefinition)}
        >
          What is a wallet?
        </span>
        {#if mobileDevice}
          <Button cta={false} onclick={() => finish({ completed: false })}
            >Dismiss</Button
          >
        {/if}
      </div>
      {#if showWalletDefinition}
        <p
          in:fade
          class="bn-onboard-custom bn-onboard-select-wallet-definition"
        >
          {@html modalData.explanation}
        </p>
      {/if}
    {:else}
      <SelectedWallet
        {selectedWalletModule}
        onBack={() => {
          selectedWalletModule = null
          walletAlreadyInstalled = undefined
        }}
        {installMessage}
      />
    {/if}
  </Modal>
{/if}
