<script>
  import SelectWallet from "./SelectWallet.svelte";
  import PrepareWallet from "./PrepareWallet.svelte";
  import { app } from "./stores";
</script>

<style>

</style>

{#if $app.selectWallet}
  <SelectWallet />
{/if}

{#if $app.prepareWallet}
  <PrepareWallet />
{/if}
