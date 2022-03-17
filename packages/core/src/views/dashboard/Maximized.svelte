<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { internalState$, wallets$ } from '../../streams'
  import en from '../../i18n/en.json'
  import WalletRow from './WalletRow.svelte'
  import plusCircleIcon from '../../icons/plus-circle'
  import arrowForwardIcon from '../../icons/arrow-forward'
  import connect from '../../connect'
  import disconnect from '../../disconnect'
  import { state } from '../../store'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import { getChainStyles } from '../../utils'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import NetworkBadgeSelector from '../shared/NetworkSelector.svelte'
  import caretLightIcon from '../../icons/caret-light'

  function disconnectAllWallets() {
    $wallets$.forEach(({ label }) => disconnect({ label }))
  }

  const { chains: appChains } = state.get()
  $: [primaryWallet] = $wallets$
  $: [connectedChain] = primaryWallet.chains
  $: recognizedChain = appChains.find(
    ({ id, namespace }) =>
      id === connectedChain.id && namespace === connectedChain.namespace
  )
  $: chainStyles = getChainStyles(connectedChain.id, !!recognizedChain)
</script>

<style>
  .outer-container {
    background-color: var(--onboard-gray-600, var(--gray-600));
    border-radius: 16px;
    width: 100%;
  }

  .wallets-section {
    padding: var(--onboard-spacing-5, var(--spacing-5));
    width: 100%;
  }

  .wallets {
    width: 100%;
  }

  .actions {
    color: var(--onboard-primary-400, var(--primary-400));
    padding: var(--onboard-spacing-6, var(--spacing-6))
      var(--onboard-spacing-5, var(--spacing-5));
  }

  .plus-icon {
    width: 24px;
    height: 24px;
    padding: 2px;
  }

  .arrow-forward {
    width: 24px;
    height: 24px;
    padding: 3px;
  }

  .ml {
    margin-left: 0.25rem;
  }

  .mt {
    margin-top: 0.25rem;
  }

  .action-text {
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  .background-blue {
    background-color: var(--onboard-primary-100, var(--primary-100));
  }

  .background-gray {
    background-color: var(--onboard-gray-100, var(--gray-100));
  }

  .network-container {
    margin: 0 1px 1px 1px;
    border-radius: 15px;
    padding: 12px 12px 44px 12px;
    color: var(--onboard-gray-500, var(--gray-500));
  }

  .network-selector-container {
    margin-left: 1rem;
  }

  .network-selector-label {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  .caret {
    width: 16px;
    height: 16px;
    padding: 4px;
  }
</style>

<div class="outer-container">
  <!-- wallets section -->
  <div class="wallets-section shadow-1">
    <!-- connected accounts -->
    <div class="wallets">
      {#each $wallets$ as wallet, i}
        <WalletRow {wallet} primary={i === 0} />
      {/each}
    </div>

    <!-- actions -->
    <div class="actions">
      <!-- connect another wallet -->
      <div
        on:click|stopPropagation={() => connect()}
        class="flex items-center pointer"
      >
        <div class="plus-icon flex items-center justify-center">
          {@html plusCircleIcon}
        </div>
        <span class="ml action-text"
          >{$_('dashboard.connectAnotherWallet', {
            default: en.dashboard.connectAnotherWallet
          })}</span
        >
      </div>

      <!-- disconnect all wallets -->
      <div
        on:click|stopPropagation={disconnectAllWallets}
        class="flex items-center mt pointer"
      >
        <div class="arrow-forward flex items-center justify-center">
          {@html arrowForwardIcon}
        </div>
        <span class="ml  action-text"
          >{$_('dashboard.disconnectAllWallets', {
            default: en.dashboard.disconnectAllWallets
          })}</span
        >
      </div>
    </div>
  </div>

  <!-- network section -->
  <div
    class="network-container flex items-center shadow-1"
    class:background-blue={recognizedChain}
    class:background-gray={!recognizedChain}
  >
    <!-- network icon -->
    <div class="relative flex">
      <WalletAppBadge
        size={32}
        padding={4}
        background={(recognizedChain && recognizedChain.color) ||
        chainStyles.backgroundColor
          ? 'custom'
          : 'transparent'}
        customBackgroundColor={(recognizedChain && recognizedChain.color) ||
          chainStyles.badgeColor ||
          ''}
        border="transparent"
        radius={8}
        icon={(recognizedChain && recognizedChain.icon) || chainStyles.icon}
      />

      <div
        style="right: -0.25rem; bottom: -0.25rem;"
        class="drop-shadow absolute"
      >
        <SuccessStatusIcon size={12} />
      </div>
    </div>

    <!-- network selector -->
    <div class="network-selector-container">
      <div class="network-selector-label">
        {$_('dashboard.currentNetwork', {
          default: en.dashboard.currentNetwork
        })}
      </div>
      <div class="flex items-center">
        <NetworkBadgeSelector chains={appChains} color="#33394B" bold={true} />
        <div class="caret flex items-center justify-center">
          {@html caretLightIcon}
        </div>
      </div>
    </div>
  </div>
</div>
