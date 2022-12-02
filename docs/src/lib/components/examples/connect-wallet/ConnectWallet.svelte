<script lang="ts">
  import { Chip } from '@svelteness/kit-docs'
  import { onMount } from 'svelte'

  import getOnboard from '$lib/services/onboard.js'
  import ConnectWalletButton from '../../ConnectWalletButton.svelte'
  let onboard: OnboardAPI
  let connectedWallets: WalletState[]

  onMount(async () => {
    if (!onboard) {
      onboard = await getOnboard()
    }
    onboard.state.select('wallets').subscribe((wallets) => {
      connectedWallets = wallets
    })
  })

  const trunc = (address: string) =>
    address ? address.slice(0, 6) + '...' + address.slice(-6) : null

  let connecting = false

  // The first wallet in the array of connected wallets
  $: connectedAccount = connectedWallets?.[0]?.accounts?.[0]

  async function connectWallet() {
    if (onboard && connectedWallets?.[0]?.provider) {
      onboard.disconnectWallet({ label: connectedWallets?.[0]?.label })
    }
    if (onboard) {
      connecting = true
      await onboard.connectWallet()
      connecting = false
    }
  }
  $: account = connectedAccount?.ens?.name
    ? {
        ens: connectedAccount?.ens,
        address: trunc(connectedAccount?.address)
      }
    : { address: trunc(connectedAccount?.address) }
</script>

<div class="flex items-center justify-center border-gray-divider border rounded-md h-40 p-4">
  {#if connectedWallets?.[0]?.provider}
    <div
      class="flex items-center w-full px-3 py-2 border border-gray-divider bg-gray-elevate text-gray-inverse rounded-md"
    >
      <div class="w-9 h-9 rounded-full overflow-hidden mr-2">
        {#if account?.ens?.avatar?.url}
          <img src={account?.ens?.avatar?.url} alt="" />
        {:else}
          <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-full" />
        {/if}
      </div>
      <div>
        <div class="">
          {account?.ens ? `${account?.ens?.name} (${account?.address})` : `${account?.address}`}
        </div>
        <div class=" text-sm">Connected to <Chip>{connectedWallets?.[0]?.label}</Chip></div>
      </div>
      <div class="ml-auto">
        <ConnectWalletButton />
      </div>
    </div>
  {:else}
    <ConnectWalletButton />
  {/if}
</div>
