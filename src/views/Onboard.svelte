<script>
  import WalletSelect from "./WalletSelect.svelte";
  import WalletReady from "./WalletReady.svelte";
  import { app } from "../stores";

  export let walletSelectModule;
  export let walletReadyModules;
  export let walletSelect;
</script>

<style>
  :global(.bn-onboard-custom.bn-onboard-dark-mode) {
    background: #283944;
    color: #ffffff;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-background-hover:hover, .bn-onboard-custom.bn-onboard-dark-mode-background) {
    background: #0e212a;
  }

  :global(.bn-onboard-clickable:hover) {
    cursor: pointer;
    text-decoration: underline;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-link) {
    color: #91bced;
    border-color: #91bced;
  }
</style>

{#if $app.walletSelectInProgress}
  <WalletSelect module={walletSelectModule} />
{/if}

{#if $app.walletReadyInProgress}
  <WalletReady modules={walletReadyModules} {walletSelect} />
{/if}
