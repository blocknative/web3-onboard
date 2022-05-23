<script lang="ts">
  import { fly } from 'svelte/transition'
  import { quintIn } from 'svelte/easing'
  import { flip } from 'svelte/animate'
import type { NotifyInitOptions, NotificationObject } from '../../types';
import CloseButton from '../shared/CloseButton.svelte';
import { TransactionDescription } from 'ethers/lib/utils';
import { shortenAddress, shortenEns, chainStyles } from '../../utils'
import StatusChain from './StatusChain.svelte';

  // import debounce from 'lodash.debounce'

  // import CloseIcon from '../components/CloseIcon.svelte'
  // import NotificationContent from '../components/NotificationContent.svelte'
  // import TypeIcon from '../components/TypeIcon.svelte'
  // import AutoDismiss from '../components/AutoDismiss.svelte'
  // import { notifications, app } from '../stores'

  export let settings: NotifyInitOptions


  let smallScreen: boolean = window.outerWidth < 450

  let positioning: string
  let x: number
  let y: number
  let notificationMargin: string
  let justifyContent: string

  // listen for screen resize events
  // window.addEventListener(
  //   'resize',
  //   debounce(() => {
  //     if (window.outerWidth < 450) {
  //       if (!smallScreen) {
  //         smallScreen = true
  //       }
  //     } else {
  //       if (smallScreen) {
  //         smallScreen = false
  //       }
  //     }
  //   }, 300)
  // )

  function elasticOut(t: number): number {
    return (
      Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -35.0 * t) +
      1.0
    )
  }
  

  // $: if ($app.desktopPosition && !smallScreen) {
  //   positioning =
  //     $app.desktopPosition === 'bottomRight'
  //       ? 'bottom: 0; right: 0;'
  //       : $app.desktopPosition === 'bottomLeft'
  //       ? 'left: 0; right: unset;'
  //       : $app.desktopPosition === 'topRight'
  //       ? 'top: 0;'
  //       : 'top: 0; bottom: unset; left: 0; right: unset;'

  //   x = positioning && positioning.includes('left') ? -321 : 321
  //   y = 0

  //   if ($app.desktopPosition.includes('top')) {
  //     justifyContent = 'justify-content: unset;'
  //     notificationMargin = 'margin: 0.75rem 0 0 0;'
  //   } else {
  //     justifyContent = 'justify-content: flex-end;'
  //     notificationMargin = 'margin: 0 0 0.75rem 0;'
  //   }
  // }

  // $: if ($app.mobilePosition && smallScreen) {
  //   positioning =
  //     $app.mobilePosition === 'top'
  //       ? 'top: 0; bottom: unset;'
  //       : 'bottom: 0; top: unset;'

  //   x = 0

  //   if ($app.mobilePosition === 'top') {
  //     y = -50
  //     justifyContent = 'justify-content: unset;'
  //     notificationMargin = 'margin: 0.75rem 0 0 0;'
  //   } else {
  //     y = 50
  //     justifyContent = 'justify-content: flex-end;'
  //     notificationMargin = 'margin: 0 0 0.75rem 0;'
  //   }
  // }

  // $: if (!$app.desktopPosition && !$app.mobilePosition) {
  //   x = smallScreen ? 0 : 321
  //   y = smallScreen ? 50 : 0
  //   notificationMargin = 'margin: 0 0 0.75rem 0;'
  //   justifyContent = 'justify-content: flex-end;'
  //   positioning = 'bottom: 0; right: 0;'
  // }


  const hash = "0xc572779D7839B998DF24fc316c89BeD3D450ED13"
  const currentChain = '0x89'
  const status: NotificationObject  = {
    id: 'testing123',
    type: 'success',
    key: 'keytesting',
    // startTime?: number
    // eventCode?: string
    message: 'test message'
    // autoDismiss?: number
  }
</script>

<style>
  /* .bn-notify-notifications */
  ul {
    display: flex;
    flex-flow: column nowrap;
    position: fixed;
    font-size: 16px;
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


    padding: 80px 16px;
    max-width: 364px;
    min-width: 348px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
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
    font-family: inherit;
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    pointer-events: all;
    backdrop-filter: blur(5px);

    width: 100%;
    height: 56px;
    background: #242835;
    padding: 12px;
    border-radius: var(--onboard-border-radius-4, var(--border-radius-4));
    display: flex;
  }

  div.notify-transaction-data {
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    font-family: inherit;
    margin: 0px 8px;
    justify-content: space-between;
  }

  .hash-time {
    display: inline-flex;
    margin-top: 2px;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-line-height-4, var(--line-height-4));
  }
  a {
  }

  .time {
    color: var(--onboard-gray-300, var(--gray-300));
    margin-left: 4px;
  }

  .address-hash {
    color: var(--onboard-primary-400, var(--primary-400))
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
    color: var(--onboard-primary-100, var(--primary-100));
    line-height: 14px;
  }
</style>

<!-- {#if $notifications.length > 0} -->
  <ul
    class="bn-notify-custom bn-notify-notifications"
    style={`${positioning} ${justifyContent}`}>
    <!-- {#each $notifications as notification (notification.key)} -->

    <!-- on:click={e => notification.onclick && notification.onclick(e)}
    class:bn-notify-clickable={notification.onclick} -->
    <!-- animate:flip={{ duration: 500 }} -->
      <li
        style={notificationMargin}
        class="bn-notify-custom bn-notify-notification "
        in:fly={{ duration: 1200, delay: 300, x, y, easing: elasticOut }}
        out:fly={{ duration: 400, x, y, easing: quintIn }}>

        <!-- statusIconBadge -->
        <StatusChain notification={status} chainStyles={chainStyles[currentChain]}/>
        <div class="flex flex-column notify-transaction-data">

          <span class='transaction-status'>
            Transaction is pending
          </span> 
          <!-- {eventCode} -->
          <!-- ADDRESS / ENS / transaction hash -->
          <span class="hash-time">
            <a class="address-hash" href="https://etherscan.io/address/{hash}">
              {shortenAddress(hash)}
              <!-- {ens ? shortenEns(ens.name) : shortenAddress(address)} -->
            </a>
            <span class='time'>
              - 2s ago
            </span>
            <!-- time since event - get from v1 -->
            
          </span>
        </div>


        <!-- {#if notification.link}
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
        {/if} -->
        <!-- <div
          class="bn-notify-custom bn-notify-notification-close {$app.name ? `bn-notify-${$app.name}` : ''}"
          on:click|stopPropagation={() => notifications.remove(notification.id, notification.eventCode)}>
          <CloseIcon />
        </div> -->
        <div class="notify-close-btn">
          <CloseButton width={"14px"}/>
        </div>
      </li>
    <!-- {/each} -->
  </ul>
<!-- {/if} -->
