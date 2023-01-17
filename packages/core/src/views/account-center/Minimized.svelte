<script lang="ts">
  import { fade } from 'svelte/transition'
  import { wallets$ } from '../../streams.js'
  import {
    getDefaultChainStyles,
    shortenAddress,
    shortenDomain,
    unrecognizedChainStyle
  } from '../../utils.js'
  import { updateAccountCenter } from '../../store/actions.js'
  import { questionIcon, caretIcon, warningIcon } from '../../icons/index.js'
  import {
    NetworkSelector,
    WalletAppBadge,
    SuccessStatusIcon
  } from '../shared/index.js'
  import { state } from '../../store/index.js'
  import { configuration } from '../../configuration.js'

  const { appMetadata } = configuration
  const appIcon = (appMetadata && appMetadata.icon) || questionIcon
  const chains = state.get().chains

  $: [primaryWallet] = $wallets$
  $: [firstAccount] = primaryWallet ? primaryWallet.accounts : []

  $: ensName =
    firstAccount && firstAccount.ens && shortenDomain(firstAccount.ens.name)

  $: unsName =
    firstAccount && firstAccount.uns && shortenDomain(firstAccount.uns.name)

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
    --background-color: var(--account-center-minimized-background, var(--w3o-background-color, white));
    --text-color: var(--w3o-text-color, var(--gray-700));
    --border-color: var(--account-center-border, var(--w3o-border-color, var(--onboard-gray-200, var(--gray-200))));

    cursor: pointer;
    pointer-events: auto;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid;

    background: var(--background-color);
    color: var(--text-color);
    border-color: var(--border-color);
    border-radius: var(--account-center-border-radius, 1rem);
    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
  }

  .inner-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.25rem;
  }

  .wallet-info {
    display: flex;
    flex: 1;
    flex-flow: column;
    height: 2.5rem;
    overflow: hidden;
  }

  .address {
    font-weight: 700;
    line-height: 1.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* legacy variables */
    color: var(--account-center-minimized-address-color, inherit);
  }

  .balance {
    font-weight: 400;
    line-height: 1.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 0.6;
    color: var(--account-center-minimized-balance-color, inherit);
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

  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
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
  class="minimized"
  on:click|stopPropagation={maximize}
>
  <div class="inner-row">
    <div class="flex relative">
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

      <div style="margin-left: -0.5rem;" class="drop-shadow">
        <WalletAppBadge
          size={32}
          padding={4}
          background="green"
          border="darkGreen"
          radius={8}
          icon={primaryWallet ? primaryWallet.icon : ''}
        />
      </div>

      <div style="right: -4px; bottom: -4px;" class="drop-shadow absolute">
        <SuccessStatusIcon size={14} />
      </div>
    </div>

    <!-- address and balance -->
    <div class="wallet-info">
      <div class="address">
        {ensName
          ? shortenDomain(ensName)
          : unsName
          ? shortenDomain(unsName)
          : shortenedFirstAddress}
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
        })`}
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
            parentCSSId="minimized_ac"
          />
        </div>
      </div>
    </div>

  </div>
</div>
