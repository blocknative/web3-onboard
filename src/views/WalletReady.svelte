<script lang="ts">
  import { get } from "svelte/store";

  import { fade } from "svelte/transition";
  import BigNumber from "bignumber.js";

  import { getBlocknative } from "../services";
  import { app, state, balanceSyncStatus } from "../stores";
  import { validateModal } from "../validation";

  import Modal from "../components/Modal.svelte";
  import ModalHeader from "../components/ModalHeader.svelte";
  import Button from "../elements/Button.svelte";
  import Spinner from "../elements/Spinner.svelte";

  import {
    WalletReadyModule,
    WalletSelectFunction,
    AppState,
    ReadyModal,
    UserState
  } from "../interfaces";

  export let modules: WalletReadyModule[] = [];
  export let walletSelect: WalletSelectFunction;

  const blocknative = getBlocknative();

  let activeModal: ReadyModal | undefined = undefined;
  let currentModule: WalletReadyModule | undefined = undefined;
  let errorMsg: string;
  let pollingInterval: any;
  let checkingModule: boolean = false;
  let actionResolved: boolean | undefined = undefined;
  let loading: boolean;

  // recheck modules if below conditions
  $: if (!activeModal && !checkingModule) {
    checkingModule = true;

    // loop through and run each module to check if a modal needs to be shown
    runModules(modules).then(
      (result: {
        modal: ReadyModal | undefined;
        module: WalletReadyModule | undefined;
      }) => {
        // no result then user has passed all conditions
        if (!result.modal) {
          app.update(store => ({
            ...store,
            walletReadyInProgress: false,
            walletReadyCompleted: true
          }));

          blocknative.event({
            categoryCode: "onboard",
            eventCode: "onboardingCompleted"
          });

          checkingModule = false;
          return;
        }

        activeModal = result.modal;
        currentModule = result.module;

        // log the event code for this module
        blocknative.event({
          eventCode: activeModal.eventCode,
          categoryCode: "onboard"
        });

        // run any actions that module require as part of this step
        if (activeModal.action) {
          doAction();
        }

        if (activeModal.loading) {
          loading = true;
          activeModal.loading().then(() => (loading = false));
        }

        // poll to automatically to check if condition has been met
        pollingInterval = setInterval(async () => {
          if (currentModule) {
            const invalid = await invalidState(currentModule, get(state));
            if (!invalid && actionResolved !== false) {
              resetState();

              // delayed for animations
              setTimeout(() => {
                checkingModule = false;
              }, 250);
            }
          }
        }, 500);
      }
    );
  }

  function doAction() {
    actionResolved = false;

    activeModal &&
      activeModal.action &&
      activeModal
        .action()
        .then(() => (actionResolved = true))
        .catch((err: { message: string }) => {
          errorMsg = err.message;
        });
  }

  function handleExit() {
    app.update((store: AppState) => ({
      ...store,
      walletReadyInProgress: false
    }));
    resetState();
  }

  function resetState() {
    clearInterval(pollingInterval);
    errorMsg = "";
    actionResolved = undefined;
    activeModal = undefined;
    currentModule = undefined;
  }

  function runModules(modules: WalletReadyModule[]) {
    return new Promise(
      async (
        resolve: (result: {
          modal: ReadyModal | undefined;
          module: WalletReadyModule | undefined;
        }) => void
      ) => {
        for (const module of modules) {
          if (balanceSyncStatus.syncing) {
            await balanceSyncStatus.syncing.catch(() => {});
            balanceSyncStatus.syncing = null;
          }

          const result = await invalidState(module, get(state));

          if (result) {
            return resolve(result);
          }
        }

        return resolve({ modal: undefined, module: undefined });
      }
    );
  }

  async function invalidState(
    module: WalletReadyModule,
    state: UserState
  ): Promise<{ module: WalletReadyModule; modal: ReadyModal } | undefined> {
    const result = module({
      ...state,
      BigNumber,
      walletSelect,
      exit: handleExit
    });

    if (result) {
      if (isReadyModal(result)) {
        validateModal(result);
        return {
          module,
          modal: result
        };
      } else {
        // module returned a promise, so await it for val
        const modal = await result;
        if (modal) {
          validateModal(modal);
          return {
            module,
            modal
          };
        }
      }
    }
  }

  function isReadyModal(
    val: ReadyModal | Promise<ReadyModal | undefined>
  ): val is ReadyModal {
    return (val as ReadyModal).heading !== undefined;
  }
</script>

<style>
  /* .bn-onboard-prepare-description */
  p {
    font-size: 0.889em;
    font-family: "Helvetica Neue";
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
