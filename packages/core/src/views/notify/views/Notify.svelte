<script lang="ts">
  import { fly } from 'svelte/transition'
  import { quintIn } from 'svelte/easing'
  import { flip } from 'svelte/animate'
  import debounce from 'lodash.debounce'

  import CloseIcon from '../components/CloseIcon.svelte'
  import NotificationContent from '../components/NotificationContent.svelte'
  import TypeIcon from '../components/TypeIcon.svelte'
  import AutoDismiss from '../components/AutoDismiss.svelte'
  import { notifications, app } from '../../../stores'

  let smallScreen: boolean = window.outerWidth < 450

  let positioning: string
  let x: number
  let y: number
  let notificationMargin: string
  let justifyContent: string

  // listen for screen resize events
  window.addEventListener(
    'resize',
    debounce(() => {
      if (window.outerWidth < 450) {
        if (!smallScreen) {
          smallScreen = true
        }
      } else {
        if (smallScreen) {
          smallScreen = false
        }
      }
    }, 300)
  )

  function elasticOut(t: number): number {
    return (
      Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -35.0 * t) +
      1.0
    )
  }

  $: if ($app.desktopPosition && !smallScreen) {
    positioning =
      $app.desktopPosition === 'bottomRight'
        ? 'bottom: 0; right: 0;'
        : $app.desktopPosition === 'bottomLeft'
        ? 'left: 0; right: unset;'
        : $app.desktopPosition === 'topRight'
        ? 'top: 0;'
        : 'top: 0; bottom: unset; left: 0; right: unset;'

    x = positioning && positioning.includes('left') ? -321 : 321
    y = 0

    if ($app.desktopPosition.includes('top')) {
      justifyContent = 'justify-content: unset;'
      notificationMargin = 'margin: 0.75rem 0 0 0;'
    } else {
      justifyContent = 'justify-content: flex-end;'
      notificationMargin = 'margin: 0 0 0.75rem 0;'
    }
  }

  $: if ($app.mobilePosition && smallScreen) {
    positioning =
      $app.mobilePosition === 'top'
        ? 'top: 0; bottom: unset;'
        : 'bottom: 0; top: unset;'

    x = 0

    if ($app.mobilePosition === 'top') {
      y = -50
      justifyContent = 'justify-content: unset;'
      notificationMargin = 'margin: 0.75rem 0 0 0;'
    } else {
      y = 50
      justifyContent = 'justify-content: flex-end;'
      notificationMargin = 'margin: 0 0 0.75rem 0;'
    }
  }

  $: if (!$app.desktopPosition && !$app.mobilePosition) {
    x = smallScreen ? 0 : 321
    y = smallScreen ? 50 : 0
    notificationMargin = 'margin: 0 0 0.75rem 0;'
    justifyContent = 'justify-content: flex-end;'
    positioning = 'bottom: 0; right: 0;'
  }
</script>

<style>
  /* .bn-notify-notifications */
  ul {
    display: flex;
    flex-flow: column nowrap;
    position: fixed;
    font-size: 16px;
    padding: 0 0.75em;
    margin: 0;
    list-style-type: none;
    width: 18rem;
    bottom: 0;
    right: 0;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    color: #4a4a4a;
    background: transparent;
    scrollbar-width: none;
    box-sizing: border-box;
    height: 100vh;
    pointer-events: none;
    z-index: 99999999;
  }

  @media only screen and (max-width: 450px) {
    ul {
      width: 100%;
    }
  }

  :global(.bn-notify-custom.bn-notify-dark-mode) {
    background: #283944;
    color: #ffffff;
    background: rgba(40, 57, 68, 0.9);
  }

  :global(.bn-notify-clickable:hover) {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  /* .bn-notify-notification */
  li {
    position: relative;
    display: flex;
    padding: 0.75em;
    font-size: 0.889em;
    font-family: inherit;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    color: inherit;
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    pointer-events: all;
    background: #ffffff;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.9);
  }

  /* .bn-notify-notification-close */
  div {
    position: absolute;
    top: 0.75em;
    right: 0.75em;
    font-size: inherit;
    font-family: inherit;
  }

  a {
    display: flex;
    text-decoration: none;
    color: inherit;
  }
</style>

{#if $notifications.length > 0}
  <ul
    class="bn-notify-custom bn-notify-notifications {$app.name ? `bn-notify-${$app.name}` : ''}"
    style={`${positioning} ${justifyContent}`}>
    {#each $notifications as notification (notification.key)}
      <li
        on:click={e => notification.onclick && notification.onclick(e)}
        style={notificationMargin}
        animate:flip={{ duration: 500 }}
        class:bn-notify-dark-mode={$app.darkMode}
        class:bn-notify-clickable={notification.onclick}
        class="bn-notify-custom bn-notify-notification {`bn-notify-notification-${notification.type}`}
        {$app.name ? `bn-notify-${$app.name}` : ''}"
        in:fly={{ duration: 1200, delay: 300, x, y, easing: elasticOut }}
        out:fly={{ duration: 400, x, y, easing: quintIn }}>
        {#if notification.link}
          <a
            class="bn-notify-notification-link"
            href={notification.link}
            target="_blank"
            rel="noreferrer noopener">
            <TypeIcon type={notification.type} />
            <NotificationContent {notification} />
          </a>
        {:else}
          <TypeIcon type={notification.type} />
          <NotificationContent {notification} />
        {/if}
        <div
          class="bn-notify-custom bn-notify-notification-close {$app.name ? `bn-notify-${$app.name}` : ''}"
          on:click|stopPropagation={() => notifications.remove(notification.id, notification.eventCode)}>
          <CloseIcon />
        </div>
        <AutoDismiss {notification} />
      </li>
    {/each}
  </ul>
{/if}
