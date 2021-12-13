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
    display: flex;
    align-items: center;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    border-radius: 24px;
    background-color: white;
    cursor: pointer;
    font: inherit;
    border: 1px solid var(--onboard-blue-200, var(--blue-200));
    transition: background-color 250ms ease-in-out;
  }

  button:hover {
    background-color: var(--onboard-blue-100, var(--blue-100));
  }

  button.connected {
    border: 1px solid var(--onboard-success-200, var(--success-200));
  }

  button.connected:hover {
    background-color: var(--onboard-success-100, var(--success-100));
  }
  .name {
    margin-left: var(--onboard-spacing-5, var(--spacing-5));
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
