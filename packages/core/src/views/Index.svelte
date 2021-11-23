<script lang="ts">
  import { connectWallet$, switchChainModal$ } from '../streams'
  import Connect from './connect/Index.svelte'
  import SwitchChain from './chain/SwitchChain.svelte'
</script>

<style>
  :global(.onboard-button-primary) {
    border-radius: 24px;
    background: var(--onboard-white, var(--white));
    padding: 0.5rem 1rem;
    color: var(--onboard-gray-500, var(--gray-500));
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    border: 1px solid var(--onboard-gray-500, var(--gray-500));
  }
</style>

{#if $connectWallet$.inProgress}
  <Connect options={$connectWallet$} />
{/if}

{#if $switchChainModal$}
  <SwitchChain />
{/if}
