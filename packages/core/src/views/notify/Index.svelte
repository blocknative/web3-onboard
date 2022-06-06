<script lang="ts">
  import { fly } from 'svelte/transition'
  import { quintIn } from 'svelte/easing'
  import { flip } from 'svelte/animate'
  import type { NotifyOptions, Notification } from '../../types'
  import CloseButton from '../shared/CloseButton.svelte'
  import { shortenAddress, shortenEns, chainStyles } from '../../utils'
  import StatusIconBadge from './StatusIconBadge.svelte'
  import { _ } from 'svelte-i18n'
  import NotificationContent from './NotificationContent.svelte'
  import { configuration } from '../../configuration'
  import { state } from '../../store'

  export let position: string

  const { appMetadata } = configuration
  const notifications$ = state.select('notifications')

  let x: number
  let y: number

  function elasticOut(t: number): number {
    return (
      Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -35.0 * t) +
      1.0
    )
  }

  x = position && position.includes('left') ? -321 : 321
  y = 0

  // Animation Code from V1
  // $: if ($app.mobilePosition && smallScreen) {
  //   x = 0

  //   if ($app.mobilePosition === 'top') {
  //     y = -50
  //   } else {
  //     y = 50
  //   }
  // }

  // $: if (!$app.desktopPosition && !$app.mobilePosition) {
  //   x = smallScreen ? 0 : 321
  //   y = smallScreen ? 50 : 0
  // }
</script>

<style>
  ul {
    padding-left: 0;
    display: flex;
    flex-flow: column nowrap;
    font-size: 16px;
    list-style-type: none;
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    color: #4a4a4a;
    background: transparent;
    scrollbar-width: none;
    box-sizing: border-box;
    height: 100vh;
    pointer-events: none;
    z-index: 300;
    font-family: var(
      --notify-onboard-font-family-normal,
      var(--onboard-font-family-normal, var(--font-family-normal))
    );
    margin: 8px 0;
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

  li {
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
    margin-top: 8px;
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

{#if $notifications$.length}
  <ul
    class="bn-notify-custom bn-notify-notify"
    style={`justify-content:${
      position.includes('top') ? 'flex-start' : 'flex-end'
    };`}
  >
    {#each $notifications$ as notification (notification.key)}
      <!-- on:click={e => notification.onclick && notification.onclick(e)}
    class:bn-notify-clickable={notification.onclick} -->
      <!-- animate:flip={{ duration: 500 }} -->
      <li
        class="bn-notify-custom bn-notify-notification {`bn-notify-notification-${notification.type}`}
          {appMetadata.name ? `bn-notify-${appMetadata.name}` : ''}"
        in:fly={{ duration: 1200, delay: 300, x, y, easing: elasticOut }}
        out:fly={{ duration: 400, x, y, easing: quintIn }}
      >
        {#if notification.link}
          <a href={notification.link} target="_blank" rel="noreferrer noopener">
            <StatusIconBadge
              {notification}
              chainStyles={chainStyles[notification.network]}
            />
            <NotificationContent {notification} />
          </a>
        {:else}
          <StatusIconBadge
            {notification}
            chainStyles={chainStyles[notification.network]}
          />
          <NotificationContent {notification} />
        {/if}
        <!-- 
          To handle close button
          on:click|stopPropagation={() => notify.remove(notification.id, notification.eventCode)}>
        -->
        <div
          class="notify-close-btn {appMetadata.name
            ? `bn-notify-${appMetadata.name}`
            : ''}"
        >
          <CloseButton width={'12px'} />
        </div>
      </li>
    {/each}
  </ul>
{/if}
