<script lang="ts">
  import { state } from '../../store'
  import type { WalletWithLoadedIcon, WalletWithLoadingIcon } from '../../types'
  import Warning from '../shared/Warning.svelte'
  import WalletButton from './WalletButton.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadedIcon) => Promise<void>
  export let scrollToTop: () => void

  let connecting: string // the wallet label that is connecting
  let errorMessage: string

  function checkConnected(label: string) {
    const { wallets } = state.get()
    return !!wallets.find(wallet => wallet.label === label)
  }

  function select({ label, icon, getInterface }: WalletWithLoadingIcon) {
    return async () => {
      connecting = label

      const iconLoaded = await icon

      try {
        await selectWallet({ label, icon: iconLoaded, getInterface })
        errorMessage = ''
      } catch (error) {
        const { message } = error as { message: string }
        errorMessage = message
        scrollToTop()
      } finally {
        connecting = ''
      }
    }
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
  {#if errorMessage}
    <div class="warning-container">
      <Warning>{@html errorMessage}</Warning>
    </div>
  {/if}

  <div class="wallets-container">
    {#each wallets as wallet}
      <WalletButton
        connected={checkConnected(wallet.label)}
        connecting={connecting === wallet.label}
        label={wallet.label}
        icon={wallet.icon}
        onClick={select(wallet)}
      />
    {/each}
  </div>
</div>
