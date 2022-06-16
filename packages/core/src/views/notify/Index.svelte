<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { flip } from 'svelte/animate'
  import { fade, fly } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { state } from '../../store'
  import { startWith } from 'rxjs'
  import Notification from './Notification.svelte'

  export let position: string

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

  const notifications$ = state.select('notifications').pipe(startWith([]))
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
    max-height: calc(100vh - 76px);
    overflow: visible;
    scrollbar-width: none;
    box-sizing: border-box;
    z-index: 300;
    font-family: var(
      --notify-onboard-font-family-normal,
      var(--onboard-font-family-normal, var(--font-family-normal))
    );
    margin: 8px 0;
    overflow-y: scroll;
  }

  li.notification-list-top:not(:first-child) {
    margin-top: 8px;
  }

  li.notification-list-bottom:not(:last-child) {
    margin-bottom: 8px;
  }

  ul.bn-notify-bottomLeft,
  ul.bn-notify-bottomRight {
    transform: rotate(180deg);
  }
  ul > li.bn-notify-li-bottomLeft,
  ul > li.bn-notify-li-bottomRight {
    transform: rotate(-180deg);
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

{#if $notifications$.length}
  <ul
    class="bn-notify-custom bn-notify-{position}"
    style={`justify-content:${
      position.includes('top') ? 'flex-start' : 'flex-end'
    };`}
  >
    {#each $notifications$ as notification (notification.key)}
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
        <Notification {notification} />
      </li>
    {/each}
  </ul>
{/if}
