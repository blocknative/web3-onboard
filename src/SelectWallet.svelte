<script>
  import { blocknative } from "./services";
  import { app, state, walletInterface, provider } from "./stores";
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Modal from "./components/Modal.svelte";
  import walletIcon from "./assets/icons/icon-wallet.svg";

  import {
    getProviderName,
    createLegacyProviderInterface,
    createModernProviderInterface
  } from "./provider";

  const { mobileDevice } = state.get();

  let modalData;
  let showWalletDefinition;

  app.subscribe(({ modules: { selectWallet } }) => {
    const moduleType = mobileDevice ? "mobile" : "desktop";
    const { wallets, ...details } = selectWallet;
    // get the modules based on device type
    const walletModules = wallets[moduleType];
    // set the data to show in the modal
    modalData = { ...details, walletModules };
  });

  function handleWalletSelect(walletModule) {
    const wallet = walletModule.wallet({
      getProviderName,
      createLegacyProviderInterface,
      createModernProviderInterface
    });

    if (!wallet.interface) {
      // @TODO - handle wallet not being installed here
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
</script>

<style>
  .bn-select-wallet-header {
    display: flex;
    align-items: center;
  }

  .bn-select-wallet-header-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.66rem;
    padding: 0.66rem;
    border-radius: 30px;
    background-color: #eeeeee;
  }

  .bn-select-wallet-header-icon img {
    height: 100%;
    width: auto;
  }

  .bn-select-wallet-header-heading {
    color: #4a4a4a;
    font-weight: bold;
    font-size: 1.33rem;
    margin: 0 0 0 1rem;
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
    margin: 0;
    padding: 0;
  }

  .bn-wallet {
    display: flex;
    align-items: center;
    padding: 0.66rem 1rem;
    border-radius: 30px;
    margin: 0 0.66rem 0.66rem 0;
    transition: box-shadow 150ms ease-in-out;
  }

  .bn-wallet:hover {
    cursor: pointer;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .bn-wallet:active {
    box-shadow: 0 2px 10px 0 #ffffff;
  }

  .bn-wallet-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  .bn-wallet-icon img {
    width: auto;
    height: 100%;
  }

  .bn-wallet-name {
    margin-left: 0.66rem;
    font-weight: bold;
    color: #727272;
  }

  .bn-select-wallet-info {
    color: #4a90e2;
  }

  .bn-select-wallet-info:hover {
    cursor: pointer;
  }

  .bn-select-wallet-definition {
    max-width: 40rem;
    color: #727272;
    font-size: 0.889rem;
  }

  /* 
  .bn-wallet-install {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 15rem;
  }

  .bn-link-button {
    text-decoration: none;
    color: black;
    padding: 1rem;
    margin: 1rem;
    border: 1px solid gray;
    border-radius: 20px;
    transition: background 150ms ease-in-out;
  }

  .bn-link-button:hover {
    cursor: pointer;
    background: gray;
  } */
</style>

{#if modalData}
  <Modal
    closeModal={() => {
      modalData = null;
      app.update(store => ({
        ...store,
        selectWallet: false,
        selectWalletCompleted: false
      }));
    }}>
    <div>
      <div class="bn-select-wallet-header">
        <div class="bn-select-wallet-header-icon">
          <img src={walletIcon} alt="wallet" />
        </div>
        <h3 class="bn-select-wallet-header-heading">{modalData.heading}</h3>
      </div>
      <p class="bn-select-wallet-description">{modalData.description}</p>
      <ul class="bn-wallets">
        {#each modalData.walletModules as wallet}
          <li class="bn-wallet" on:click={() => handleWalletSelect(wallet)}>
            <div class="bn-wallet-icon">
              <img
                src={wallet.iconSrc}
                srcset={wallet.iconSrcSet}
                alt={wallet.name} />
            </div>
            <span class="bn-wallet-name">{wallet.name}</span>
          </li>
        {/each}
      </ul>
      <span
        class="bn-select-wallet-info"
        on:click={() => (showWalletDefinition = true)}>
        What is a wallet?
      </span>
      {#if showWalletDefinition}
        <p in:fade class="bn-select-wallet-definition">
          Wallets are used to send, receive, and store digital assets like
          Ethereum. Wallets come in many forms. They are either built into your
          browser, an extension added to your browser, a piece of hardware
          plugged into your computer or even an app on your phone. They are
          hyper secure, and can be used for any other blockchain application you
          may want to use.
        </p>
      {/if}
    </div>
  </Modal>
{/if}

<!-- {#if installMessage}
        <div transition:fade class="bn-wallet-install">
          <div>{installMessage}</div>
          <a
            class="bn-link-button"
            href={walletInfo.link}
            target="_blank"
            rel="noreferrer noopener">
            Install {walletInfo.name}
          </a>
          <div>
            Hint: if you already have {walletInfo.name} installed, try disabling
            the {walletInfo.currentProvider} extension and refreshing the page
            so that we can see it.
          </div>
        </div>
      {/if} -->
