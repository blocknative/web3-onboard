<script>
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { blocknative } from "./services";
  import { app, state, syncingState } from "./stores";
  import { validateModal } from "./validation";

  let activeModal;
  let modules;
  let currentModule;
  let errorMsg;
  let pollingInterval;
  let checkingModule;

  app.subscribe(({ modules: { prepareWallet } }) => {
    modules = prepareWallet;
  });

  $: if (!activeModal && !checkingModule) {
    checkingModule = true;

    getFirstValidModal(modules).then(result => {
      activeModal = result.modal;
      currentModule = result.module;

      if (activeModal) {
        blocknative.event({
          eventCode: activeModal.eventCode,
          categoryCode: "onboard"
        });

        if (activeModal.action) {
          activeModal.action().catch(err => {
            errorMsg = err;
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
      } else {
        app.update(store => ({
          ...store,
          prepareWallet: false,
          prepareWalletCompleted: true
        }));

        blocknative.event({
          categoryCode: "onboard",
          eventCode: "onboardComplete"
        });

        checkingModule = false;
      }
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

  function getFirstValidModal(modules) {
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

      return resolve({});
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
  .bn-onboard-main {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #282828;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 30rem;
    height: 20rem;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 1rem;
    border: 1px solid gray;
    border-radius: 50%;
  }

  .close:hover {
    cursor: pointer;
  }

  .bn-loading-spinner {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 1rem;
    border: 1px solid gray;
    border-radius: 8px;
    animation: spin 500ms linear infinite;
    z-index: 999999999;
  }

  .bn-prepare-error {
    color: red;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>

{#if !activeModal}
  <span class="bn-loading-spinner">...</span>
{/if}

{#if activeModal}
  <div
    transition:fly={{ delay: 150, duration: 300, x: 400, easing: quintOut }}
    class="bn-onboard-main">
    {#if activeModal.img}
      <div>
        <img src={activeModal.img} alt={activeModal.heading} />
      </div>
    {/if}
    <h2>{activeModal.heading}</h2>
    <p>{activeModal.description}</p>
    {#if activeModal.reloadWindow}
      <button on:click={handleClick}>{activeModal.button}</button>
    {/if}
    {#if errorMsg}
      <span class="bn-prepare-error">{errorMsg}</span>
    {/if}
    <span on:click={handleExit} class="close">X</span>
  </div>
{/if}
