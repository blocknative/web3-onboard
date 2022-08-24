<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import StatusIconBadge from './StatusIconBadge.svelte'
  import NotificationContent from './NotificationContent.svelte'
  import type { Notification } from '../../types.js'
  import closeIcon from '../../icons/close-circle.js'
  import { configuration } from '../../configuration.js'
  import { removeTransaction, transactions$, wallets$ } from '../../streams.js'
  import { chainStyles, networkToChainId } from '../../utils.js'

  import {
    addCustomNotification,
    removeNotification
  } from '../../store/actions.js'

  import {
    actionableEventCode,
    replaceTransaction,
    validGasNetwork,
    walletSupportsReplacement
  } from '../../replacement.js'

  const { device, gas } = configuration

  export let notification: Notification
  export let updateParentOnRemove: () => void

  let timeoutId: NodeJS.Timeout
  let hovered = false

  // get transaction based on notification id
  const transaction = transactions$
    .getValue()
    .find(({ hash }) => hash === notification.id)

  // get wallet that sent transaction
  const wallet =
    transaction &&
    $wallets$.find(
      ({ accounts }) =>
        !!accounts.find(
          ({ address }) =>
            address.toLowerCase() === transaction.from.toLowerCase()
        )
    )

  onMount(() => {
    if (notification.autoDismiss) {
      timeoutId = setTimeout(() => {
        removeNotification(notification.id)
        removeTransaction(notification.id)
      }, notification.autoDismiss)
    }
  })

  onDestroy(() => {
    clearTimeout(timeoutId)
  })
</script>

<style>
  .bn-notify-notification {
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
    border-radius: var(
      --notify-onboard-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .bn-notify-notification-inner {
    padding: 0.75rem;
  }

  .bn-notify-notification:hover
    > div.bn-notify-notification-inner
    > div.notify-close-btn-desktop {
    visibility: visible;
    opacity: 1;
  }

  div.notify-close-btn {
    margin-left: auto;
    margin-bottom: auto;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 8px;
    right: 8px;
    justify-content: center;
    align-items: center;
  }

  div.notify-close-btn-desktop {
    visibility: hidden;
    transition: visibility 0.15s linear, opacity 0.15s linear;
    opacity: 0;
  }

  .notify-close-btn .close-icon {
    width: 20px;
    margin: auto;
  }

  .notify-close-btn > .close-icon {
    color: var(
      --notify-onboard-gray-300,
      var(--onboard-gray-300, var(--gray-300))
    );
  }

  .notify-close-btn:hover > .close-icon {
    color: var(
      --notify-onboard-gray-100,
      var(--onboard-gray-100, var(--gray-100))
    );
  }

  .transaction-status {
    color: var(
      --notify-onboard-primary-100,
      var(--onboard-primary-100, var(--primary-100))
    );
    line-height: 14px;
  }

  .dropdown {
    height: 0px;
    overflow: hidden;
    transition: height 150ms ease-in-out;
  }

  .dropdown-visible {
    height: 48px;
  }

  .dropdown-buttons {
    background-color: var(
      --notify-onboard-gray-700,
      var(--onboard-gray-700, var(--gray-700))
    );
    width: 100%;
    padding: 8px;
  }

  .dropdown-button {
    padding: 4px 12px;
    border-radius: var(
      --notify-onboard-border-radius-5,
      var(--onboard-border-radius-5, var(--border-radius-5))
    );
    background-color: transparent;
    font-size: var(
      --notify-onboard-font-size-6,
      var(--onboard-font-size-6, var(--font-size-6))
    );
    color: var(
      --notify-onboard-primary-400,
      var(--onboard-primary-400, var(--primary-400))
    );
    transition: all 150ms ease-in-out;
    cursor: pointer;
  }

  .dropdown-button:hover {
    background-color: rgba(146, 155, 237, 0.2);
  }
</style>

<div
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
  class:bn-notify-clickable={notification.onClick}
  on:click={e => notification.onClick && notification.onClick(e)}
  class="bn-notify-notification bn-notify-notification-{notification.type}}"
>
  <div class="flex bn-notify-notification-inner">
    <StatusIconBadge
      {notification}
      chainStyles={chainStyles[networkToChainId[notification.network]]}
    />
    <NotificationContent {notification} />

    <div
      on:click|stopPropagation={() => {
        removeNotification(notification.id)
        removeTransaction(notification.id)
        updateParentOnRemove()
      }}
      class="notify-close-btn notify-close-btn-{device.type} pointer flex"
    >
      <div class="flex items-center close-icon">
        {@html closeIcon}
      </div>
    </div>
  </div>

  <!-- HOVER ACTION DROPDOWN -->
  <div
    class="dropdown"
    class:dropdown-visible={hovered &&
      gas &&
      actionableEventCode(notification.eventCode) &&
      validGasNetwork(notification.network) &&
      walletSupportsReplacement(wallet)}
  >
    {#if notification.eventCode === 'txPool'}
      <div class="dropdown-buttons flex items-center justify-end">
        <button
          on:click={async () => {
            try {
              await replaceTransaction({ type: 'cancel', wallet, transaction })
            } catch (error) {
              // we want a unique id so that the hint notification does not replace the pending notification, so it can't just be the hash
              // but the id is displayed as a hash, so we need to insert the error in the middle
              const id = `${transaction.hash.slice(
                0,
                9
              )}:txReplaceError${transaction.hash.slice(-5)}`

              addCustomNotification({
                id,
                type: 'hint',
                eventCode: 'txError',
                message: $_('notify.transaction.txReplaceError'),
                key: id,
                autoDismiss: 4000
              })
            }
          }}
          class="dropdown-button">Cancel</button
        >
        <button
          on:click={async () => {
            try {
              await replaceTransaction({
                type: 'speedup',
                wallet,
                transaction
              })
            } catch (error) {
              // we want a unique id so that the hint notification does not replace the pending notification, so it can't just be the hash
              // but the id is displayed as a hash, so we need to insert the error in the middle
              const id = `${transaction.hash.slice(
                0,
                9
              )}:txReplaceError${transaction.hash.slice(-5)}`

              addCustomNotification({
                id,
                type: 'hint',
                eventCode: 'txError',
                message: $_('notify.transaction.txReplaceError'),
                key: id,
                autoDismiss: 4000
              })
            }
          }}
          class="dropdown-button">Speed-up</button
        >
      </div>
    {/if}
  </div>
</div>
