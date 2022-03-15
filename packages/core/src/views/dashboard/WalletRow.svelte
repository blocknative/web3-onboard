<script lang="ts">
  import type { WalletState } from '../../types'
  import { shortenAddress, shortenEns } from '../../utils'

  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'

  export let wallet: WalletState
</script>

<style>
</style>

{#each wallet.accounts as { address, ens, balance }}
  <div class="flex items-center space-between">
    <div class="flex items-center">
      <!-- WALLET ICON -->
      <WalletAppBadge
        size={32}
        padding={4}
        background="custom"
        customBackgroundColor="rgba(24, 206, 102, 0.2)"
        border="green"
        radius={8}
        icon={wallet.icon}
      />
      <div style="right: 1rem; bottom: -24px;" class="drop-shadow relative">
        <SuccessStatusIcon size={12} bottom={null} right={null} />
      </div>

      <!-- ADDRESS / ENS -->
      <span>{ens ? shortenEns(ens.name) : shortenAddress(address)}</span>
    </div>

    <!-- BALANCE -->

    <!-- ELIPSIS -->
  </div>
{/each}
