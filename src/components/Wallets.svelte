<script lang="ts">
  import { onDestroy } from 'svelte'
  import Button from '../elements/Button.svelte'
  import IconButton from '../elements/IconButton.svelte'
  import { app, wallet } from '../stores'
  import {
    WalletSelectModalData,
    WalletModule,
    WritableStore
  } from '../interfaces'
  export let modalData: WalletSelectModalData
  export let handleWalletSelect: (wallet: WalletModule) => void
  export let loadingWallet: string | undefined
  export let showingAllWalletModules: boolean = false
  export let showAllWallets: () => void
  let selectedWallet: WritableStore

  const unsubscribe = wallet.subscribe(wallet => (selectedWallet = wallet))

  onDestroy(() => unsubscribe())

 $: buttonsDisabled = $app.agreement?.terms === false || $app.agreement?.privacy === false
</script>

<style>
  /* .bn-onboard-modal-select-wallets */
  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    list-style-type: none;
    margin: 1.25em 0;
    padding: 0;
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
      max-height: 66vh;
      overflow-y: scroll;
    }
  }
</style>

<ul class="bn-onboard-custom bn-onboard-modal-select-wallets">
  {#each modalData.primaryWallets as wallet, i (wallet.name)}
    <li>
      <IconButton
        disabled={buttonsDisabled}
        onclick={() => handleWalletSelect(wallet)}
        iconSrc={wallet.iconSrc}
        iconSrcSet={wallet.iconSrcSet}
        svg={wallet.svg}
        text={wallet.name}
        currentlySelected={wallet.name === selectedWallet.name}
        {loadingWallet}
      />
    </li>
  {/each}

  {#if modalData.secondaryWallets && modalData.secondaryWallets.length && !showingAllWalletModules}
    <div>
      <Button disabled={buttonsDisabled} onclick={showAllWallets}
        >Show More</Button
      >
    </div>
  {/if}

  {#if showingAllWalletModules}
    {#each modalData.secondaryWallets as wallet, i (wallet.name)}
      <li>
        <IconButton
          disabled={buttonsDisabled}
          onclick={() => handleWalletSelect(wallet)}
          iconSrc={wallet.iconSrc}
          iconSrcSet={wallet.iconSrcSet}
          svg={wallet.svg}
          text={wallet.name}
          currentlySelected={wallet.name === selectedWallet.name}
          {loadingWallet}
        />
      </li>
    {/each}
  {/if}
</ul>
