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
  button:disabled {
    opacity: 0.5;
  }

  button.wallet-button-styling {
    position: relative;
    align-items: flex-start;
    flex: 1;
    padding: 0;
    background: none;
  }

  .wallet-button-container {
    display: flex;
  }

  .wallet-button-container-inner {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 0.5rem;
    padding: .75rem;
    width: 5rem;
  }

  .name {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: 1rem;
    text-overflow: ellipsis;
    max-width: 5rem;
    max-height: 2rem;
    overflow: hidden;
  }

  .status-icon {
    position: absolute;
    top: 3.5rem;
    left: 3.5rem;
  }

  @media screen and (min-width: 768px) {
    button.wallet-button-styling {
      transition: background-color 250ms ease-in-out;
      background: var(
        --onboard-wallet-button-background,
        var(--onboard-white, var(--white))
      );
      border-radius: var(
        --onboard-wallet-button-border-radius,
        var(--border-radius-1)
      );
      border: 1px solid var(
        --onboard-wallet-button-border-color,
        var(--onboard-primary-200, var(--primary-200))
      );
    }

    button.wallet-button-styling:hover {
      background: var(
        --onboard-wallet-button-background-hover,
        var(--onboard-primary-100, var(--primary-100))
      );
    }

    .wallet-button-container-inner {
      flex: 1;
      flex-flow: row nowrap;
      gap: 1rem;
      padding: 1rem;
    }

    button.connected {
      border-color: var(--onboard-success-500, var(--success-500))
    }

    button.connected:hover {
      background: var(--onboard-success-100, var(--success-100));
    }

    .name {
      font-size: 1rem;
      line-height: 1.25rem;
      text-align: initial;
      max-width: inherit;
      max-height: 3rem;
    }

    .status-icon {
      top: 0;
      bottom: 0;
      left: auto;
      right: 1rem;
      margin: auto;
      height: 20px;
    }

  }

</style>

<svelte:window bind:innerWidth={windowWidth} />

<div class="wallet-button-container">
  <button
    class="wallet-button-styling"
    class:connected
    {disabled}
    in:fade
    on:click={onClick}
  >
    <div class="wallet-button-container-inner">
      <WalletAppBadge
        size={windowWidth >= 768 ? 48 : 56}
        {icon}
        loading={connecting}
        border={connected ? 'green' : 'blue'}
        background="transparent"
      />
      <div class="name">{label}</div>
      {#if connected}
        <div class="status-icon">
          <SuccessStatusIcon size={20} />
        </div>
      {/if}
    </div>
  </button>
</div>
