<script lang="ts">
  import { state } from '../../store'
  import type { WalletWithLoadedIcon, WalletWithLoadingIcon } from '../../types'
  import WalletButton from './WalletButton.svelte'

  export let wallets: WalletWithLoadingIcon[]
  export let selectWallet: (wallet: WalletWithLoadedIcon) => void

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
</style>

<div class="outer-container">
  <div class="wallets-container">
    {#each wallets as { label, icon, getInterface }}
      <WalletButton
        connected={checkConnected(label)}
        {label}
        {icon}
        onClick={async () => {
          const iconLoaded = await icon
          selectWallet({ label, icon: iconLoaded, getInterface })
        }}
      />
    {/each}
  </div>
</div>
