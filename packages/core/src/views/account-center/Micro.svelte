<script lang="ts">
  import { wallets$ } from '../../streams.js'
  import { updateAccountCenter } from '../../store/actions.js'
  import questionIcon from '../../icons/question.js'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import { configuration } from '../../configuration.js'

  const { appMetadata } = configuration
  const appIcon = (appMetadata && appMetadata.icon) || questionIcon
  $: [primaryWallet] = $wallets$

  function maximize() {
    updateAccountCenter({ expanded: true })
  }
</script>

<style>
  .minimized {
    background: var(
      --account-center-micro-background,
      var(--onboard-white, var(--white))
    );
    border: 1px solid
      var(--account-center-border, var(--onboard-gray-100, var(--gray-100)));
    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
    width: 80px;
    pointer-events: auto;
  }

  .radius {
    border-radius: var(
      --account-center-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
  }

  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }

  .inner-box-wrapper {
    display: flex;
    flex-flow: row nowrap;
    padding: 12px;
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
</style>

<div class="minimized pointer radius" on:click|stopPropagation={maximize}>
  <div class="inner-box-wrapper">
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
