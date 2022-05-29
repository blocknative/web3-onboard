<script lang="ts">
  import { fly } from 'svelte/transition'
  import { quintIn } from 'svelte/easing'
  import { flip } from 'svelte/animate'
  import type { NotifyOptions, NotificationObject } from '../../types'
  import CloseButton from '../shared/CloseButton.svelte'
  import { TransactionDescription } from 'ethers/lib/utils'
  import { shortenAddress, shortenEns, chainStyles } from '../../utils'
  import StatusIconBadge from './StatusIconBadge.svelte'
  import { _ } from 'svelte-i18n'
  import en from '../../i18n/en.json'
  import { tweened } from 'svelte/motion'
  import Timer from './Timer.svelte'

  export let settings: { notifySettings: NotifyOptions; position: string }
  const { notifySettings, position } = settings

  let x: number
  let y: number

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

  const hash = '0xc572779D7839B998DF24fc316c89BeD3D450ED13'
  const currentChain = '0x89'
  const notifications: NotificationObject[] = [
    {
      id: 'testing123',
      type: 'error',
      key: 'keytesting1',
      startTime: Date.now(),
      eventCode: 'txPool',
      message: 'test message'
      // autoDismiss?: number
    },
    {
      id: 'testing1232',
      type: 'pending',
      key: 'keytesting2',
      startTime: Date.now(),
      eventCode: 'txConfirmReminder',
      message: 'test message'
      // autoDismiss?: number
    }
  ]

  let original = 5 * 60 // TYPE NUMBER OF SECONDS HERE
  let timer = tweened(original)

  // ------ dont need to modify code below
  setInterval(() => {
    if ($timer > 0) $timer++
  }, 1000)

  $: minutes = Math.floor($timer / 60)
  $: minname = minutes > 1 ? 'mins' : 'min'
  $: seconds = Math.floor($timer - minutes * 60)

  const transactionMsg = 'txPool'
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
    font-family: var(--notify-onboard-font-family-normal, var(--onboard-font-family-normal, var(--font-family-normal)));
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
    background: var(--notify-onboard-gray-600, var(--onboard-gray-600, var(--gray-600)));
    padding: 12px;
    border-radius: var(--notify-onboard-border-radius, var(--onboard-border-radius-4, var(--border-radius-4)));
    margin-top: 8px;
    display: flex;
  }

  div.notify-transaction-data {
    font-size: var(--notify-onboard-font-size-6, var(--onboard-font-size-6, var(--font-size-6)));
    font-family: inherit;
    margin: 0px 8px;
    justify-content: space-between;
  }

  .hash-time {
    display: inline-flex;
    margin-top: 2px;
    font-size: var(--notify-onboard-font-size-7, var(--onboard-font-size-7, var(--font-size-7)));
    line-height: var(--notify-onboard-line-height-4, var(--onboard-line-height-4, var(--line-height-4)));
  }


  .address-hash {
    color: var(--notify-onboard-primary-400, var(--onboard-primary-400, var(--primary-400)));
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
    color: var(--notify-onboard-primary-100, var(--onboard-primary-100, var(--primary-100)));
    line-height: 14px;
  }
</style>

{#if notifications.length > 0}
  <ul
    class="bn-notify-custom bn-notify-notifications"
    style={`justify-content:${
      position.includes('top') ? 'flex-start' : 'flex-end'
    };`}
  >
    {#each notifications as notification (notification.key)}
      <!-- on:click={e => notification.onclick && notification.onclick(e)}
    class:bn-notify-clickable={notification.onclick} -->
    <!-- animate:flip={{ duration: 500 }} -->
      <li
          class="bn-notify-custom bn-notify-notification "
          in:fly={{ duration: 1200, delay: 300, x, y, easing: elasticOut }}
          out:fly={{ duration: 400, x, y, easing: quintIn }}
        >
          <StatusIconBadge
            notification={notification}
            chainStyles={chainStyles[currentChain]}
          />
          <div class="flex flex-column notify-transaction-data">
            <span class="transaction-status">
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
              <Timer notification={notification}/>
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
          <CloseButton width={'12px'} />
        </div>
      </li>
    {/each}
  </ul>
{/if}
