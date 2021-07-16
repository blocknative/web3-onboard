<script lang="ts">
  import { get } from 'svelte/store'
  import { onDestroy, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import BigNumber from 'bignumber.js'

  import { getBlocknative } from '../services'
  import {
    app,
    state,
    stateSyncStatus,
    walletInterface,
    wallet,
    address,
    network,
    balance
  } from '../stores'
  import { validateModal, validateWalletCheckModule } from '../validation'
  import { isPromise } from '../utilities'

  import Modal from '../components/Modal.svelte'
  import ModalHeader from '../components/ModalHeader.svelte'
  import Button from '../elements/Button.svelte'
  import Spinner from '../elements/Spinner.svelte'

  import {
    WalletCheckModule,
    WalletSelectFunction,
    WalletCheck,
    AppState,
    WalletCheckModal,
    UserState,
    Connect
  } from '../interfaces'

  export let walletCheck: WalletCheck
  export let walletSelect: WalletSelectFunction
  export let modules: WalletCheckModule[] | undefined

  const blocknative = getBlocknative()

  let currentState: UserState

  let activeModal: WalletCheckModal | undefined = undefined
  let currentModule: WalletCheckModule | undefined = undefined
  let errorMsg: string
  let pollingInterval: any
  let checkingModule: boolean = false
  let actionResolved: boolean | undefined = undefined
  let loading: boolean = false
  let loadingModal: boolean = false

  const unsubscribe = walletInterface.subscribe(currentInterface => {
    if (currentInterface === null) {
      handleExit()
      unsubscribe()
    }
  })

  // recheck modules if below conditions
  $: if (!activeModal && !checkingModule) {
    renderModule()
  }

  function lockScroll() {
    window.scrollTo(0, 0)
  }

  let originalOverflowValue: string

  const unsubscribeCurrentState = state.subscribe(
    store => (currentState = store)
  )

  onMount(() => {
    originalOverflowValue = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    window.addEventListener('scroll', lockScroll)
  })

  onDestroy(() => {
    unsubscribeCurrentState()
    window.removeEventListener('scroll', lockScroll)
    window.document.body.style.overflow = originalOverflowValue
  })

  async function renderModule() {
    checkingModule = true

    let checkModules = modules || get(app).checkModules

    if (isPromise(checkModules)) {
      checkModules = await checkModules
      checkModules.forEach(validateWalletCheckModule)
      app.update(store => ({ ...store, checkModules }))
    }

    const currentWallet = get(wallet).name

    // loop through and run each module to check if a modal needs to be shown
    runModules(checkModules).then(
      (result: {
        modal: WalletCheckModal | undefined
        module: WalletCheckModule | undefined
      }) => {
        // no result then user has passed all conditions
        if (!result.modal) {
          blocknative &&
            blocknative.event({
              categoryCode: 'onboard',
              eventCode: 'onboardingCompleted'
            })

          handleExit(true)

          return
        }

        // set that UI has been displayed, so that timeouts can be added for UI transitions
        app.update(store => ({ ...store, walletCheckDisplayedUI: true }))

        activeModal = result.modal
        currentModule = result.module

        // log the event code for this module
        blocknative &&
          blocknative.event({
            eventCode: activeModal.eventCode,
            categoryCode: 'onboard'
          })

        // run any actions that module require as part of this step
        if (activeModal.action) {
          doAction()
        }

        // poll to automatically to check if condition has been met
        pollingInterval = setInterval(async () => {
          if (currentModule) {
            const result = await invalidState(currentModule, get(state))
            if (!result && actionResolved !== false) {
              resetState()

              // delayed for animations
              setTimeout(() => {
                checkingModule = false
              }, 250)
            } else {
              activeModal = result && result.modal ? result.modal : activeModal
            }
          }
        }, 100)
      }
    )
  }

  function doAction() {
    actionResolved = false
    loading = true

    activeModal &&
      activeModal.action &&
      (activeModal.action as Connect)()
        .then(() => {
          actionResolved = true
          loading = false
        })
        .catch((err: { message: string }) => {
          errorMsg = err.message
          loading = false
        })
  }

  function handleExit(
    completed: boolean = false,
    { switchingWallets }: Partial<AppState> = {}
  ) {
    resetState()
    app.update((store: AppState) => ({
      ...store,
      switchingWallets,
      walletCheckInProgress: false,
      walletCheckCompleted: completed,
      accountSelectInProgress: false
    }))
  }

  function resetState() {
    clearInterval(pollingInterval)
    errorMsg = ''
    actionResolved = undefined
    activeModal = undefined
    currentModule = undefined
  }

  function runModules(modules: WalletCheckModule[]) {
    return new Promise(
      async (
        resolve: (result: {
          modal: WalletCheckModal | undefined
          module: WalletCheckModule | undefined
        }) => void
      ) => {
        for (const module of modules) {
          const result = await invalidState(module, currentState)

          if (result) {
            return resolve(result)
          }
        }

        return resolve({ modal: undefined, module: undefined })
      }
    )
  }

  async function invalidState(
    module: WalletCheckModule,
    state: UserState
  ): Promise<
    { module: WalletCheckModule; modal: WalletCheckModal } | undefined
  > {
    const result = module({
      ...state,
      BigNumber,
      walletSelect,
      walletCheck,
      exit: handleExit,
      wallet: get(wallet),
      stateSyncStatus,
      stateStore: {
        address,
        network,
        balance
      }
    })

    if (result) {
      if (isCheckModal(result)) {
        validateModal(result)
        return {
          module,
          modal: result
        }
      } else {
        // module returned a promise, so await it for val
        // show loading spinner if promise doesn't resolve within 150ms
        let modal
        await new Promise(resolve => {
          let completed: boolean = false

          result.then(res => {
            loadingModal = false
            completed = true
            modal = res
            resolve(undefined)
          })

          setTimeout(() => {
            if (!completed) {
              loadingModal = true
            }
          }, 650)
        })

        if (modal) {
          validateModal(modal)
          return {
            module,
            modal
          }
        }
      }
    }
  }

  function isCheckModal(
    val: WalletCheckModal | Promise<WalletCheckModal | undefined>
  ): val is WalletCheckModal {
    return (val as WalletCheckModal).heading !== undefined
  }
</script>

<style>
  /* .bn-onboard-prepare-description */
  p {
    font-size: 0.889em;
    font-family: inherit;
    margin: 1em 0;
  }

  /* .bn-onboard-prepare-error */
  span {
    color: #e2504a;
    font-size: 0.889em;
    font-family: inherit;
    display: block;
    margin-bottom: 0.75em;
    padding: 0.5em;
    border: 1px solid #e2504a;
    border-radius: 5px;
  }

  /* .bn-onboard-prepare-button-container */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2.5rem;
    position: relative;
  }

  section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }
</style>

{#if loadingModal}
  <Modal closeable={false}>
    <Spinner description="Checking wallet" />
  </Modal>
{/if}

{#if activeModal}
  <Modal closeModal={() => handleExit()}>
    <ModalHeader icon={activeModal.icon || ''} heading={activeModal.heading} />
    <p class="bn-onboard-custom bn-onboard-prepare-description">
      {@html activeModal.description}
    </p>
    {#if errorMsg}
      <span
        class:bn-onboard-dark-mode-background={$app.darkMode}
        class="bn-onboard-custom bn-onboard-prepare-error"
        in:fade
      >
        {errorMsg}
      </span>
    {/if}

    {#if activeModal.html}
      <section class="bn-onboard-custom bn-onboard-wallet-check-section">
        {@html activeModal.html}
      </section>
    {/if}

    <div class="bn-onboard-custom bn-onboard-prepare-button-container">
      {#if activeModal.button}
        <Button position="right" onclick={activeModal.button.onclick}>
          {activeModal.button.text}
        </Button>
      {/if}
      {#if errorMsg}
        <Button
          position={!activeModal.button ? 'right' : ''}
          onclick={doAction}
        >
          Try Again
        </Button>
      {:else}
        <div />
      {/if}
      {#if loading}
        <Spinner />
      {/if}
      <Button position="left" onclick={() => handleExit(false)} cta={false}
        >Dismiss</Button
      >
    </div>
  </Modal>
{/if}
