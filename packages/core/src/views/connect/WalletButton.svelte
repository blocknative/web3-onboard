<script lang="ts">
  import { fade } from 'svelte/transition'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'

  export let icon: string
  export let label: string
  export let onClick: () => void
  export let connected: boolean
</script>

<style>
  button {
    display: flex;
    align-items: center;
    padding: 1rem;
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

  .name {
    margin-left: 0.5rem;
  }
</style>

<button in:fade on:click={onClick}>
  <WalletAppBadge size={48} {icon} />
  <span class="name">{label}</span>
</button>
