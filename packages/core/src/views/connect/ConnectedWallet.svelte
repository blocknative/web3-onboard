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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    border-radius: 24px;
    background: var(--onboard-success-100, var(--success-100));
    border: 1px solid var(--onboard-success-600, var(--success-600));
    width: 100%;
    box-sizing: border-box;
  }

  .icons {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .text {
    position: relative;
    right: var(--onboard-spacing-5, var(--spacing-5));
  }

  .tick {
    display: flex;
    color: var(--onboard-success-700, var(--success-700));
  }

  @media all and (max-width: 520px) {
  }
</style>

<div class="container">
  <div class="connecting-container">
    <div class="icons">
      <WalletAppBadge
        size={40}
        padding={8}
        background={appMetadata && appMetadata.icon ? 'lightBlue' : 'lightGray'}
        border="darkGreen"
        icon={(appMetadata && appMetadata.icon) || questionIcon}
      />

      <div style="position: relative; right: 0.85rem; top: 2px;">
        <SuccessStatusIcon size={17} right={null} />
      </div>

      <div style="position: relative; right: 0.5rem;">
        <WalletAppBadge
          size={40}
          padding={8}
          border="darkGreen"
          icon={selectedWallet.icon}
        />
      </div>
    </div>

    <div class="text">
      {$_('connect.connectedWallet.mainText', {
        default: en.connect.connectedWallet.mainText
      })}
    </div>

    <div class="tick" style="width: 20px;">
      {@html success}
    </div>
  </div>
</div>
