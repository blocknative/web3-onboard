<script lang="ts">
  import { _ as formatter } from 'svelte-i18n'
  import { onDestroy } from 'svelte'
  import { app } from '../../../stores'
  import NotificationMessage from '../elements/NotificationMessage.svelte'
  import Clock from '../elements/Clock.svelte'
  import Time from '../elements/Time.svelte'
  import Timer from '../elements/Timer.svelte'
  import type {
    CustomNotificationObject,
    NotificationObject
  } from '../../../types'

  function timeString(time: number): string {
    const seconds = Math.floor(time / 1000)
    const formattedSeconds = seconds < 0 ? 0 : seconds
    return formattedSeconds >= 60
      ? `${Math.floor(formattedSeconds / 60).toLocaleString(
          $app.clientLocale
        )} ${$formatter('time.minutes')}`
      : `${formattedSeconds.toLocaleString($app.clientLocale)} ${$formatter(
          'time.seconds'
        )}`
  }

  function formatTime(number: number): string {
    const time = new Date(number)
    return time.toLocaleString($app.clientLocale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  export let notification: NotificationObject & CustomNotificationObject

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
    flex-flow: column nowrap;
    justify-content: center;
    font-size: inherit;
    font-family: inherit;
    margin: 0 1.5rem 0 0.75rem;
  }

  /* .bn-notify-notification-info-meta */
  p {
    display: flex;
    align-items: center;
    margin: 0.5em 0 0 0;
    opacity: 0.7;
    font-size: 0.889em;
    line-height: 1.15;
    font-family: inherit;
  }

  /* .bn-notify-notification-info-meta-duration */
  span {
    font-family: inherit;
    display: flex;
    align-items: center;
  }
</style>

<div
  class="bn-notify-custom bn-notify-notification-info {$app.name ? `bn-notify-${$app.name}` : ''}">
  <NotificationMessage message={notification.message} />
  <p
    class="bn-notify-custom bn-notify-notification-info-meta {$app.name ? `bn-notify-${$app.name}` : ''}">
    <Time time={formatTime(currentTime)} />
    {#if notification.type === 'pending' && notification.startTime}
      <span
        class="bn-notify-custom bn-notify-notification-info-meta-duration {$app.name ? `bn-notify-${$app.name}` : ''}">
        -
        <Clock />
        <Timer value={timeString(currentTime - notification.startTime)} />
      </span>
    {/if}
  </p>
</div>
