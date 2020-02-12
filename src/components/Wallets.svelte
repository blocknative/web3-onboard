<script lang="ts">
  import { onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import Button from '../elements/Button.svelte'
  import IconButton from '../elements/IconButton.svelte'
  import { wallet } from '../stores'
  import {
    WalletSelectModalData,
    WalletModule,
    WritableStore
  } from '../interfaces'
  export let modalData: WalletSelectModalData
  export let handleWalletSelect: (wallet: WalletModule) => void
  export let loadingWallet: string | undefined

  let showingAllWalletModules: boolean = false
  let selectedWallet: WritableStore

  const unsubscribe = wallet.subscribe(wallet => (selectedWallet = wallet))

  onDestroy(() => unsubscribe())
</script>

<style>
  /* .bn-onboard-modal-select-wallets */
  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    list-style-type: none;
    margin: 1.25em 0;
    max-height: 66vh;
    overflow-y: scroll;
    padding: 0;
    scrollbar-width: none;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.15;
    box-sizing: border-box;
  }

  ul li {
    padding: 0 0.25em;
  }

  div {
    width: 100%;
    display: flex;
    font-size: inherit;
    font-family: inherit;
    justify-content: center;
    margin-top: 1.25em;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 450px) {
    ul li {
      width: 100%;
    }

    ul {
      scrollbar-width: unset;
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
        svg={wallet.svg}
        text={wallet.name}
        currentlySelected={wallet.name === selectedWallet.name}
        {loadingWallet} />
    </li>
  {/each}

  {#if modalData.secondaryWallets && modalData.secondaryWallets.length && !showingAllWalletModules}
    <div>
      <Button onclick={() => (showingAllWalletModules = true)}>
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
          text={wallet.name}
          currentlySelected={wallet.name === selectedWallet.name}
          {loadingWallet} />
      </li>
    {/each}
  {/if}
</ul>
