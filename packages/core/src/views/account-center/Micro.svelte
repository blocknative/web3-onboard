<script lang="ts">
  import { wallets$ } from '../../streams.js'
  import { updateAccountCenter } from '../../store/actions.js'
  import { questionIcon } from '../../icons/index.js'
  import { WalletAppBadge, SuccessStatusIcon } from '../shared/index.js'
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
    --background-color: var(--w3o-background-color);
    --text-color: var(--w3o-text-color);
    --border-color: var(--w3o-border-color, var(--account-center-border, var(--onboard-gray-100, transparent)));

    cursor: pointer;
    pointer-events: auto;
    border: 1px solid transparent;

    background: var(--background-color);
    color: var(--text-color);
    border-color: var(--border-color);
    border-radius: var(--account-center-border-radius, 1rem);

    /* background: var(
      --account-center-micro-background,
      var(--onboard-white, var(--white))
    ); */

    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
  }

  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }

  .inner-row {
    display: flex;
    flex-flow: row nowrap;
    width: 80px;
    padding: 0.75rem;
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

<div class="minimized" on:click|stopPropagation={maximize}>
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
