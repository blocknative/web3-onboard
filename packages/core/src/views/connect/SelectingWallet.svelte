<script lang="ts">
  import { state } from '../../store'
  import type { WalletWithLoadingIcon } from '../../types'
  import Warning from '../shared/Warning.svelte'
  import WalletButton from './WalletButton.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadingIcon) => Promise<void>
  export let connectingWalletLabel: string
  export let connectingErrorMessage: string

  function checkConnected(label: string) {
    const { wallets } = state.get()
    return !!wallets.find(wallet => wallet.label === label)
  }
</script>

<style>
  .outer-container {
    display: flex;
    flex-direction: column;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    padding-top: 0;
  }

  .wallets-container {
    display: grid;
    grid-template-columns: repeat(var(--onboard-wallet-columns, 2), 1fr);
    gap: var(--onboard-spacing-5, var(--spacing-5));
    width: 100%;
  }

  .warning-container {
    margin-bottom: 1rem;
  }

  @media all and (max-width: 520px) {
    .wallets-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>

<div class="outer-container">
  {#if connectingErrorMessage}
    <div class="warning-container">
      <Warning>{@html connectingErrorMessage}</Warning>
    </div>
  {/if}

  <div class="wallets-container">
    {#each wallets as wallet}
      <WalletButton
        connected={checkConnected(wallet.label)}
        connecting={connectingWalletLabel === wallet.label}
        label={wallet.label}
        icon={wallet.icon}
        onClick={() => selectWallet(wallet)}
      />
    {/each}
  </div>
</div>
