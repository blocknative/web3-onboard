<script lang="ts">
  import { fade } from 'svelte/transition'

  import { WalletAppBadge, SuccessStatusIcon } from '../shared'

  export let icon: Promise<string>
  export let label: string
  export let onClick: () => void
  export let connected: boolean
  export let connecting: boolean
  export let disabled: boolean

  let windowWidth: number
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
    height: min-content;
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
    box-shadow: var(
      --onboard-wallet-button-box-shadow-hover,
      var(--box-shadow-0)
    );
  }

  .wallet-button-container-inner {
    display: flex;
    align-items: center;
  }

  .status-icon {
    right: 16px;
  }

  @media all and (max-width: 520px) {
    button {
      display: block;
      border: 0;
    }

    button:disabled {
      opacity: 0.5;
    }

    .name {
      margin: unset;
      font-size: var(--onboard-font-size-7, var(--font-size-7));
      line-height: 1rem;
      margin-top: 8px;
    }
    .wallet-button-container-inner {
      flex-flow: column;
      position: relative;
    }

    .wallet-button-styling {
      display: block;
      padding: var(--onboard-spacing-5, var(--spacing-5));
    }

    button.connected {
      border: 0;
    }

    .status-icon-mobile {
      right: -4%;
      bottom: 24%;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<button
  class="relative justify-start wallet-button-styling"
  class:connected
  {disabled}
  in:fade
  on:click={onClick}
>
  <div class="wallet-button-container-inner">
    <WalletAppBadge
      size={windowWidth >= 809 ? 48 : 56}
      {icon}
      loading={connecting}
      border={connected ? 'green' : 'blue'}
      background="transparent"
    />
    <span class="name">{label}</span>
    {#if connected}
      <div class="absolute status-icon-mobile status-icon">
        <SuccessStatusIcon size={16} />
      </div>
    {/if}
  </div>
</button>
