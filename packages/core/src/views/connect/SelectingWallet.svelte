<script lang="ts">
  import type { WalletWithLoadedIcon, WalletWithLoadingIcon } from '../../types'
  import { state } from '../../store'
  import WalletButton from './WalletButton.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadedIcon) => void

  let connecting: string

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
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }

  .wallets-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--onboard-spacing-5, var(--spacing-5));
    width: 100%;
  }

  @media all and (max-width: 520px) {
    .wallets-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>

<div class="outer-container">
  <div class="wallets-container">
    {#each wallets as { label, icon, getInterface }}
      <WalletButton
        connected={checkConnected(label)}
        connecting={connecting === label}
        {label}
        {icon}
        onClick={async () => {
          connecting = label
          const iconLoaded = await icon
          await selectWallet({ label, icon: iconLoaded, getInterface })
        }}
      />
    {/each}
  </div>
</div>
