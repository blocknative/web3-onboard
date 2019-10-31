<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "../elements/Button.svelte";
  import IconButton from "../elements/IconButton.svelte";
  import { SelectModalData, WalletModule } from "../interfaces";
  export let modalData: SelectModalData;
  export let handleWalletSelect: (wallet: WalletModule) => void;

  let showingAllWalletModules: boolean = false;
</script>

<style>
  /* .bn-onboard-modal-select-wallets */
  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    list-style-type: none;
    margin: 1rem 0 0.66rem 0;
    padding: 0;
    font-family: "Helvetica Neue";
    line-height: 1.15;
    box-sizing: border-box;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: 700px) {
    ul li {
      width: 100%;
    }
  }
</style>

<ul class="bn-onboard-custom bn-onboard-modal-select-wallets">
  {#each modalData.primaryWallets as wallet}
    <li in:fade>
      <IconButton
        onclick={() => handleWalletSelect(wallet)}
        iconSrc={wallet.iconSrc}
        iconSrcSet={wallet.iconSrcSet}
        text={wallet.name} />
    </li>
  {/each}

  {#if modalData.secondaryWallets && !showingAllWalletModules}
    <div>
      <Button highlight={true} onclick={() => (showingAllWalletModules = true)}>
        Show More
      </Button>
    </div>
  {/if}

  {#if showingAllWalletModules}
    {#each modalData.secondaryWallets as wallet}
      <li in:fade>
        <IconButton
          onclick={() => handleWalletSelect(wallet)}
          iconSrc={wallet.iconSrc}
          iconSrcSet={wallet.iconSrcSet}
          svg={wallet.svg}
          text={wallet.name} />
      </li>
    {/each}
  {/if}
</ul>
