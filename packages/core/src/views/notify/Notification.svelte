<script lang="ts">
  import StatusIconBadge from './StatusIconBadge.svelte'
  import NotificationContent from './NotificationContent.svelte'
  import { removeNotification } from '../../store/actions'

  import type { Notification } from '../../types'
  import closeIcon from '../../icons/close-circle'

  import { chainStyles, networkToChainId } from '../../utils'
  import { onDestroy, onMount } from 'svelte'

  export let notification: Notification

  let timeoutId: NodeJS.Timeout

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
  }

  .bn-notify-notification:hover > div.notify-close-btn {
    visibility: visible;
    opacity: 1;
  }

  div.notify-close-btn {
    margin-left: auto;
    margin-bottom: auto;
    height: 24px;
    width: 24px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.15s linear, opacity 0.15s linear;
  }

  .notify-close-btn .close-icon {
    width:24px; 
    color: var(
      --notify-onboard-gray-200,
      var(--onboard-gray-200, var(--gray-200))
    );
  }

  .transaction-status {
    color: var(
      --notify-onboard-primary-100,
      var(--onboard-primary-100, var(--primary-100))
    );
    line-height: 14px;
  }
</style>

<div
  class:bn-notify-clickable={notification.onclick}
  on:click={e => notification.onclick && notification.onclick(e)}
  class="bn-notify-notification bn-notify-notification-{notification.type}}"
>
  <StatusIconBadge
    {notification}
    chainStyles={chainStyles[networkToChainId[notification.network]]}
  />
  <NotificationContent {notification} />

  <div
    on:click|stopPropagation={() => removeNotification(notification.id)}
    class="notify-close-btn pointer"
  >
    <div class="flex items-center close-icon">
      {@html closeIcon}
    </div>
  </div>
</div>
