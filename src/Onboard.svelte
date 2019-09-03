<script>
  import SelectWallet from "./SelectWallet.svelte";
  import PrepareWallet from "./PrepareWallet.svelte";
  import { app } from "./stores";
</script>

<style>
  :global(.bn-onboard-custom.bn-onboard-dark-mode) {
    background: #283944;
    color: #ffffff;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-background, .bn-onboard-dark-mode-background:hover) {
    background: #0e212a;
  }
</style>

{#if $app.selectWallet}
  <SelectWallet />
{/if}

{#if $app.prepareWallet}
  <PrepareWallet />
{/if}
