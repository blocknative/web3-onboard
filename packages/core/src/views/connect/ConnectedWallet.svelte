<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { WalletAppBadge, SuccessStatusIcon } from '../shared/index.js'
  import type { WalletState } from '../../types.js'
  import { questionIcon, successIcon } from '../../icons/index.js'
  import en from '../../i18n/en.json'
  import { configuration } from '../../configuration.js'

  export let selectedWallet: WalletState

  const { appMetadata } = configuration
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
    color: var(
      --onboard-connect-accent-text-color,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  .connecting-container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
    border-radius: var(--onboard-border-radius-1, var(--border-radius-1));
    background: var(--onboard-success-100, var(--success-100));
    border: 1px solid var(--onboard-success-600, var(--success-600));
    width: 100%;
  }

  .text {
    right: var(--onboard-spacing-5, var(--spacing-5));
  }

  .tick {
    color: var(--onboard-success-700, var(--success-700));
  }
</style>

<div class="container">
  <div class="connecting-container flex justify-between items-center">
    <div class="flex items-center">
      <div class="flex justify-center items-end relative">
        <WalletAppBadge
          size={40}
          padding={8}
          background={appMetadata && appMetadata.icon
            ? 'lightBlue'
            : 'lightGray'}
          border="darkGreen"
          icon={(appMetadata && appMetadata.icon) || questionIcon}
        />

        <div class="relative" style="right: 1rem; top: 4px; z-index: 1;">
          <SuccessStatusIcon size={17} />
        </div>

        <div class="relative" style="right: 1.75rem;">
          <WalletAppBadge
            size={40}
            padding={8}
            border="darkGreen"
            background="white"
            icon={selectedWallet.icon}
          />
        </div>
      </div>
      <div class="text relative">
        {$_('connect.connectedWallet.mainText', {
          default: en.connect.connectedWallet.mainText
        })}
      </div>
    </div>

    <div class="tick flex items-center" style="width: 24px;">
      {@html successIcon}
    </div>
  </div>
</div>
