<script>
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Modal from "./components/Modal.svelte";
  import ModalHeader from "./components/ModalHeader.svelte";
  import Button from "./elements/Button.svelte";
  import { blocknative } from "./services";
  import { app, state, syncingState } from "./stores";
  import { validateModal } from "./validation";

  let activeModal;
  let modules;
  let currentModule;
  let errorMsg;
  let pollingInterval;
  let checkingModule;

  // get the prepare wallet modules from the store
  app.subscribe(({ modules: { prepareWallet } }) => {
    modules = prepareWallet;
  });

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

        // blocknative.event({
        //   categoryCode: "onboard",
        //   eventCode: "onboardComplete"
        // });

        checkingModule = false;
        return;
      }

      activeModal = result.modal;
      currentModule = result.module;

      // log the event code for this module
      // blocknative.event({
      //   eventCode: activeModal.eventCode,
      //   categoryCode: "onboard"
      // });

      // run any actions that module require as part of this step
      if (activeModal.action) {
        activeModal.action().catch(err => {
          errorMsg = err.message;
        });
      }

      // poll to automatically to check if condition has been met
      pollingInterval = setInterval(async () => {
        const result = await invalidState(currentModule, state.get());
        if (!result) {
          clearInterval(pollingInterval);
          activeModal = null;
          currentModule = null;

          // delayed for animations
          setTimeout(() => {
            checkingModule = false;
          }, 250);
        }
      }, 500);
    });
  }

  async function handleClick() {
    const result = await invalidState(module, state.get());
    if (!result) {
      activeModal = null;
      currentModule = null;
    } else {
      errorMsg = result.modal.invalidMsg;
    }
  }

  function handleExit() {
    clearInterval(pollingInterval);
    app.update(store => ({ ...store, prepareWallet: false }));
    activeModal = null;
    currentModule = null;
  }

  function runModules(modules) {
    return new Promise(async resolve => {
      for (const module of modules) {
        if (syncingState) {
          await syncingState;
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
    const result = module(state);

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
    opacity: 0.7;
    font-size: 0.889rem;
  }

  /* .bn-onboard-prepare-error */
  span {
    color: #e2504a;
  }

  /* .bn-onboard-prepare-button-container */
  div {
    display: flex;
    justify-content: end;
  }
</style>

{#if activeModal}
  <Modal closeModal={handleExit}>
    <ModalHeader icon={activeModal.icon} heading={activeModal.heading} />
    <p class="bn-onboard-prepare-description">
      {@html activeModal.description}
    </p>
    {#if errorMsg}
      <span class="bn-onboard-prepare-error" in:fade>{errorMsg}</span>
    {/if}
    <div class="bn-onboard-prepare-button-container">
      <Button onclick={handleExit}>Dismiss</Button>
    </div>
  </Modal>
{/if}
