<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { fly } from 'svelte/transition'
  import { quartOut } from 'svelte/easing'
  import { wallets$ } from '../../streams.js'
  import en from '../../i18n/en.json'
  import WalletRow from './WalletRow.svelte'
  import plusCircleIcon from '../../icons/plus-circle.js'
  import arrowForwardIcon from '../../icons/arrow-forward.js'
  import connect from '../../connect.js'
  import disconnect from '../../disconnect.js'
  import { state } from '../../store/index.js'
  import { getDefaultChainStyles, unrecognizedChainStyle } from '../../utils.js'
  import {
    NetworkSelector,
    SuccessStatusIcon,
    WalletAppBadge
  } from '../shared/index.js'
  import caretLightIcon from '../../icons/caret-light.js'
  import warningIcon from '../../icons/warning.js'
  import questionIcon from '../../icons/question.js'
  import { poweredByBlocknative } from '../../icons/index.js'
  import DisconnectAllConfirm from './DisconnectAllConfirm.svelte'
  import { configuration } from '../../configuration.js'
  import SecondaryTokenTable from './SecondaryTokenTable.svelte'
  import { shareReplay, startWith } from 'rxjs'

  export let expanded: boolean

  function disconnectAllWallets() {
    $wallets$.forEach(({ label }) => disconnect({ label }))
  }

  const { chains: appChains } = state.get()
  let disconnectConfirmModal = false
  let hideWalletRowMenu: () => void

  $: [primaryWallet] = $wallets$
  $: [connectedChain] = primaryWallet ? primaryWallet.chains : []
  $: secondaryTokens =
    primaryWallet &&
    primaryWallet.accounts.length &&
    primaryWallet.accounts[0].secondaryTokens

  $: validAppChain = appChains.find(({ id, namespace }) =>
    connectedChain
      ? id === connectedChain.id && namespace === connectedChain.namespace
      : false
  )

  $: defaultChainStyles = getDefaultChainStyles(
    connectedChain && connectedChain.id
  )

  const appMetadata$ = state
    .select('appMetadata')
    .pipe(startWith(state.get().appMetadata), shareReplay(1))

  const { position } = state.get().accountCenter
  const { device } = configuration
</script>

<style>
  .outer-container {
    --background-color: var(--w3o-background-color);
    --text-color: var(--w3o-text-color);
    --border-color: var(--w3o-border-color, var(--gray-500));
    --action-color: var(--w3o-action-color, var(--primary-500));
    --border-radius: var(--w3o-border-radius, 1rem);

    --account-center-network-selector-color: var(--text-color, white);

    width: 100%;
    overflow: hidden;
    pointer-events: auto;
    border: 1px solid transparent;
    background: var(
      --account-center-maximized-upper-background,
      var(--background-color)
    );
    border-color: var(--border-color);
    border-radius: var(--account-center-border-radius, var(--border-radius));
  }

  .wallets-section {
    width: 100%;
    color: var(--text-color, var(--gray-100));
    background: var(--background-color, var(--gray-700));
  }

  .p5 {
    padding: var(--onboard-spacing-5, var(--spacing-5));
  }

  .wallets {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .actions {
    color: var(
      --account-center-maximized-upper-action-color,
      var(--action-color)
    );
    padding-left: 2px;
  }

  .action-container {
    padding: 0.25rem 12px 0.25rem 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 150ms ease-in-out;
  }

  .action-container:hover {
    background-color: var(
      --account-center-maximized-upper-action-background-hover,
      rgba(146, 155, 237, 0.2)
    );
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
    background: var(
      --account-center-maximized-network-section-background,
      var(--onboard-primary-100, var(--primary-100))
    );
  }

  .background-gray {
    background: var(--onboard-gray-100, var(--gray-100));
  }

  .background-yellow {
    background: var(--onboard-warning-100, var(--warning-100));
  }

  .network-container {
    background: var(--backround-color);
    border-top: 1px solid var(--border-color);

    border-radius: var(
      --account-center-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );

    color: var(
      --account-center-maximized-network-text-color,
      var(--account-center-maximized-network-section, inherit)
    );
  }

  .p5-5 {
    padding: 12px;
  }

  .network-selector-container {
    margin-left: 1rem;
    width: 100%;
  }

  .network-selector-label {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  .app-info-container {
    color: var(--text-color, var(--gray-700));
    background: var(
      --account-center-maximized-info-section-background-color,
      var(
        --account-center-maximized-info-section,
        var(--background-color, #fff)
      )
    );
    border-top: 1px solid var(--border-color);
    border-radius: var(--account-center-border-radius, inherit);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }

  .app-info-header {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem;
    gap: 0.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  .app-icon-name {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.75rem;
  }

  .app-name {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
    margin-bottom: 0.25rem;
    color: var(--account-center-maximized-app-name-color, inherit);
  }

  .app-description {
    margin: 0;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--account-center-maximized-app-info-color, inherit);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0.25rem;
    gap: 1rem;
  }

  .app-info {
    width: 100%;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--account-center-maximized-app-info-color, inherit);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem 1rem;
    gap: 0.25rem;
  }
  .app-info-heading {
    font-weight: 700;
    color: var(--account-center-maximized-app-info-color, inherit);
  }

  .w100 {
    width: 100%;
  }

  a {
    font-weight: 700;
  }

  .powered-by-container {
    color: var(--text-color);
    padding: 0.75rem;
  }
</style>

{#if disconnectConfirmModal}
  <DisconnectAllConfirm
    onClose={() => (disconnectConfirmModal = false)}
    onConfirm={disconnectAllWallets}
  />
{/if}

{#if expanded}
  <div
    transition:fly|local={{
      duration: 600,
      y: position.includes('bottom') ? 56 : -76,
      easing: quartOut,
      opacity: 0
    }}
    on:click|stopPropagation={hideWalletRowMenu}
    class="outer-container"
    
  >
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
          <!-- Hide for Mobile  -->
          {#if device.type === 'desktop'}
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
          {/if}
        </div>
      </div>

      <!-- network section -->
      <div
        class="network-container shadow-1"
        class:background-blue={(validAppChain && validAppChain.icon) ||
          defaultChainStyles}
        class:background-yellow={!validAppChain}
        class:background-gray={validAppChain && !defaultChainStyles}
      >
        <div class="flex items-center p5-5">
          <!-- network icon -->
          <div class="relative flex">
            <WalletAppBadge
              size={32}
              padding={4}
              background="custom"
              color={!validAppChain
                ? '#FFAF00'
                : !validAppChain.icon
                ? '#EFF1FC'
                : undefined}
              customBackgroundColor={validAppChain
                ? validAppChain.color ||
                  (defaultChainStyles && defaultChainStyles.color) ||
                  unrecognizedChainStyle.color
                : '#FFE7B3'}
              border="transparent"
              radius={8}
              icon={validAppChain
                ? validAppChain.icon ||
                  (defaultChainStyles && defaultChainStyles.icon) ||
                  unrecognizedChainStyle.icon
                : warningIcon}
            />

            {#if validAppChain}
              <div
                style="right: -5px; bottom: -5px;"
                class="drop-shadow absolute"
              >
                <SuccessStatusIcon size={14} />
              </div>
            {/if}
          </div>

          <!-- network selector -->
          <div class="network-selector-container">
            <div class="network-selector-label">
              {$_('accountCenter.currentNetwork', {
                default: en.accountCenter.currentNetwork
              })}
            </div>
            <div on:click class="flex items-center" style=" width: 100%;">
              <NetworkSelector
                chains={appChains}
                colorVar="--account-center-maximized-network-selector-color"
                bold={true}
                selectIcon={caretLightIcon}
                parentCSSId="maximized_ac"
              />
            </div>
          </div>
        </div>

        <!-- app info section -->
        <div class="app-info-container">
          {#if $appMetadata$}
            <div class="flex items-start app-info-header">
              <!-- app icon -->
              <div class="relative flex app-icon-name">
                <WalletAppBadge
                  size={32}
                  padding={4}
                  background="white"
                  border="black"
                  radius={8}
                  icon={($appMetadata$ && $appMetadata$.icon) || questionIcon}
                />
                <div class="app-name">
                  {($appMetadata$ && $appMetadata$.name) || 'App Name'}
                </div>
              </div>

              <div class="app-description">
                {($appMetadata$ && $appMetadata$.description) ||
                  'This app has not added a description.'}
              </div>
            </div>

            <!-- app info -->
            {#if $appMetadata$ && ($appMetadata$.gettingStartedGuide || $appMetadata$.explore)}
              <div class="app-info">
                <div class="app-info-heading">
                  {$_('accountCenter.appInfo', {
                    default: en.accountCenter.appInfo
                  })}
                </div>

                {#if $appMetadata$.gettingStartedGuide}
                  <div class="flex justify-between items-center w100">
                    <div>
                      {$_('accountCenter.learnMore', {
                        default: en.accountCenter.learnMore
                      })}
                    </div>
                    <a
                      href={$appMetadata$.gettingStartedGuide}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {$_('accountCenter.gettingStartedGuide', {
                        default: en.accountCenter.gettingStartedGuide
                      })}
                    </a>
                  </div>
                {/if}

                {#if $appMetadata$.explore}
                  <div class="flex justify-between items-center w100">
                    <div>
                      {$_('accountCenter.smartContracts', {
                        default: en.accountCenter.smartContracts
                      })}
                    </div>
                    <a
                      href={$appMetadata$.explore}
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
          {/if}
          {#if secondaryTokens && secondaryTokens.length}
            <SecondaryTokenTable {secondaryTokens} />
          {/if}
          <div class="w100">
            <a
              href="https://blocknative.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex justify-center items-center powered-by-container"
            >
              {@html poweredByBlocknative}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}