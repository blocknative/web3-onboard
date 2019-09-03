<script>
  import Button from "../elements/Button.svelte";
  import IconButton from "../elements/IconButton.svelte";
  import { fade } from "svelte/transition";
  export let selectedWallet;
  export let onBack;
  export let installMessage;
</script>

<style>
  div div {
    display: flex;
    justify-content: space-between;
  }
</style>

<div class="bn-onboard-modal-selected-wallet" in:fade>
  <IconButton
    iconSrc={selectedWallet.iconSrc}
    iconSrcSet={selectedWallet.iconSrcSet}
    text={selectedWallet.name} />

  {#if installMessage}
    {@html installMessage}
  {/if}

  <div class="bn-onboard-modal-selected-wallet-footer">
    <a href={selectedWallet.link} rel="noreferrer noopener" target="_blank">
      <Button>Install {selectedWallet.name}</Button>
    </a>
    <Button onclick={onBack}>Back</Button>
  </div>
</div>
