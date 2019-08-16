<script>
  import { blocknative } from "./services";
  import { app, state, providerInterface } from "./stores";
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import {
    getProviderName,
    createLegacyProviderInterface,
    createModernProviderInterface
  } from "./provider";

  const { mobileDevice } = state.get();

  let modal;
  let installMessage;
  let walletInfo;

  app.subscribe(({ modules: { selectWallet } }) => {
    const moduleType = mobileDevice ? "mobile" : "desktop";
    const wallets = selectWallet.wallets[moduleType];
    modal = { ...selectWallet, wallets };
  });

  function handleWalletSelect(wallet) {
    const provider = wallet.connect({
      getProviderName,
      createLegacyProviderInterface,
      createModernProviderInterface
    });

    if (typeof provider === "string") {
      walletInfo = {
        name: wallet.name,
        link: wallet.link,
        currentProvider: provider
      };
      installMessage = wallet.installMessage(provider);
      return;
    }

    providerInterface.set(provider);
    modal = null;
    app.update(store => ({ ...store, selectWallet: false }));
  }
</script>

<style>
  .bn-ui {
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
  }

  .bn-wallets {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    list-style-type: none;
  }

  .bn-wallet {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #282828;
    border-radius: 4px;
    margin: 0.5rem;
    transition: background 150ms ease-in-out;
  }

  .bn-wallet:hover {
    cursor: pointer;
    background: gray;
  }

  .bn-wallet-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
  }

  .bn-wallet-icon {
    width: 100%;
    height: auto;
  }

  .bn-wallet-name {
    margin-top: 0.5rem;
  }

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
  }
</style>

{#if modal}
  <div
    transition:fly={{ delay: 150, duration: 300, x: 400, easing: quintOut }}
    class="bn-ui">
    <h3>{modal.heading}</h3>
    <p>{modal.description}</p>
    <ul class="bn-wallets">
      {#each modal.wallets as wallet}
        <li class="bn-wallet" on:click={() => handleWalletSelect(wallet)}>
          <div class="bn-wallet-icon-container">
            <img class="bn-wallet-icon" src={wallet.icon} alt={wallet.name} />
          </div>
          <span class="bn-wallet-name">{wallet.name}</span>
        </li>
      {/each}
    </ul>
    {#if installMessage}
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
          the {walletInfo.currentProvider} extension and refreshing the page so
          that we can see it.
        </div>
      </div>
    {/if}
  </div>
{/if}
