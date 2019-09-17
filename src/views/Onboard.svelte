<script>
  import SelectWallet from "./SelectWallet.svelte";
  import PrepareWallet from "./PrepareWallet.svelte";
  import { app } from "../stores";

  export let onboardingModules;
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

{#if $app.selectWallet}
  <SelectWallet />
{/if}

{#if $app.prepareWallet}
  <PrepareWallet modules={onboardingModules} />
{/if}
