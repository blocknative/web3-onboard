<script lang="ts">
  import { fade } from 'svelte/transition'
  import { wallets$ } from '../../streams'
  import {
    getDefaultChainStyles,
    shortenAddress,
    shortenEns,
    unrecognizedChainStyle
  } from '../../utils'
  import { updateAccountCenter } from '../../store/actions'
  import questionIcon from '../../icons/question'
  import caretIcon from '../../icons/caret'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import warningIcon from '../../icons/warning'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import NetworkSelector from '../shared/NetworkSelector.svelte'
  import { state } from '../../store'
  import { configuration } from '../../configuration'

  const { appMetadata } = configuration
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

  $: primaryChain = primaryWallet && primaryWallet.chains[0]

  $: validAppChain = chains.find(({ id, namespace }) =>
    primaryChain
      ? id === primaryChain.id && namespace === primaryChain.namespace
      : false
  )

  $: defaultChainStyles = getDefaultChainStyles(primaryChain && primaryChain.id)

  function maximize() {
    updateAccountCenter({ expanded: true })
  }
</script>

<style>
  .minimized {
    background: var(
      --account-center-minimized-background,
      var(--onboard-white, var(--white))
    );
    border: 1px solid
      var(--acount-center-border, var(--onboard-gray-100, var(--gray-100)));
    width: 100%;
    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
    pointer-events: auto;
  }

  .radius {
    border-radius: var(
      --account-center-boarder-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
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
    color: var(--account-center-minimized-address-color, initial);
  }

  .balance {
    font-weight: 400;
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
    color: var(
      --account-center-minimized-balance-color,
      var(--onboard-gray-400, var(--gray-400))
    );
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

  .container {
    border: 1px solid transparent;
    border-radius: 16px;
    padding: 1px;
    transition: border-color 250ms ease-in-out, backround 250ms ease-in-out;
    max-width: 128px;
    cursor: default;
  }

  .color-yellow {
    color: var(
      --account-center-chain-warning,
      var(--onboard-warning-500, var(--warning-500))
    );
  }

  .color-white {
    color: var(--onboard-primary-100, var(--primary-100));
  }
</style>

<div
  in:fade={{ duration: 250 }}
  out:fade={{ duration: 100 }}
  class="minimized pointer radius padding-5"
  on:click|stopPropagation={maximize}
>
  <div class="flex items-center justify-between" style="padding: 0 4px;">
    <div class="flex items-center w-100">
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

        <div style="right: 5px; bottom: -5px;" class="drop-shadow absolute">
          <SuccessStatusIcon size={14} />
        </div>
      </div>

      <!-- address and balance -->
      <div class="flex flex-column" style="height: 40px;">
        <div class="address">
          {ensName ? shortenEns(ensName) : shortenedFirstAddress}
        </div>
        {#if firstAddressBalance}
          <div in:fade class="balance">
            {firstAddressBalance.length > 8
              ? firstAddressBalance.slice(0, 8)
              : firstAddressBalance}
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
        style={`border-color: var(${
          validAppChain
            ? '--onboard-primary-200, var(--primary-200)'
            : '--onboard-warning-500, var(--warning-500)'
        }); background-color: var(${
          validAppChain
            ? '--account-center-minimized-chain-select-background, var(--primary-100)'
            : '--account-center-minimized-chain-select-background-warning, var(--warning-100)'
        }))`}
      >
        <div class="flex items-center">
          <div
            class:color-yellow={!validAppChain}
            class:color-white={validAppChain && !validAppChain.icon}
            class="chain-icon flex justify-center items-center"
            style={`background-color: ${
              validAppChain
                ? validAppChain.color ||
                  (defaultChainStyles && defaultChainStyles.color) ||
                  unrecognizedChainStyle.color
                : 'var(--onboard-warning-200, var(--warning-200))'
            };`}
          >
            {@html validAppChain
              ? validAppChain.icon ||
                (defaultChainStyles && defaultChainStyles.icon) ||
                unrecognizedChainStyle.icon
              : warningIcon}
          </div>

          <NetworkSelector
            {chains}
            colorVar="--account-center-minimized-network-selector-color"
            selectIcon={caretIcon}
          />
        </div>
      </div>
    </div>
  </div>
</div>
