<script lang="ts">
  import Button from '../elements/Button.svelte'
  import IconDisplay from '../elements/IconDisplay.svelte'
  import { fade } from 'svelte/transition'
  import { WalletModule } from '../interfaces'
  export let selectedWalletModule: WalletModule
  export let onBack: () => void
  export let installMessage: string
</script>

<style>
  section {
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    display: block;
  }

  footer {
    display: flex;
    font-size: inherit;
    font-family: inherit;
    justify-content: space-between;
  }
</style>

<section class="bn-onboard-custom bn-onboard-modal-selected-wallet" in:fade>
  <IconDisplay
    iconSrc={selectedWalletModule.iconSrc}
    iconSrcSet={selectedWalletModule.iconSrcSet}
    svg={selectedWalletModule.svg}
    text={selectedWalletModule.name} />

  {#if installMessage}
    {@html installMessage}
  {/if}

  <footer class="bn-onboard-custom bn-onboard-modal-selected-wallet-footer">
    <a
      href={selectedWalletModule.link}
      rel="noreferrer noopener"
      target="_blank">
      <Button>Open or install {selectedWalletModule.name}</Button>
    </a>
    <Button onclick={onBack}>Back</Button>
  </footer>
</section>
