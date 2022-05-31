<script lang="ts">
  import type { NotificationObject } from '../../types'
  import { shortenAddress, shortenEns } from '../../utils'
  import { _ } from 'svelte-i18n'
  import en from '../../i18n/en.json'
  import Timer from './Timer.svelte'

  export let notification: NotificationObject
  export let hash: string

</script>

<style>
  div.notify-transaction-data {
    font-size: var(
      --notify-onboard-font-size-6,
      var(--onboard-font-size-6, var(--font-size-6))
    );
    font-family: inherit;
    margin: 0px 8px;
    justify-content: space-between;
  }

  .hash-time {
    display: inline-flex;
    margin-top: 2px;
    font-size: var(
      --notify-onboard-font-size-7,
      var(--onboard-font-size-7, var(--font-size-7))
    );
    line-height: var(
      --notify-onboard-line-height-4,
      var(--onboard-line-height-4, var(--line-height-4))
    );
  }

  .address-hash {
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
  }
</style>

<div class="flex flex-column notify-transaction-data">
  <span class="transaction-status">
    {$_(`notify.transaction[${notification.eventCode}]`, {
      default: en.notify.transaction[notification.eventCode]
    })}
  </span>

  <!-- {eventCode} -->
  <!-- ADDRESS / ENS / transaction hash -->
  <span class="hash-time">
    <a
      class="address-hash"
      href="https://etherscan.io/address/{hash}"
    >
      {shortenAddress(hash)}
      <!-- {ens ? shortenEns(ens.name) : shortenAddress(address)} -->
    </a>
    <Timer {notification} />
  </span>
</div>

