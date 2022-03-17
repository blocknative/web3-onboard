<script lang="ts">
  import { fade } from 'svelte/transition'
  import { internalState$, wallets$ } from '../../streams'
  import {
    connectedToValidAppChain,
    getChainStyles,
    shortenAddress,
    shortenEns
  } from '../../utils'
  import { updateDashboard } from '../../store/actions'
  import questionIcon from '../../icons/question'
  import caretIcon from '../../icons/caret'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import NetworkSelector from '../shared/NetworkSelector.svelte'
  import { state } from '../../store'

  const { appMetadata } = internalState$.getValue()
  const appIcon = (appMetadata && appMetadata.icon) || questionIcon
  const chains = state.get().chains

  $: [primaryWallet] = $wallets$
  $: [firstAccount] = primaryWallet ? primaryWallet.accounts : []
  $: ensName =
    firstAccount && firstAccount.ens && shortenEns(firstAccount.ens.name)

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

  $: primaryChain = primaryWallet.chains[0]

  $: chainStyles = getChainStyles(
    primaryChain.id,
    connectedToValidAppChain(primaryChain, chains)
  )

  function maximize() {
    updateDashboard({ expanded: true })
  }
</script>

<style>
  .minimized {
    background-color: var(--onboard-white, var(--white));
    width: 100%;
  }

  .radius {
    border-radius: 16px;
  }

  .padding-5 {
    padding: var(--onboard-spacing-5, var(--spacing-5));
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

  .network {
    margin-left: 0.5rem;
  }

  .chain-icon {
    width: 22px;
    height: 22px;
    padding: 4px;
    border-radius: 25px;
    margin-right: 4px;
  }

  .caret {
    width: 10px;
    margin: 0 4px;
  }

  .container {
    border: 1px solid transparent;
    border-radius: 16px;
    padding: 1px;
    transition: border-color 250ms ease-in-out, backround 250ms ease-in-out;
    max-width: 116px;
    cursor: default;
  }
</style>

<div class="minimized pointer shadow-1 radius padding-5" on:click={maximize}>
  <div class="flex items-center justify-between">
    <div class="flex items-center" style="margin-left: 2px;">
      <!-- app and wallet icon badge -->
      <div class="flex items-centered relative">
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

        <div style="right: 0.5rem;" class="drop-shadow relative">
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
          style="right: 0.25rem; bottom: -0.25rem;"
          class="drop-shadow absolute"
        >
          <SuccessStatusIcon size={12} />
        </div>
      </div>

      <!-- address and balance -->
      <div class="flex flex-column" style="height: 40px; margin-top: 2px">
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
      <div
        on:click|stopPropagation
        class="container shadow-1 flex items-center"
        style={chainStyles
          ? `border-color: ${chainStyles.borderColor}; background-color: ${chainStyles.backgroundColor}`
          : ''}
      >
        <div class="flex items-center">
          {#if chainStyles.icon}
            <div
              class="chain-icon flex justify-center items-center"
              style={`background-color: ${chainStyles.badgeColor};`}
            >
              {@html chainStyles.icon}
            </div>
          {/if}

          <NetworkSelector {chains} color={chainStyles.fontColor} />
        </div>

        <div
          style={chainStyles ? `color: ${chainStyles.caretColor}` : ''}
          class="caret flex"
        >
          {@html caretIcon}
        </div>
      </div>
    </div>
  </div>
</div>
