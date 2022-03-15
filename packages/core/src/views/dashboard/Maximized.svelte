<script lang="ts">
  import { internalState$, wallets$ } from '../../streams'
  import WalletRow from './WalletRow.svelte'
</script>

<style>
  .outer-container {
    background-color: var(--onboard-gray-600, var(--gray-600));
    border-radius: 16px;
  }

  .wallets {
    padding: var(--onboard-spacing-5, var(--spacing-5));
  }
</style>

<div class="outer-container">
  <!-- connected accounts -->
  <div class="wallets">
    {#each $wallets$ as wallet}
      <WalletRow {wallet} />
    {/each}
  </div>
</div>
