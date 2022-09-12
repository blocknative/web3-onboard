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
    background: var(
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
    background: var(
      --onboard-wallet-button-background-hover,
      var(--onboard-primary-100, var(--primary-100))
    );
    color: var(
      --onboard-wallet-button-color-hover,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  button.connected {
    border: 1px solid var(--onboard-success-200, var(--success-200));
  }

  button.connected:hover {
    background: var(--onboard-success-100, var(--success-100));
  }
  .name {
    margin-left: var(--onboard-spacing-4, var(--spacing-4));
  }

  button.wallet-button-styling {
    border-radius: var(
      --onboard-wallet-button-border-radius,
      var(--border-radius-1)
    );
    box-shadow: var(--onboard-wallet-button-box-shadow, var(--box-shadow-0));
  }
  
  button.wallet-button-styling:hover {
    box-shadow: var(--onboard-wallet-button-box-shadow-hover, var(--box-shadow-0));
  }
</style>

<button
  class="relative justify-start wallet-button-styling"
  class:connected
  in:fade
  on:click={onClick}
>
  <WalletAppBadge
    size={48}
    {icon}
    loading={connecting}
    border={connected ? 'green' : 'blue'}
    background="transparent"
  />
  <span class="name">{label}</span>
  {#if connected}
    <div class="absolute" style="right: 16px;">
      <SuccessStatusIcon size={16} />
    </div>
  {/if}
</button>
