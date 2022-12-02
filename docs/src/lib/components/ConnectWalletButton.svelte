<script lang="ts">
  import { onMount } from 'svelte'
  import type { OnboardAPI, WalletState } from '@web3-onboard/core'
  import getOnboard from '$lib/services/onboard.js'
  let onboard: OnboardAPI
  let connecting = false
  let connectedWallets: WalletState[]

  async function connectWallet() {
    if (onboard && connectedWallets?.[0]?.provider) {
      onboard.disconnectWallet({ label: connectedWallets?.[0]?.label })
    }
    if (onboard) {
      connecting = true
      await onboard.connectWallet()
      connecting = false
    }
    onboard.state.select('wallets').subscribe((wallets) => {
      connectedWallets = wallets
    })
  }

  $: buttonText =
    onboard && connectedWallets?.[0]?.provider
      ? 'Disconnect'
      : connecting
      ? 'Connecting'
      : 'Connect'

  onMount(async () => {
    if (!onboard) {
      onboard = await getOnboard()
      onboard.state.select('wallets').subscribe((wallets) => {
        connectedWallets = wallets
      })
    }
  })
</script>

<button
  class="rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
  on:click={() => connectWallet()}
>
  {buttonText}
</button>
