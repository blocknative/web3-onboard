<script lang="ts">
  import { shareReplay, startWith } from 'rxjs/operators'
  import { wallets$ } from '../../streams.js'
  import { questionIcon } from '../../icons/index.js'
  import { WalletAppBadge, SuccessStatusIcon } from '../shared/index.js'
  import { state } from '../../store/index.js'

  export let toggle: () => void

  const appMetadata$ = state
    .select('appMetadata')
    .pipe(startWith(state.get().appMetadata), shareReplay(1))

  $: [primaryWallet] = $wallets$

  const accountCenter$ = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))

</script>

<style>
  .ac-trigger {
    --background-color: var(
      --account-center-minimized-background,
      var(--w3o-background-color, white)
    );
    --text-color: var(--w3o-text-color, var(--gray-700));
    --border-color: var(
      --account-center-border,
      var(--w3o-border-color, var(--onboard-gray-200, var(--gray-200)))
    );
    --border-radius: var(
      --account-center-border-radius,
      var(--w3o-border-radius, 1rem)
    );

    position: relative;
    cursor: pointer;
    pointer-events: auto;
    min-width: 80px;

    background: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
    z-index: var(--account-center-z-index, 1);
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

  .inner-row {
    display: flex;
    flex-flow: row nowrap;
    width: 80px;
    padding: 0.75rem;
  }
  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }
</style>

<div
  class="ac-trigger"
  on:click|stopPropagation={toggle}
  style={$accountCenter$.position.includes('Left')
    ? 'align-self: flex-start'
    : null}
>
  <div class="inner-row">
    <!-- app and wallet icon badge -->
    <div class="drop-shadow">
      <WalletAppBadge
        size={32}
        padding={4}
        background={'white'}
        border="darkGreen"
        radius={8}
        icon={($appMetadata$ && $appMetadata$.icon) || questionIcon}
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
