<script lang="ts">
  import StatusIconBadge from './StatusIconBadge.svelte'
  import NotificationContent from './NotificationContent.svelte'
  import { removeNotification } from '../../store/actions'

  import type { Notification } from '../../types'
  import closeIcon from '../../icons/close-circle'

  import { chainStyles, networkToChainId } from '../../utils'
  import { onDestroy, onMount } from 'svelte'
  import { configuration } from '../../configuration'

  const { device, gas } = configuration

  export let notification: Notification
  export let updateParentOnRemove: () => void

  let timeoutId: NodeJS.Timeout
  let hovered = false

  onMount(() => {
    if (notification.autoDismiss) {
      timeoutId = setTimeout(() => {
        removeNotification(notification.id)
      }, notification.autoDismiss)
    }
  })

  onDestroy(() => {
    clearTimeout(timeoutId)
  })

  function actionableEventCode(eventCode: Notification['eventCode']): boolean {
    switch (eventCode) {
      case 'txPool':
      case 'txConfirmed':
      case 'txFailed':
        return true
      default:
        return false
    }
  }
</script>

<style>
  .bn-notify-notification {
    font-family: inherit;
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    pointer-events: all;
    backdrop-filter: blur(5px);
    width: 100%;
    min-height: 56px;
    background: var(
      --notify-onboard-gray-600,
      var(--onboard-gray-600, var(--gray-600))
    );
    padding: 0.75rem;
    border-radius: var(
      --notify-onboard-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
    display: flex;
    position: relative;
  }

  .bn-notify-notification:hover > div.notify-close-btn-desktop {
    visibility: visible;
    opacity: 1;
  }

  div.notify-close-btn {
    margin-left: auto;
    margin-bottom: auto;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 8px;
    right: 8px;
    justify-content: center;
    align-items: center;
  }

  div.notify-close-btn-desktop {
    visibility: hidden;
    transition: visibility 0.15s linear, opacity 0.15s linear;
    opacity: 0;
  }

  .notify-close-btn .close-icon {
    width: 20px;
    margin: auto;
  }

  .notify-close-btn > .close-icon {
    color: var(
      --notify-onboard-gray-300,
      var(--onboard-gray-300, var(--gray-300))
    );
  }

  .notify-close-btn:hover > .close-icon {
    color: var(
      --notify-onboard-gray-100,
      var(--onboard-gray-100, var(--gray-100))
    );
  }

  .transaction-status {
    color: var(
      --notify-onboard-primary-100,
      var(--onboard-primary-100, var(--primary-100))
    );
    line-height: 14px;
  }

  .dropdown {
    height: 0px;
    overflow: hidden;
    transition: height 150ms ease-in-out;
  }

  .dropdown-visible {
    height: 48px;
  }

  .dropdown-buttons {
    background-color: var(
      --notify-onboard-gray-600,
      var(--onboard-gray-600, var(--gray-600))
    );
    width: 100%;
    padding: 8px;
  }

  .drop-button {
    padding: 4px 12px;
    background-color: transparent;
    font-size: var(
      --notify-onboard-font-size-6,
      var(--onboard-font-size-6, var(--font-size-6))
    );
    color: var(
      --notify-onboard-primary-400,
      var(--onboard-primary-400, var(--primary-400))
    );
    transition: background-color 150ms ease-in-out;
  }

  .drop-button:hover {
    background-color: var(
      --notify-onboard-primary-100,
      var(--onboard-primary-100, var(--primary-100))
    );
  }
</style>

<div
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
  class:bn-notify-clickable={notification.onClick}
  on:click={e => notification.onClick && notification.onClick(e)}
  class="bn-notify-notification bn-notify-notification-{notification.type}}"
>
  <StatusIconBadge
    {notification}
    chainStyles={chainStyles[networkToChainId[notification.network]]}
  />
  <NotificationContent {notification} />

  <div
    on:click|stopPropagation={() => {
      removeNotification(notification.id)
      updateParentOnRemove()
    }}
    class="notify-close-btn notify-close-btn-{device.type} pointer flex"
  >
    <div class="flex items-center close-icon">
      {@html closeIcon}
    </div>
  </div>

  <!-- HOVER ACTION DROPDOWN -->
  <div
    class="dropdown"
    class:dropdown-visible={hovered &&
      gas &&
      actionableEventCode(notification.eventCode)}
  >
    {#if notification.eventCode === 'txPool'}
      <div class="dropdown-buttons flex items-end">
        <button class="dropdown-button">Cancel</button>
        <button class="dropdown-button">Speed-up</button>
      </div>
    {:else if notification.eventCode === 'txConfirmed' || notification.eventCode === 'txFailed'}
      <div class="dropdown-buttons flex items-end">
        <button class="dropdown-button">View Details</button>
      </div>
    {/if}
  </div>
</div>
