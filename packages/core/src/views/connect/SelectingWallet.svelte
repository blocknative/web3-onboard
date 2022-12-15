<script lang="ts">
  import { MOBILE_WINDOW_WIDTH } from '../../constants.js'
  import { state } from '../../store/index.js'
  import type { WalletWithLoadingIcon } from '../../types.js'
  import { Warning } from '../shared/index.js'
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
  .wallets-container {
    display: flex;
    gap: 0.5rem;
    overflow-x: scroll;
    overflow-y: hidden;

    padding: 0.75rem 0.5rem;

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

  .warning-container {
    margin: 1rem 1rem 0;
  }

  @media all and (min-width: 768px) {
    .wallets-container {
      display: grid;
      grid-template-columns: repeat(var(--onboard-wallet-columns, 2), 1fr);
      padding: 1rem;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

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
        disabled={windowWidth <= MOBILE_WINDOW_WIDTH &&
          connectingWalletLabel &&
          connectingWalletLabel !== wallet.label}
      />
    {/each}
  </div>
</div>
