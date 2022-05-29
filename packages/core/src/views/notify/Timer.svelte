<script lang="ts">
  import { _ as formatter, locale } from 'svelte-i18n'
  import { onDestroy } from 'svelte'
  import {internalState$} from '../../streams'
  import type { NotificationObject } from '../../types';

  export let notification: NotificationObject

  const { appMetadata } = internalState$.getValue()


  function timeString(time: number): string {
    const seconds = Math.floor(time / 1000)
    const formattedSeconds = seconds < 0 ? 0 : seconds
    return formattedSeconds >= 60
      ? `${Math.floor(formattedSeconds / 60).toLocaleString(
          $locale
        )} ${$formatter('notify.time.minutes')}`
      : `${formattedSeconds.toLocaleString($locale)} ${$formatter(
          'notify.time.seconds'
        )}`
  }

  let currentTime = Date.now()

  const intervalId = setInterval(() => {
    currentTime = Date.now()
  }, 1000)

  onDestroy(() => {
    clearInterval(intervalId)
  })
</script>

<style>
  /* .bn-notify-notification-info */
  div {
    display: flex;
    justify-content: center;
    font-size: inherit;
    font-family: inherit;
    margin: 0 1.5rem 0 0.75rem;
  }

  /* .bn-notify-notification-info-meta-duration */
  span {
    font-family: inherit;
    display: flex;
    align-items: center;
    margin: 0 2px;
  }

  .time {
    color: var(--notify-onboard-gray-300, var(--onboard-gray-300, var(--gray-300)));
    margin-left: 4px;
  }
</style>

<div
  class="time bn-notify-custom bn-notify-notification-info {appMetadata.name ? `bn-notify-${appMetadata.name}` : ''}">
  {#if notification.type === 'pending' && notification.startTime}
    -
    <span
      class="bn-notify-custom bn-notify-notification-info-meta-duration-time {appMetadata.name
        ? `bn-notify-${appMetadata.name}`
        : ''}"
    >
      {timeString(currentTime - notification.startTime)}
    </span>
    ago
  {/if}
</div>
