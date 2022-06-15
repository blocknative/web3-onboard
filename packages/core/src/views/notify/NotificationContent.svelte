<script lang="ts">
  import type { Notification } from '../../types'
  import { shortenAddress } from '../../utils'
  import { _ } from 'svelte-i18n'
  import Timer from './Timer.svelte'

  export let notification: Notification
</script>

<style>
  div.notify-transaction-data {
    font-size: var(
      --notify-onboard-font-size-6,
      var(--onboard-font-size-6, var(--font-size-6))
    );
    font-family: inherit;
    margin: 0px 20px 0px 8px;
    justify-content: center;
  }

  .hash-time {
    display: inline-flex;
    margin-top: 4px;
    font-size: var(
      --notify-onboard-font-size-7,
      var(--onboard-font-size-7, var(--font-size-7))
    );
    line-height: var(
      --notify-onboard-font-line-height-4,
      var(--onboard-font-line-height-4, var(--font-line-height-4))
    );
  }

  .address-hash {
    color: var(
      --notify-onboard-primary-200,
      var(--onboard-primary-200, var(--primary-200))
    );
  }

  a.address-hash {
    color: var(
      --notify-onboard-primary-400,
      var(--onboard-primary-400, var(--primary-400))
    );
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
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

<div class="flex flex-column notify-transaction-data">
  <span class="transaction-status">
    {notification.message}
  </span>

  {#if notification.id && !notification.id.includes('custom')}
    <span class="hash-time">
      {#if notification.link}
        <a
          class="address-hash"
          href={notification.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {shortenAddress(notification.id)}
        </a>
      {:else}
        <div class="address-hash">
          {shortenAddress(notification.id)}
        </div>
      {/if}
      <Timer startTime={notification.startTime} />
    </span>
  {/if}
</div>
