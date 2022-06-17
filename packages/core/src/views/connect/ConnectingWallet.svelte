<script lang="ts">
  import { _ } from 'svelte-i18n'
  import type { WalletState, i18n } from '../../types'

  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import questionIcon from '../../icons/question'
  import en from '../../i18n/en.json'
  import { internalState } from '../../internals'

  export let connectWallet: () => Promise<void>
  export let selectedWallet: WalletState
  export let deselectWallet: (label: string) => void
  export let setStep: (update: keyof i18n['connect']) => void
  export let connectionRejected: boolean

  const { appMetadata } = internalState
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }

  .connecting-container {
    width: 100%;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    transition: background-color 100ms ease-in-out,
      border-color 100ms ease-in-out;
    border-radius: 24px;
    background: var(--onboard-primary-100, var(--primary-100));
    border: 1px solid;
    border-color: var(--onboard-primary-300, var(--primary-300));
    color: var(--onboard-gray-600, var(--gray-600));
  }

  .connecting-container.warning {
    background: var(--onboard-warning-100, var(--warning-100));
    border-color: var(--onboard-warning-400, var(--warning-400));
  }

  .text {
    line-height: 16px;
    margin-bottom: var(--onboard-spacing-5, var(--spacing-5));
  }

  .text.text-rejected {
    line-height: 24px;
    margin-bottom: 0;
  }

  .subtext {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: 16px;
  }

  .rejected-cta {
    color: var(--onboard-primary-500, var(--primary-500));
  }

  .onboard-button-primary {
    bottom: var(--onboard-spacing-3, var(--spacing-3));
  }

  .ml {
    margin-left: var(--onboard-spacing-4, var(--spacing-4));
  }
</style>

<div class="container flex flex-column items-center">
  <div
    class="connecting-container flex justify-between items-center"
    class:warning={connectionRejected}
  >
    <div class="flex">
      <div class="flex justify-center relative">
        <WalletAppBadge
          size={40}
          padding={8}
          icon={(appMetadata && appMetadata.icon) || questionIcon}
          border={connectionRejected ? 'yellow' : 'blue'}
          background="lightGray"
        />

        <div class="relative" style="right: 0.5rem;">
          <WalletAppBadge
            size={40}
            padding={8}
            border={connectionRejected ? 'yellow' : 'blue'}
            background="white"
            icon={selectedWallet.icon}
          />
        </div>
      </div>

      <div class="flex flex-column justify-center ml">
        <div class="text" class:text-rejected={connectionRejected}>
          {$_(
            connectionRejected
              ? 'connect.connectingWallet.rejectedText'
              : 'connect.connectingWallet.mainText',
            {
              default: connectionRejected
                ? en.connect.connectingWallet.rejectedText
                : en.connect.connectingWallet.mainText
            }
          )}
        </div>
        {#if connectionRejected}
          <div class="rejected-cta pointer subtext" on:click={connectWallet}>
            {$_('connect.connectingWallet.rejectedCTA', {
              default: en.connect.connectingWallet.rejectedCTA
            })}
          </div>
        {:else}
          <div class="subtext">
            {$_('connect.connectingWallet.paragraph', {
              default: en.connect.connectingWallet.paragraph
            })}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <button
    on:click={() => {
      deselectWallet(selectedWallet.label)
      setStep('selectingWallet')
    }}
    class="onboard-button-primary absolute"
    >{$_('connect.connectingWallet.primaryButton', {
      default: en.connect.connectingWallet.primaryButton
    })}</button
  >
</div>
