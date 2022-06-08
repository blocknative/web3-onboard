<script lang="ts">
  import StatusIconBadge from './StatusIconBadge.svelte'
  import NotificationContent from './NotificationContent.svelte'
  import { removeNotification } from '../../store/actions'
  import { fly } from 'svelte/transition'
  import { quintIn } from 'svelte/easing'
  import type { NotifyOptions, Notification } from '../../types'
  import CloseButton from '../shared/CloseButton.svelte'

  import {
    shortenAddress,
    shortenEns,
    chainStyles,
    networkToChainId
  } from '../../utils'
  import { configuration } from '../../configuration'
  import { onDestroy, onMount } from 'svelte'

  export let notification: Notification
  export let position: string

  let x: number
  let y: number

  function elasticOut(t: number): number {
    return (
      Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -35.0 * t) +
      1.0
    )
  }

  // Animation Code from V1
  $: if (configuration.device.type === 'mobile') {
    x = 0

    if (position.includes('top')) {
      y = -50
    } else {
      y = 50
    }
  }

  x = position.includes('left') ? -321 : 321
  y = 0

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
    padding: 12px;
    border-radius: var(
      --notify-onboard-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
    display: flex;
  }

  div.notify-close-btn {
    margin-left: auto;
    margin-bottom: auto;
    height: 24px;
    width: 24px;
  }

  a {
    display: flex;
    text-decoration: none;
    color: inherit;
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
  in:fly={{ duration: 1200, delay: 300, x, y, easing: elasticOut }}
  out:fly={{ duration: 400, x, y, easing: quintIn }}
>
  {#if notification.link}
    <a href={notification.link} target="_blank" rel="noreferrer noopener">
      <StatusIconBadge
        {notification}
        chainStyles={chainStyles[networkToChainId[notification.network]]}
      />
      <NotificationContent {notification} />
    </a>
  {:else}
    <StatusIconBadge
      {notification}
      chainStyles={chainStyles[networkToChainId[notification.network]]}
    />
    <NotificationContent {notification} />
  {/if}

  <div
    on:click|stopPropagation={() => removeNotification(notification.id)}
    class="notify-close-btn"
  >
    <CloseButton width="12px" />
  </div>
</div>
