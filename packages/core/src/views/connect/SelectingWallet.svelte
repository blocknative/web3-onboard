<script lang="ts">
  import type { WalletWithLoadedIcon, WalletWithLoadingIcon } from '../../types'
  import { state } from '../../store'
  import WalletButton from './WalletButton.svelte'
  import Warning from '../shared/Warning.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadedIcon) => Promise<void>

  let connecting: string // the wallet label that is connecting
  let errorMessage: string

  function checkConnected(label: string) {
    const { wallets } = state.get()
    return !!wallets.find(wallet => wallet.label === label)
  }

  function select({ label, icon, getInterface }: WalletWithLoadingIcon) {
    return async () => {
      errorMessage = ''
      connecting = label

      const iconLoaded = await icon

      try {
        await selectWallet({ label, icon: iconLoaded, getInterface })
      } catch (error) {
        const { message } = error as { message: string }
        errorMessage = message
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
      <Warning>{errorMessage}</Warning>
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
