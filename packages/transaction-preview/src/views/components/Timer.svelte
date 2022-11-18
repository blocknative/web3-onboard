<script lang="ts">
  import { _ as formatter, locale } from 'svelte-i18n'
  import en from '../../i18n/en.json'
  import { onDestroy } from 'svelte'

  export let startTime: number

  const formatSeconds = (time: number) => {
    const seconds = Math.floor(time / 1000)
    return seconds < 0 ? 0 : seconds
  }

  const timeString = (time: number): string => {
    const formattedSeconds = formatSeconds(time)
    return formattedSeconds >= 60
      ? `${Math.floor(formattedSeconds / 60).toLocaleString(
          $locale
        )} ${$formatter('time.minutes')}`
      : `${formattedSeconds.toLocaleString($locale)} ${$formatter(
          'time.seconds'
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
  div {
    display: flex;
    justify-content: center;
    font-size: inherit;
    font-family: inherit;
  }

  span {
    font-family: inherit;
    display: flex;
    align-items: center;
    margin: 0 2px;
  }

  .time {
    color: var(--onboard-gray-300, var(--gray-300))
  }

  .stale {
    color: var(--onboard-warning-300, var(--warning-300));
  }
</style>

<div class={`time ${formatSeconds(currentTime - startTime) >= 60 && 'stale'}`}>
  {$formatter('timeSection.action', {
    default: en.timeSection.action
  })}
  {#if startTime}
    -
    <span>
      {timeString(currentTime - startTime)}
    </span>
    {$formatter('timeSection.past', {
      default: en.timeSection.past
    })}
  {/if}
</div>
