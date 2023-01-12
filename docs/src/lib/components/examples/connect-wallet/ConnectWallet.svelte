<script lang="ts">
  import { onMount } from 'svelte'

  import getOnboard from '$lib/services/onboard.js'
  import ConnectWalletButton from '../../ConnectWalletButton.svelte'
  let onboard: OnboardAPI

  onMount(async () => {
    if (!onboard) {
      onboard = await getOnboard()
    }
  })
</script>

<div class="flex items-center justify-center border-gray-divider border rounded-md h-40 p-4">
    <ConnectWalletButton />
</div>
