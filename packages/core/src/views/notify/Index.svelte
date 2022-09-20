<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { flip } from 'svelte/animate'
  import { fade, fly } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { state } from '../../store/index.js'
  import { shareReplay, startWith } from 'rxjs/operators'
  import Notification from './Notification.svelte'
  import { configuration } from '../../configuration.js'
  import type { Notification as NotificationType } from '../../types.js'

  const { device } = configuration

  const accountCenter$ = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))

  export let position: string
  export let sharedContainer: boolean
  export let notifications: NotificationType[]

  let x: number
  let y: number

  function elasticOut(t: number): number {
    return (
      Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -35.0 * t) +
      1.0
    )
  }

  $: if (position.includes('top')) {
    y = -50
  } else {
    y = 50
  }

  x = 0
  y = 0

  let overflowY = 'y-scroll'
  const updateScrollYOnRemove = (): void => {
    if (overflowY !== 'y-visible') {
      overflowY = 'y-visible'
    }
    delay(function () {
      overflowY = 'y-scroll'
    }, 1000)
  }

  const delay = (function () {
    let timer: null | ReturnType<typeof setTimeout> = null
    return (callback: () => void, ms: number) => {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }
  })()
</script>

<style>
  ul {
    padding-left: 0;
    display: flex;
    flex-flow: column nowrap;
    font-size: var(
      --notify-onboard-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );
    list-style-type: none;
    overflow: visible;
    scrollbar-width: none;
    box-sizing: border-box;
    z-index: var(--notify-onboard-z-index, 300);
    font-family: var(
      --notify-onboard-font-family-normal,
      var(--onboard-font-family-normal, var(--font-family-normal))
    );
    margin: 8px 0;
    pointer-events: all;
  }

  .y-scroll {
    overflow-y: scroll;
  }
  .y-visible {
    overflow-y: visible;
  }

  li.notification-list-top:not(:first-child) {
    margin-top: 8px;
  }

  li.notification-list-bottom:not(:first-child) {
    margin-bottom: 8px;
  }

  ul.bn-notify-bottomLeft,
  ul.bn-notify-bottomRight {
    flex-direction: column-reverse;
  }

  @media only screen and (max-width: 450px) {
    ul {
      width: 100%;
    }
  }

  :global(.bn-notify-clickable:hover) {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>

{#if notifications.length}
  <ul
    class="bn-notify-{position} {overflowY}"
    style={`${
      position.includes('top') ? 'justify-content:flex-start;' : ''
    }; max-height: calc(100vh - ${
      $accountCenter$.expanded
        ? '412px'
        : sharedContainer && device.type !== 'mobile'
        ? '82px'
        : !sharedContainer && device.type === 'mobile'
        ? '108px'
        : '24px'
    })`}
  >
    {#each notifications as notification (notification.key)}
      <li
        animate:flip={{ duration: 500 }}
        on:click|stopPropagation
        in:fly={{ duration: 1200, delay: 300, x, y, easing: elasticOut }}
        out:fade={{ duration: 300, easing: cubicOut }}
        class={`bn-notify-li-${position} ${
          position.includes('top')
            ? 'notification-list-top'
            : 'notification-list-bottom'
        }`}
      >
        <Notification
          {notification}
          updateParentOnRemove={updateScrollYOnRemove}
        />
      </li>
    {/each}
  </ul>
{/if}
