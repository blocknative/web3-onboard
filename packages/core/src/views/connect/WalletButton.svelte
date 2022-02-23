<script lang="ts">
  import { fade } from 'svelte/transition'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'

  export let icon: Promise<string>
  export let label: string
  export let onClick: () => void
  export let connected: boolean
  export let connecting: boolean
</script>

<style>
  button {
    position: relative;
    background-color: var(
      --onboard-wallet-button-background,
      var(--onboard-white, var(--white))
    );
    border: 1px solid
      var(
        --onboard-wallet-button-border-color,
        var(--onboard-primary-200, var(--primary-200))
      );
    transition: background-color 250ms ease-in-out;
    color: var(
      --onboard-wallet-button-color,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  button:hover {
    background-color: var(
      --onboard-wallet-button-background-hover,
      var(--onboard-primary-100, var(--primary-100))
    );
  }

  button.connected {
    border: 1px solid var(--onboard-success-200, var(--success-200));
  }

  button.connected:hover {
    background-color: var(--onboard-success-100, var(--success-100));
  }
  .name {
    margin-left: var(--onboard-spacing-4, var(--spacing-4));
  }
</style>

<button class:connected in:fade on:click={onClick}>
  <WalletAppBadge
    size={48}
    {icon}
    loading={connecting}
    border={connected ? 'green' : 'blue'}
    background="transparent"
  />
  <span class="name">{label}</span>
  {#if connected}
    <SuccessStatusIcon size={16} bottom={null} right={16} />
  {/if}
</button>
