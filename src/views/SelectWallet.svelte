<script>
  import { app, state, walletInterface, provider } from "../stores";
  import { fade } from "svelte/transition";
  import Modal from "../components/Modal.svelte";
  import ModalHeader from "../components/ModalHeader.svelte";
  import Wallets from "../components/Wallets.svelte";
  import SelectedWallet from "../components/SelectedWallet.svelte";
  import Button from "../elements/Button.svelte";
  import IconButton from "../elements/IconButton.svelte";
  import walletIcon from "../elements/walletIcon";

  import {
    getProviderName,
    createLegacyProviderInterface,
    createModernProviderInterface
  } from "../provider";

  const { mobileDevice } = state.get();

  let modalData;
  let showWalletDefinition;

  let selectedWallet;
  let walletAlreadyInstalled;
  let installMessage;

  app.subscribe(({ modules: { selectWallet } }) => {
    const moduleType = mobileDevice ? "mobile" : "desktop";
    const { wallets, ...details } = selectWallet;

    // get the modules based on device type
    const allWalletModules = wallets[moduleType];

    let walletModules;
    let extraWalletModules;

    if (allWalletModules.find(wallet => wallet.preferred)) {
      // if preferred wallets, then split in to preferred and not preferred
      walletModules = allWalletModules.filter(wallet => wallet.preferred);
      extraWalletModules = allWalletModules.filter(wallet => !wallet.preferred);
    } else {
      // otherwise make the first 4 wallets preferred
      walletModules = allWalletModules.slice(0, 4);
      extraWalletModules =
        allWalletModules.length > 4 && allWalletModules.slice(4);
    }

    // set the data to show in the modal
    modalData = { ...details, walletModules, extraWalletModules };
  });

  function handleWalletSelect(walletModule) {
    let wallet;
    try {
      wallet = walletModule.wallet({
        getProviderName,
        createLegacyProviderInterface,
        createModernProviderInterface
      });
    } catch (err) {
      throw new Error(err);
      return;
    }

    if (!wallet.interface) {
      selectedWallet = walletModule;
      walletAlreadyInstalled =
        wallet.provider && getProviderName(wallet.provider);
      installMessage = walletModule.installMessage({
        currentWallet: walletAlreadyInstalled,
        selectedWallet: selectedWallet.name
      });
      return;
    }

    walletInterface.update(currentInterface => {
      if (currentInterface && currentInterface.disconnect) {
        currentInterface.disconnect();
      }

      return wallet.interface;
    });

    provider.set(wallet.provider);
    modalData = null;
    app.update(store => ({
      ...store,
      selectWallet: false,
      selectWalletCompleted: true
    }));
  }

  function closeModal() {
    modalData = null;
    app.update(store => ({
      ...store,
      selectWallet: false,
      selectWalletCompleted: false
    }));
  }
</script>

<style>
  /* .bn-onboard-select-description, .bn-onboard-select-wallet-definition */
  p {
    font-size: 0.889rem;
    margin: 1rem 0 0 0;
  }

  /* .bn-onboard-select-info-container */
  div {
    display: flex;
    justify-content: space-between;
  }

  /* .bn-onboard-select-wallet-info */
  div span {
    color: #4a90e2;
    margin-top: 0.66rem;
    cursor: pointer;
  }
</style>

{#if modalData}
  <Modal {closeModal}>
    <ModalHeader icon={walletIcon} heading={modalData.heading} />
    {#if !selectedWallet}
      <p class="bn-onboard-custom bn-onboard-select-description">
        {modalData.description}
      </p>
      <Wallets {modalData} {handleWalletSelect} />
      <div class="bn-onboard-custom bn-onboard-select-info-container">
        <span
          class="bn-onboard-custom bn-onboard-select-wallet-info"
          on:click={() => (showWalletDefinition = !showWalletDefinition)}>
          What is a wallet?
        </span>
        {#if mobileDevice}
          <Button onclick={closeModal}>Dismiss</Button>
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
        {selectedWallet}
        onBack={() => {
          selectedWallet = null;
          walletAlreadyInstalled = null;
        }}
        {installMessage} />
    {/if}
  </Modal>
{/if}
