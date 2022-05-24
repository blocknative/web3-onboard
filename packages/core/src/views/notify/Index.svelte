<script lang="ts">
  import { fly } from 'svelte/transition'
  import { quintIn } from 'svelte/easing'
  import { flip } from 'svelte/animate'
import type { NotifyInitOptions, NotificationObject } from '../../types';
import CloseButton from '../shared/CloseButton.svelte';
import { TransactionDescription } from 'ethers/lib/utils';
import { shortenAddress, shortenEns, chainStyles } from '../../utils'
import StatusChain from './StatusChain.svelte';


import { _ } from 'svelte-i18n'

  import en from '../../i18n/en.json'
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
  const statuses: NotificationObject[]  = [{
    id: 'testing123',
    type: 'error',
    key: 'keytesting1',
    // startTime?: number
    eventCode: 'txPool',
    message: 'test message'
    // autoDismiss?: number
  }, {
    id: 'testing123',
    type: 'pending',
    key: 'keytesting2',
    // startTime?: number
    eventCode: 'txConfirmReminder',
    message: 'test message'
    // autoDismiss?: number
  }]
  import { tweened } from 'svelte/motion';
  let original = 5 * 60; // TYPE NUMBER OF SECONDS HERE
	let timer = tweened(original)

  // ------ dont need to modify code below
  setInterval(() => {
    if ($timer > 0) $timer++;
  }, 1000);

  $: minutes = Math.floor($timer / 60);
  $: minname = minutes > 1 ? "mins" : "min";
  $: seconds = Math.floor($timer - minutes * 60)

  const transactionMsg = 'txPool'

  // '0x1': {
  //   icon: ethereumIcon,
  //   color: '#627EEA'
  // },
  // '0x3': {
  //   icon: ethereumIcon,
  //   color: '#627EEA'
  // },
  // '0x4': {
  //   icon: ethereumIcon,
  //   color: '#627EEA'
  // },
  // '0x5': {
  //   icon: ethereumIcon,
  //   color: '#627EEA'
  // },
  // '0x2a': {
  //   icon: ethereumIcon,
  //   color: '#627EEA'
  // },
  // '0x38': {
  //   icon: binanceIcon,
  //   color: '#F3BA2F'
  // },
  // '0x89': {
  //   icon: polygonIcon,
  //   color: '#8247E5'
  // },

  // function timeString(): string {
  //   var start = Date.now();
  //  var textNode = document.createTextNode('0');
  //  document.getElementById('seconds').appendChild(textNode);
  //  return function() {
  //       textNode.data = Math.floor((Date.now()-start)/1000);
  //       };
      
  // }
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
    padding: 74px 16px;
    max-width: 364px;
    min-width: 348px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
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

  /* .bn-notify-notification */
  li {
    font-family: inherit;
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    pointer-events: all;
    backdrop-filter: blur(5px);
    width: 100%;
    min-height: 56px;
    background: var(--onboard-gray-600, var(--gray-600));
    padding: 12px;
    border-radius: var(--onboard-border-radius-4, var(--border-radius-4));
    margin-top: 8px;
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

{#if statuses.length > 0}
  <ul
    class="bn-notify-custom bn-notify-notifications"
    style={`${positioning} ${justifyContent}`}>
    {#each statuses as status (status.key)}

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
            {$_(`notify.transaction[${transactionMsg}]`, {
              default: en.notify.transaction[transactionMsg]
            })}
          </span> 
          <!-- {eventCode} -->
          <!-- ADDRESS / ENS / transaction hash -->
          <span class="hash-time">
            <a class="address-hash" href="https://etherscan.io/address/{hash}">
              {shortenAddress(hash)}
              <!-- {ens ? shortenEns(ens.name) : shortenAddress(address)} -->
            </a>
            <span class='time'>
              - {seconds}s ago
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
    {/each}
  </ul>
{/if}
