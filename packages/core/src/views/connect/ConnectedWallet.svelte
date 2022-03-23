<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { internalState$ } from '../../streams'
  import success from '../../icons/success'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'

  import type { WalletState } from '../../types'
  import questionIcon from '../../icons/question'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import en from '../../i18n/en.json'

  export let selectedWallet: WalletState

  const { appMetadata } = internalState$.getValue()
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }

  .connecting-container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
    border-radius: 24px;
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

  @media all and (max-width: 520px) {
  }
</style>

<div class="container">
  <div class="connecting-container flex justify-between items-center">
    <div class="flex justify-center items-end relative">
      <WalletAppBadge
        size={40}
        padding={8}
        background={appMetadata && appMetadata.icon ? 'lightBlue' : 'lightGray'}
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

    <div class="tick flex items-center" style="width: 20px;">
      {@html success}
    </div>
  </div>
</div>
