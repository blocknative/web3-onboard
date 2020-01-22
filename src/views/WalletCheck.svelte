<script lang="ts">
  import { get } from 'svelte/store'

  import { fade } from 'svelte/transition'
  import BigNumber from 'bignumber.js'

  import { getBlocknative } from '../services'
  import {
    app,
    state,
    balanceSyncStatus,
    walletInterface,
    wallet
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
    AppState,
    WalletCheckModal,
    UserState
  } from '../interfaces'

  export let modules: WalletCheckModule[] | Promise<WalletCheckModule[]> = []
  export let walletSelect: WalletSelectFunction

  const blocknative = getBlocknative()

  let activeModal: WalletCheckModal | undefined = undefined
  let currentModule: WalletCheckModule | undefined = undefined
  let errorMsg: string
  let pollingInterval: any
  let checkingModule: boolean = false
  let actionResolved: boolean | undefined = undefined
  let loading: boolean = false
  let loadingModal: boolean = false
  // let stopChecking: boolean = false
  // array of indexes of which modules to remove from the modules sequence
  let removeModuleIndexes: Array<number> | undefined

  const unsubscribe = walletInterface.subscribe(currentInterface => {
    if (currentInterface === null) {
      // stopChecking = true
      handleExit()
      unsubscribe()
    }
  })

  // recheck modules if below conditions
  $: if (!activeModal && !checkingModule) {
    renderModule()
  }

  async function renderModule() {
    checkingModule = true

    if (isPromise(modules)) {
      modules = await modules
      modules.forEach(validateWalletCheckModule)

      // assign modules a set index
      modules = modules.map((module, index) => {
        module.index = index
        return module
      })
    }

    let modulesToRun
    if (removeModuleIndexes !== undefined) {
      modulesToRun = modules.filter(module => {
        if (module.index) {
          return removeModuleIndexes
            ? !removeModuleIndexes.includes(module.index)
            : module
        }

        return module
      })
    } else {
      modulesToRun = modules
    }

    // loop through and run each module to check if a modal needs to be shown
    runModules(modulesToRun).then(
      (result: {
        modal: WalletCheckModal | undefined
        module: WalletCheckModule | undefined
      }) => {
        // no result then user has passed all conditions
        if (!result.modal) {
          blocknative.event({
            categoryCode: 'onboard',
            eventCode: 'onboardingCompleted'
          })

          handleExit()

          return
        }

        activeModal = result.modal
        currentModule = result.module

        // log the event code for this module
        blocknative.event({
          eventCode: activeModal.eventCode,
          categoryCode: 'onboard'
        })

        // run any actions that module require as part of this step
        if (activeModal.action) {
          doAction()
        }

        if (activeModal.loading) {
          loading = true
          activeModal.loading.then(() => (loading = false))
        }

        // poll to automatically to check if condition has been met
        pollingInterval = setInterval(async () => {
          if (currentModule) {
            const invalid = await invalidState(currentModule, get(state))
            if (!invalid && actionResolved !== false) {
              resetState()

              // delayed for animations
              setTimeout(() => {
                checkingModule = false
              }, 250)
            }
          }
        }, 500)
      }
    )
  }

  function doAction() {
    actionResolved = false

    activeModal &&
      activeModal.action &&
      activeModal
        .action()
        .then(() => (actionResolved = true))
        .catch((err: { message: string }) => {
          errorMsg = err.message
        })
  }

  function handleExit() {
    resetState()
    app.update((store: AppState) => ({
      ...store,
      walletCheckInProgress: false,
      walletCheckCompleted: false
    }))
  }

  function resetState() {
    clearInterval(pollingInterval)
    removeModuleIndexes = undefined
    errorMsg = ''
    actionResolved = undefined
    activeModal = undefined
    currentModule = undefined
  }

  function runModules(modules: WalletCheckModule[]) {
    loadingModal = true
    return new Promise(
      async (
        resolve: (result: {
          modal: WalletCheckModal | undefined
          module: WalletCheckModule | undefined
        }) => void
      ) => {
        for (const [index, module] of modules.entries()) {
          if (balanceSyncStatus.syncing) {
            try {
              await balanceSyncStatus.syncing
            } catch (error) {}

            balanceSyncStatus.syncing = null
          }

          const result = await invalidState(module, get(state), index)

          if (result) {
            loadingModal = false
            return resolve(result)
          }
        }

        loadingModal = false
        return resolve({ modal: undefined, module: undefined })
      }
    )
  }

  function next(index: number) {
    if (removeModuleIndexes) {
      removeModuleIndexes.push(index)
    } else {
      removeModuleIndexes = [index]
    }
    resetState()
  }

  async function invalidState(
    module: WalletCheckModule,
    state: UserState,
    index?: number
  ): Promise<
    { module: WalletCheckModule; modal: WalletCheckModal } | undefined
  > {
    const result = module(
      {
        ...state,
        BigNumber,
        walletSelect,
        exit: handleExit,
        wallet: get(wallet),
        next
      },
      index
    )

    if (result) {
      if (isCheckModal(result)) {
        validateModal(result)
        return {
          module,
          modal: result
        }
      } else {
        // module returned a promise, so await it for val
        const modal = await result
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
    justify-content: space-between;
  }
</style>

{#if loadingModal}
  <Modal closeable={false}>
    <Spinner />
  </Modal>
{/if}

{#if activeModal}
  <Modal closeModal={handleExit}>
    <ModalHeader icon={activeModal.icon} heading={activeModal.heading} />
    <p class="bn-onboard-custom bn-onboard-prepare-description">
      {@html activeModal.description}
    </p>
    {#if errorMsg}
      <span
        class:bn-onboard-dark-mode-background={$app.darkMode}
        class="bn-onboard-custom bn-onboard-prepare-error"
        in:fade>
        {errorMsg}
      </span>
    {/if}

    {#if activeModal.html}
      {@html activeModal.html}
    {/if}

    <div class="bn-onboard-custom bn-onboard-prepare-button-container">
      {#if activeModal.button}
        <Button onclick={activeModal.button.onclick}>
          {activeModal.button.text}
        </Button>
      {/if}
      {#if errorMsg}
        <Button onclick={doAction}>Try Again</Button>
      {:else}
        <div />
      {/if}
      {#if loading}
        <Spinner />
      {/if}
      <Button onclick={handleExit}>Dismiss</Button>
    </div>
  </Modal>
{/if}
