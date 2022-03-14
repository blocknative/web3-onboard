<script lang="ts">
  import { fade } from 'svelte/transition'
  import { internalState$, wallets$ } from '../../streams'
  import questionIcon from '../../icons/question'
  import { shortenAddress, shortenEns } from '../../utils'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import NetworkBadgeSelector from '../shared/NetworkBadgeSelector.svelte'

  const { appMetadata } = internalState$.getValue()
  const appIcon = (appMetadata && appMetadata.icon) || questionIcon

  $: [primaryWallet] = $wallets$
  $: [firstAccount] = primaryWallet ? primaryWallet.accounts : []
  $: ensName = firstAccount && firstAccount.ens && firstAccount.ens.name

  $: shortenedFirstAddress = firstAccount
    ? shortenAddress(firstAccount.address)
    : ''

  $: [firstAddressAsset] =
    firstAccount && firstAccount.balance
      ? Object.keys(firstAccount.balance)
      : []

  $: firstAddressBalance =
    firstAccount && firstAccount.balance
      ? firstAccount.balance[firstAddressAsset]
      : null
</script>

<style>
  .shadow {
    box-shadow: var(--onboard-shadow-1, var(--shadow-1));
  }

  .radius {
    border-radius: 16px;
  }

  .padding-5 {
    padding: var(--onboard-spacing-5, var(--spacing-5));
  }

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .minimized {
    background-color: var(--onboard-white, var(--white));
  }

  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }

  .address {
    font-weight: 700;
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
  }

  .balance {
    font-weight: 400;
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
    color: var(--onboard-gray-400, var(--gray-400));
  }

  .address-balance {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
  }

  .network {
    margin-left: 0.5rem;
  }
</style>

<div class="minimized shadow radius padding-5">
  <div class="flex items-center justify-between">
    <div class="flex items-center" style="margin-left: 2px;">
      <!-- app and wallet icon badge -->
      <div class="flex items-centered">
        <div class="drop-shadow">
          <WalletAppBadge
            size={32}
            padding={4}
            background={'white'}
            border="darkGreen"
            radius={8}
            icon={appIcon}
          />
        </div>

        <div style="position: relative; right: 0.5rem;" class="drop-shadow">
          <WalletAppBadge
            size={32}
            padding={4}
            background="green"
            border="darkGreen"
            radius={8}
            icon={primaryWallet ? primaryWallet.icon : ''}
          />
        </div>

        <div
          style="position: relative; right: 1rem; bottom: -24px;"
          class="drop-shadow"
        >
          <SuccessStatusIcon size={12} bottom={null} right={null} />
        </div>
      </div>

      <!-- address and balance -->
      <div class="address-balance" style="height: 40px; margin-top: 2px">
        <div class="address">{ensName || shortenedFirstAddress}</div>
        {#if firstAddressBalance}
          <div in:fade class="balance">
            {firstAddressBalance.slice(0, 4)}
            {firstAddressAsset}
          </div>
        {/if}
      </div>
    </div>

    <!-- network badge -->
    <div class="network">
      <NetworkBadgeSelector wallet={primaryWallet} />
    </div>
  </div>
</div>
