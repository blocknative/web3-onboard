<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { WalletState } from '../../types'
  import { shortenAddress, shortenEns } from '../../utils'

  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import elipsisIcon from '../../icons/elipsis'

  export let wallet: WalletState
  export let primary: boolean

  function formatBalance(
    balance: WalletState['accounts']['0']['balance']
  ): string {
    const [asset] = Object.keys(balance)
    return `${balance[asset].slice(0, 4)} ${asset}`
  }
</script>

<style>
  .container {
    padding: 0.25rem;
    margin-bottom: 0.25rem;
    width: 100%;
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-20));
  }

  .address-ens {
    margin-left: 0.5rem;
    font-weight: 700;
    color: var(--onboard-primary-100, var(--primary-100));
  }

  .balance {
    color: var(--onboard-gray-300, var(--gray-300));
  }

  .elipsis {
    height: 24px;
    width: 24px;
    padding: 4px;
    margin: 0 4px 0 8px;
  }
</style>

{#each wallet.accounts as { address, ens, balance }, i}
  <div class="container flex items-center justify-between">
    <div class="flex items-center">
      <div class="flex items-center relative">
        <!-- WALLET ICON -->
        <WalletAppBadge
          size={32}
          padding={4}
          background="custom"
          customBackgroundColor={primary && i === 0
            ? 'rgba(24, 206, 102, 0.2)'
            : 'rgba(235, 235, 237, 0.1)'}
          border={primary && i === 0 ? 'green' : 'gray'}
          radius={8}
          icon={wallet.icon}
        />
        {#if primary && i === 0}
          <div style="right: -4px; bottom: -4px;" class="drop-shadow absolute">
            <SuccessStatusIcon size={12} />
          </div>
        {/if}
      </div>

      <!-- ADDRESS / ENS -->
      <span class="address-ens"
        >{ens ? shortenEns(ens.name) : shortenAddress(address)}</span
      >
    </div>

    <div class="flex items-center">
      <!-- BALANCE -->
      {#if balance}
        <span in:fade class="balance">{formatBalance(balance)}</span>
      {/if}

      <!-- ELIPSIS -->
      <div class="elipsis pointer flex items-center justify-center">
        {@html elipsisIcon}
      </div>
    </div>
  </div>
{/each}
