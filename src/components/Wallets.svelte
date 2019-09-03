<script>
  import { fade } from "svelte/transition";
  import Button from "../elements/Button.svelte";
  import IconButton from "../elements/IconButton.svelte";
  export let modalData;
  export let handleWalletSelect;

  let showingAllWalletModules;
</script>

<style>
  /* .bn-onboard-modal-select-wallets */
  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    list-style-type: none;
    margin-bottom: 0.66rem;
    padding: 0;
  }

  @media only screen and (max-width: 700px) {
    ul li {
      width: 100%;
    }
  }
</style>

<ul class="bn-onboard-custom bn-onboard-modal-select-wallets">
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
    <Button highlight={true} onclick={() => (showingAllWalletModules = true)}>
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
