<script lang="ts">
  import { _ } from 'svelte-i18n'

  import { state } from '../../store'
  import type { WalletWithLoadedIcon, WalletWithLoadingIcon } from '../../types'
  import en from '../../i18n/en.json'

  import LoadingWalletButton from './LoadingWalletButton.svelte'
  import WalletButton from './WalletButton.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadedIcon) => void

  const NUM_PRIMARY_WALLETS = 6

  const primaryWallets = wallets.slice(0, NUM_PRIMARY_WALLETS)
  const secondaryWallets = wallets.slice(NUM_PRIMARY_WALLETS)

  let showSecondaryWallets = false

  function checkConnected(label: string) {
    const { wallets } = state.get()
    return !!wallets.find(wallet => wallet.label === label)
  }
</script>

<style>
  .outer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .wallets-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    width: 100%;
  }

  .button-1 {
    margin: 1.5rem 0;
  }
</style>

<div class="outer-container">
  <div class="wallets-container">
    {#each primaryWallets as { label, icon: iconProm, getInterface }}
      {#await iconProm}
        <LoadingWalletButton {label} />
      {:then icon}
        <WalletButton
          connected={checkConnected(label)}
          {label}
          {icon}
          onClick={() => selectWallet({ label, icon, getInterface })}
        />
      {/await}
    {/each}

    {#if showSecondaryWallets}
      {#each secondaryWallets as { label, icon: iconProm, getInterface }}
        {#await iconProm}
          <LoadingWalletButton {label} />
        {:then icon}
          <WalletButton
            connected={checkConnected(label)}
            {label}
            {icon}
            onClick={() => selectWallet({ label, icon, getInterface })}
          />
        {/await}
      {/each}
    {/if}
  </div>

  {#if !showSecondaryWallets && primaryWallets.length > NUM_PRIMARY_WALLETS}
    <button class="button-1" on:click={() => (showSecondaryWallets = true)}
      >{$_(`connect.selectingWallet.primaryButton`, {
        default: en.connect.selectingWallet.primaryButton
      })}</button
    >
  {/if}
</div>
