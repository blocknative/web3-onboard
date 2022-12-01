<script lang="ts">
  import { state } from '../../store/index.js'
  import type { WalletWithLoadingIcon } from '../../types.js'
  import { Warning } from '../shared'
  import WalletButton from './WalletButton.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadingIcon) => Promise<void>
  export let connectingWalletLabel: string
  export let connectingErrorMessage: string

  let windowWidth: number

  function checkConnected(label: string) {
    const { wallets } = state.get()
    return !!wallets.find(wallet => wallet.label === label)
  }
</script>

<style>
  .outer-container {
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
      display: flex;
      gap: unset;
      overflow-x: scroll;
      overflow-y: hidden;

      padding: var(
          --onboard-spacing-5,
          calc(var(--spacing-5) + var(--spacing-6))
        )
        var(--onboard-spacing-5, var(--spacing-5));

      border-bottom: 1px solid
        var(
          --onboard-wallet-button-border-color,
          var(--onboard-primary-200, var(--primary-200))
        );

      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .wallets-container::-webkit-scrollbar {
      display: none;
    }

    .outer-container {
      padding: 0;
      flex-direction: column-reverse;
    }

    .warning-container {
      padding: var(--onboard-spacing-4, var(--spacing-4))
        var(--onboard-spacing-4, var(--spacing-4)) 0
        var(--onboard-spacing-4, var(--spacing-4));
      margin: 0;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<div class="outer-container flex flex-column">
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
        disabled={windowWidth <= 809 &&
          connectingWalletLabel &&
          connectingWalletLabel !== wallet.label}
      />
    {/each}
  </div>
</div>
