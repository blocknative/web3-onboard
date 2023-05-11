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
    --background-color: var(
      --account-center-minimized-background,
      var(--w3o-background-color, white)
    );
    --text-color: var(--w3o-text-color, var(--gray-700));
    --border-color: var(
      --account-center-border,
      var(--w3o-border-color, var(--onboard-gray-200, var(--gray-200)))
    );
    --border-radius: var(
      --account-center-border-radius,
      var(--w3o-border-radius, 1rem)
    );

    cursor: pointer;
    pointer-events: auto;
    width: 80px;
    border: 1px solid;

    background: var(--background-color);
    color: var(--text-color);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
  }

  .wallet-square-wrapper {
    position: relative;
    margin-left: -8px;
  }

  .check-icon-wrapper {
    position: absolute;
    right: -4px;
    bottom: -4px;
  }

  .inner-row {
    display: flex;
    flex-flow: row nowrap;
    width: 80px;
    padding: 0.75rem;
  }
  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }
</style>

<div
  class="minimized"
  on:click|stopPropagation={maximize}
>
  <div class="inner-row">
    <!-- app and wallet icon badge -->
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
    <div class="wallet-square-wrapper">
      <div class="drop-shadow">
        <WalletAppBadge
          size={32}
          padding={4}
          background="green"
          border="darkGreen"
          radius={8}
          icon={primaryWallet ? primaryWallet.icon : ''}
        />
      </div>

      <div class="check-icon-wrapper drop-shadow">
        <SuccessStatusIcon size={14} />
      </div>
    </div>
  </div>
</div>
