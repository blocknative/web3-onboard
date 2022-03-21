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
  import { getDefaultChainStyles } from '../../utils'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import NetworkBadgeSelector from '../shared/NetworkSelector.svelte'
  import caretLightIcon from '../../icons/caret-light'
  import questionIcon from '../../icons/question'
  import { updateDashboard } from '../../store/actions'
  import blocknative from '../../icons/blocknative'
  import DisconnectAllConfirm from './DisconnectAllConfirm.svelte'

  function disconnectAllWallets() {
    $wallets$.forEach(({ label }) => disconnect({ label }))
  }

  const { chains: appChains } = state.get()
  const { appMetadata } = internalState$.getValue()
  let disconnectConfirmModal = false

  $: [primaryWallet] = $wallets$
  $: [connectedChain] = primaryWallet ? primaryWallet.chains : []

  $: recognizedChain = appChains.find(({ id, namespace }) =>
    connectedChain
      ? id === connectedChain.id && namespace === connectedChain.namespace
      : false
  )

  $: defaultChainStyles = getDefaultChainStyles(
    connectedChain && connectedChain.id
  )
</script>

<style>
  .outer-container {
    background-color: var(--onboard-gray-600, var(--gray-600));
    border-radius: 16px;
    width: 100%;
  }

  .wallets-section {
    width: 100%;
    border-radius: 16px;
  }

  .p5 {
    padding: var(--onboard-spacing-5, var(--spacing-5));
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
    color: var(--onboard-gray-500, var(--gray-500));
  }

  .p5-5 {
    padding: 12px;
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

  .app-info-container {
    background: var(--onboard-white, var(--white));
    border-radius: 16px;
    padding: 12px;
  }

  .app-name {
    font-weight: 700;
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--onboard-gray-600, var(--gray-600));
    margin-bottom: var(--onboard-spacing-5, var(--spacing-5));
    margin-top: 0;
  }

  .app-description {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--onboard-gray-500, var(--gray-500));
    margin: 0;
  }

  .app-info {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--onboard-gray-500, var(--gray-500));
  }
  .app-info-heading {
    color: var(--onboard-gray-600, var(--gray-600));
    font-weight: 700;
    margin-top: var(--onboard-spacing-5, var(--spacing-5));
    margin-bottom: var(--onboard-spacing-7, var(--spacing-7));
  }

  a {
    color: var(--onboard-primary-500, var(--primary-500));
    font-weight: 700;
    text-decoration: none;
  }

  .mt7 {
    margin-top: var(--onboard-spacing-7, var(--spacing-7));
  }

  .ml4 {
    margin-left: var(--onboard-spacing-4, var(--spacing-4));
  }

  .app-button {
    margin-top: var(--onboard-spacing-5, var(--spacing-5));
    width: 100%;
    justify-content: center;
    border-radius: 8px;
    background-color: var(--onboard-gray-500, var(--gray-500));
    color: var(--onboard-white, var(--white));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    transition: background-color 150ms ease-in-out;
  }

  .app-button:hover {
    background-color: var(--onboard-gray-700, var(--gray-700));
  }

  .powered-by-container {
    margin-top: 12px;
  }

  .powered-by {
    color: var(--onboard-gray-400, var(--gray-400));
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }
</style>

{#if disconnectConfirmModal}
  <DisconnectAllConfirm
    onClose={() => (disconnectConfirmModal = false)}
    onConfirm={disconnectAllWallets}
  />
{/if}

<div class="outer-container">
  <!-- wallets section -->
  <div class="wallets-section shadow-1">
    <!-- connected accounts -->
    <div class="p5">
      <div class="wallets">
        {#each $wallets$ as wallet, i (wallet.label)}
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
          on:click|stopPropagation={() => (disconnectConfirmModal = true)}
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
      class="network-container shadow-1"
      class:background-blue={recognizedChain}
      class:background-gray={!recognizedChain}
    >
      <div class="flex items-center p5-5">
        <!-- network icon -->
        <div class="relative flex">
          <WalletAppBadge
            size={32}
            padding={4}
            background={(recognizedChain && recognizedChain.color) ||
            defaultChainStyles
              ? 'custom'
              : 'transparent'}
            customBackgroundColor={(recognizedChain && recognizedChain.color) ||
              defaultChainStyles.color ||
              ''}
            border="transparent"
            radius={8}
            icon={(recognizedChain && recognizedChain.icon) ||
              defaultChainStyles.icon}
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
            <NetworkBadgeSelector
              chains={appChains}
              color="#33394B"
              bold={true}
            />
            <div class="caret flex items-center justify-center">
              {@html caretLightIcon}
            </div>
          </div>
        </div>
      </div>

      <!-- app info section -->
      <div class="app-info-container">
        <div class="flex items-start">
          <!-- app icon -->
          <div class="relative flex">
            <WalletAppBadge
              size={32}
              padding={4}
              background="transparent"
              border="black"
              radius={8}
              icon={(appMetadata && appMetadata.icon) || questionIcon}
            />

            <div
              style="right: -0.25rem; bottom: -0.25rem;"
              class="drop-shadow absolute"
            >
              <SuccessStatusIcon size={12} color="blue" />
            </div>
          </div>

          <div class="ml4">
            <h4 class="app-name">
              {(appMetadata && appMetadata.name) || 'App Name'}
            </h4>
            <p class="app-description">
              {(appMetadata && appMetadata.description) ||
                'This app has not added a description.'}
            </p>
          </div>
        </div>

        <!-- app info -->
        {#if appMetadata && (appMetadata.gettingStartedGuide || appMetadata.explore)}
          <div class="app-info">
            <h4 class="app-info-heading">
              {$_('dashboard.appInfo', {
                default: en.dashboard.appInfo
              })}
            </h4>

            {#if appMetadata.gettingStartedGuide}
              <div class="flex justify-between items-center mt7">
                <div>
                  {$_('dashboard.learnMore', {
                    default: en.dashboard.learnMore
                  })}
                </div>
                <a
                  href={appMetadata.gettingStartedGuide}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {$_('dashboard.gettingStartedGuide', {
                    default: en.dashboard.gettingStartedGuide
                  })}
                </a>
              </div>
            {/if}

            {#if appMetadata.explore}
              <div class="flex justify-between items-center mt7">
                <div>
                  {$_('dashboard.smartContracts', {
                    default: en.dashboard.smartContracts
                  })}
                </div>
                <a
                  href={appMetadata.explore}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {$_('dashboard.explore', {
                    default: en.dashboard.explore
                  })}
                </a>
              </div>
            {/if}
          </div>
        {/if}

        <button
          class="app-button"
          on:click={() => updateDashboard({ expanded: false })}
          >{$_('dashboard.backToApp', {
            default: en.dashboard.backToApp
          })}</button
        >

        <div class="flex justify-center items-center powered-by-container">
          <span class="powered-by"
            >{$_('dashboard.poweredBy', {
              default: en.dashboard.poweredBy
            })}</span
          >
          <div class="flex items-center" style="width: 83px; margin-left: 4px;">
            {@html blocknative}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
