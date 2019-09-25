<script>
  import { fade } from "svelte/transition";
  import BigNumber from "bignumber.js";

  import { selectWallet } from "../api";
  import { getBlocknative } from "../services";

  import Modal from "../components/Modal.svelte";
  import ModalHeader from "../components/ModalHeader.svelte";

  import Button from "../elements/Button.svelte";

  import { app, state, balanceSyncStatus } from "../stores";
  import { validateModal } from "../validation";

  export let modules;

  const blocknative = getBlocknative();

  let activeModal;
  let currentModule;
  let errorMsg;
  let pollingInterval;
  let checkingModule;
  let actionResolved;

  // recheck modules if below conditions
  $: if (!activeModal && !checkingModule) {
    checkingModule = true;

    // loop through and run each module to check if a modal needs to be shown
    runModules(modules).then(result => {
      // no result then user has passed all conditions
      if (!result) {
        app.update(store => ({
          ...store,
          prepareWallet: false,
          prepareWalletCompleted: true
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

      // poll to automatically to check if condition has been met
      pollingInterval = setInterval(async () => {
        const invalid = await invalidState(currentModule, state.get());
        if (!invalid && actionResolved !== false) {
          resetState();

          // delayed for animations
          setTimeout(() => {
            checkingModule = false;
          }, 250);
        }
      }, 500);
    });
  }

  function doAction() {
    actionResolved = false;

    activeModal
      .action()
      .then(() => (actionResolved = true))
      .catch(err => {
        errorMsg = err.message;
      });
  }

  function handleExit() {
    app.update(store => ({ ...store, prepareWallet: false }));
    resetState();
  }

  function resetState() {
    clearInterval(pollingInterval);
    errorMsg = null;
    actionResolved = null;
    activeModal = null;
    currentModule = null;
  }

  function runModules(modules) {
    return new Promise(async resolve => {
      for (const module of modules) {
        if (balanceSyncStatus.syncing) {
          await balanceSyncStatus.syncing.catch(() => {});
        }

        const isInvalid = await invalidState(module, state.get());

        if (isInvalid) {
          return resolve(isInvalid);
        }
      }

      return resolve(false);
    });
  }

  async function invalidState(module, state) {
    const result = module({
      ...state,
      BigNumber,
      selectWallet,
      exitPrepareWallet: handleExit
    });

    if (result) {
      // module returned a promise, so await it for val
      if (result.then) {
        const modal = await result;
        if (modal) {
          validateModal(modal);
          return {
            module,
            modal
          };
        }
      }

      validateModal(result);
      return {
        module,
        modal: result
      };
    }
  }
</script>

<style>
  /* .bn-onboard-prepare-description */
  p {
    font-size: 0.889rem;
  }

  /* .bn-onboard-prepare-error */
  span {
    color: #e2504a;
    font-size: 0.889rem;
    display: block;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
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
      <Button onclick={handleExit}>Dismiss</Button>
    </div>
  </Modal>
{/if}
