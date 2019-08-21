<script>
  import { blocknative } from "./services";
  import { app, state, walletInterface, provider } from "./stores";
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Modal from "./components/Modal.svelte";
  import ModalHeader from "./components/ModalHeader.svelte";
  import Button from "./elements/Button.svelte";
  import IconButton from "./elements/IconButton.svelte";
  import walletIcon from "./assets/icons/icon-wallet.svg";

  import {
    getProviderName,
    createLegacyProviderInterface,
    createModernProviderInterface
  } from "./provider";

  const { mobileDevice } = state.get();

  let modalData;
  let showWalletDefinition;
  let showingAllWalletModules;

  let selectedWallet;
  let walletAlreadyInstalled;
  let installMessage;

  app.subscribe(({ modules: { selectWallet } }) => {
    const moduleType = mobileDevice ? "mobile" : "desktop";
    const { wallets, ...details } = selectWallet;

    // get the modules based on device type
    const allWalletModules = wallets[moduleType];

    // only display first 4 modules
    const walletModules =
      allWalletModules.length > 4
        ? allWalletModules.slice(0, 4)
        : allWalletModules;
    const extraWalletModules =
      allWalletModules.length > 4 && allWalletModules.slice(4);

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

    walletInterface.set(wallet.interface);
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
  a {
    text-decoration: none;
  }

  .bn-select-wallet-description {
    color: #727272;
    font-size: 0.889rem;
    margin: 1rem 0;
  }

  .bn-wallets {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    list-style-type: none;
    margin-bottom: 0.66rem;
    padding: 0;
  }

  .bn-select-wallet-info {
    color: #4a90e2;
    margin-top: 0.66rem;
  }

  .bn-select-wallet-info:hover {
    cursor: pointer;
  }

  .bn-select-wallet-definition {
    color: #727272;
    font-size: 0.889rem;
    margin-bottom: 0;
  }

  .bn-select-wallet-footer {
    display: flex;
    justify-content: space-between;
  }

  :global(.bn-clickable:hover) {
    cursor: pointer;
  }

  .bn-info-container {
    display: flex;
    justify-content: space-between;
  }

  @media only screen and (max-width: 700px) {
    .bn-wallets li {
      width: 100%;
    }
  }
</style>

{#if modalData}
  <Modal {closeModal}>
    <div>
      <ModalHeader icon={walletIcon} heading={modalData.heading} />
      {#if !selectedWallet}
        <p class="bn-select-wallet-description">{modalData.description}</p>
        <ul class="bn-wallets">
          {#each modalData.walletModules as wallet}
            <li in:fade>
              <IconButton
                onclick={() => handleWalletSelect(wallet)}
                iconSrc={wallet.iconSrc}
                iconSrcSet={wallet.iconSrcSet}
                text={wallet.name} />
            </li>
          {/each}

          {#if modalData.extraWalletModules && !showingAllWalletModules}
            <Button
              highlight={true}
              onclick={() => (showingAllWalletModules = true)}>
              Show More
            </Button>
          {/if}

          {#if showingAllWalletModules}
            {#each modalData.extraWalletModules as wallet}
              <li in:fade>
                <IconButton
                  onclick={() => handleWalletSelect(wallet)}
                  iconSrc={wallet.iconSrc}
                  iconSrcSet={wallet.iconSrcSet}
                  text={wallet.name} />
              </li>
            {/each}
          {/if}
        </ul>
        <div class="bn-info-container">
          <span
            class="bn-select-wallet-info"
            on:click={() => (showWalletDefinition = true)}>
            What is a wallet?
          </span>
          {#if mobileDevice}
            <Button onclick={closeModal}>Dismiss</Button>
          {/if}
        </div>
        {#if showWalletDefinition}
          <p in:fade class="bn-select-wallet-definition">
            Wallets are used to send, receive, and store digital assets like
            Ethereum. Wallets come in many forms. They are either built into
            your browser, an extension added to your browser, a piece of
            hardware plugged into your computer or even an app on your phone.
            They are hyper secure, and can be used for any other blockchain
            application you may want to use.
          </p>
        {/if}
      {:else}
        <div class="bn-selected-wallet" in:fade>
          <IconButton
            iconSrc={selectedWallet.iconSrc}
            iconSrcSet={selectedWallet.iconSrcSet}
            text={selectedWallet.name} />

          {#if installMessage}
            {@html installMessage}
          {/if}

          <div class="bn-select-wallet-footer">
            <a
              href={selectedWallet.link}
              rel="noreferrer noopener"
              target="_blank">
              <Button>Install {selectedWallet.name}</Button>
            </a>
            <Button
              onclick={() => {
                selectedWallet = null;
                walletAlreadyInstalled = null;
              }}>
              Back
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </Modal>
{/if}
