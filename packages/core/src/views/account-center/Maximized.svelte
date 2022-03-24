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
  import warningIcon from '../../icons/warning'
  import questionIcon from '../../icons/question'
  import { updateAccountCenter } from '../../store/actions'
  import blocknative from '../../icons/blocknative'
  import DisconnectAllConfirm from './DisconnectAllConfirm.svelte'

  function disconnectAllWallets() {
    $wallets$.forEach(({ label }) => disconnect({ label }))
  }

  const { chains: appChains } = state.get()
  const { appMetadata } = internalState$.getValue()
  let disconnectConfirmModal = false
  let hideWalletRowMenu: () => void

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
    filter: drop-shadow(0px 4px 16px rgba(178, 178, 178, 0.2));
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
    padding-left: 2px;
  }

  .action-container {
    padding: 4px 12px 4px 8px;
    border-radius: 8px;
    transition: background-color 150ms ease-in-out;
  }

  .action-container:hover {
    background-color: rgba(146, 155, 237, 0.2);
  }

  .plus-icon {
    width: 20px;
  }

  .arrow-forward {
    width: 20px;
  }

  .mt {
    margin-top: 0.25rem;
  }

  .action-text {
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    margin-left: 0.5rem;
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

<div on:click|stopPropagation={hideWalletRowMenu} class="outer-container">
  <!-- wallets section -->
  <div class="wallets-section">
    <!-- connected accounts -->
    <div class="p5">
      <div class="wallets">
        {#each $wallets$ as wallet, i (wallet.label)}
          <WalletRow
            bind:hideMenu={hideWalletRowMenu}
            {wallet}
            primary={i === 0}
          />
        {/each}
      </div>

      <!-- actions -->
      <div class="actions flex flex-column items-start">
        <!-- connect another wallet -->
        <div
          on:click={() => connect()}
          class="action-container flex items-center pointer"
        >
          <div class="plus-icon flex items-center justify-center">
            {@html plusCircleIcon}
          </div>
          <span class="action-text"
            >{$_('accountCenter.connectAnotherWallet', {
              default: en.accountCenter.connectAnotherWallet
            })}</span
          >
        </div>

        <!-- disconnect all wallets -->
        <div
          on:click={() => (disconnectConfirmModal = true)}
          class="action-container flex items-center mt pointer"
        >
          <div class="arrow-forward flex items-center justify-center">
            {@html arrowForwardIcon}
          </div>
          <span class="action-text"
            >{$_('accountCenter.disconnectAllWallets', {
              default: en.accountCenter.disconnectAllWallets
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
            background="custom"
            customBackgroundColor={recognizedChain
              ? recognizedChain.color || defaultChainStyles.color
              : '#FFE7B3'}
            border="transparent"
            radius={8}
            icon={recognizedChain
              ? recognizedChain.icon || defaultChainStyles.icon
              : warningIcon}
          />

          <div style="right: -5px; bottom: -5px;" class="drop-shadow absolute">
            <SuccessStatusIcon size={14} />
          </div>
        </div>

        <!-- network selector -->
        <div class="network-selector-container">
          <div class="network-selector-label">
            {$_('accountCenter.currentNetwork', {
              default: en.accountCenter.currentNetwork
            })}
          </div>
          <div on:click class="flex items-center">
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
              style="right: -5px; bottom: -5px;"
              class="drop-shadow absolute"
            >
              <SuccessStatusIcon size={14} color="blue" />
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
              {$_('accountCenter.appInfo', {
                default: en.accountCenter.appInfo
              })}
            </h4>

            {#if appMetadata.gettingStartedGuide}
              <div class="flex justify-between items-center mt7">
                <div>
                  {$_('accountCenter.learnMore', {
                    default: en.accountCenter.learnMore
                  })}
                </div>
                <a
                  href={appMetadata.gettingStartedGuide}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {$_('accountCenter.gettingStartedGuide', {
                    default: en.accountCenter.gettingStartedGuide
                  })}
                </a>
              </div>
            {/if}

            {#if appMetadata.explore}
              <div class="flex justify-between items-center mt7">
                <div>
                  {$_('accountCenter.smartContracts', {
                    default: en.accountCenter.smartContracts
                  })}
                </div>
                <a
                  href={appMetadata.explore}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {$_('accountCenter.explore', {
                    default: en.accountCenter.explore
                  })}
                </a>
              </div>
            {/if}
          </div>
        {/if}

        <button
          class="app-button"
          on:click={() => updateAccountCenter({ expanded: false })}
          >{$_('accountCenter.backToApp', {
            default: en.accountCenter.backToApp
          })}</button
        >

        <div class="flex justify-center items-center powered-by-container">
          <span class="powered-by"
            >{$_('accountCenter.poweredBy', {
              default: en.accountCenter.poweredBy
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
