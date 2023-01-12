<script lang="ts">
  import { onMount } from 'svelte'
  import type { OnboardAPI, WalletState } from '@web3-onboard/core'
  import getOnboard from '$lib/services/onboard.js'
  let onboard: OnboardAPI
  let connectedWallets: WalletState[]
  let buttonText = 'Connect'

  async function connectWallet() {
    if (onboard && onboard.state.get().wallets.length) {
      onboard.disconnectWallet({ label: onboard.state.get().wallets[0].label })
      buttonText = 'Connect'
      return
    }
    if (onboard) {
      await onboard.connectWallet()
    }
  }

  onMount(async () => {
    if (!onboard) {
      onboard = await getOnboard()
    }
    const sub = onboard.state.select('wallets').subscribe((wallets) => {
      connectedWallets = wallets
      buttonText = wallets.length ? 'Disconnect' : (buttonText = 'Connect')
    })
    buttonText = onboard.state.get().wallets.length ? 'Disconnect' : (buttonText = 'Connect')
  })
</script>

<button
  class="rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
  on:click={() => connectWallet()}
>
  {buttonText}
</button>
