<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { fly, fade } from 'svelte/transition'
  import { quartOut } from 'svelte/easing'
  import en from '../i18n/en.json'
  import type { NetBalanceChange } from '../types'
  import NotificationContent from './components/NotificationContent.svelte'
  import StatusIconBadge from './components/StatusIconBadge.svelte'

  export let toggleExpanded: (maximize: boolean) => void
  export let balanceChanges: NetBalanceChange[][]
  console.log(balanceChanges)
</script>

<style>
  .maximized {
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    pointer-events: all;
    backdrop-filter: blur(5px);
    width: 100%;
    min-height: 56px;
    background: var(
      --transaction-sim-background,
      var(--onboard-gray-600, var(--gray-600))
    );
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    margin: 8px 0;
  }

  .radius {
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
  }
  .table-radius {
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
  }

  .bn-notify-notification-inner {
    padding: 0.75rem;
  }
  .details {
    background: var(
      --transaction-sim-details-background,
      var(--onboard-gray-700, var(--gray-700))
    );
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
  }
  .address-info {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
    line-height: 16px;
    display: inline-flex;
    color: var(
      --transaction-sim-address-info-color,
      var(--onboard-gray-200, var(--gray-200))
    );
  }
  .details-cta {
    padding: 0.75rem 1rem;
    color: var(
      --transaction-sim-details-cta-color,
      var(--onboard-primary-400, var(--primary-400))
    );
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    justify-content: flex-end;
    background: var(
      --transaction-sim-details-background,
      var(--onboard-gray-700, var(--gray-700))
    );
  }
  table.balance-change-table {
    width: 100%;
    background: var(
      --transaction-sim-table-background,
      var(--onboard-gray-600, var(--gray-600))
    );
    border-width: 1px;
    border-color: var(
      --transaction-sim-table-border,
      var(--onboard-gray-500, var(--gray-500))
    );
    border-style: solid;
    color: var(
      --transaction-sim-details-cta-color,
      var(--onboard-gray-100, var(--gray-100))
    );
    overflow: hidden;
    border-collapse: collapse;
  }

  table.balance-change-table td,
  table.balance-change-table th {
    padding: 0.25rem 1rem;
    text-align: start;
  }
  table.balance-change-table td {
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }

  tbody > tr:not(:first-child) {
    box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.2);
  }

  table.balance-change-table thead {
    background: var(
      --transaction-sim-thead-background,
      var(--onboard-gray-500, var(--gray-500))
    );
    color: var(
      --transaction-sim-thead-color,
      var(--onboard-gray-100, var(--gray-100))
    );
  }

  .negative {
    color: var(
      --transaction-sim-thead-color,
      var(--onboard-danger-400, var(--danger-400))
    );
  }
  .positive {
    color: var(
      --transaction-sim-thead-color,
      var(--onboard-success-500, var(--success-500))
    );
  }

  /* .outer-container {
    background: var(
      --transaction-sim-maximized-upper-background,
      var(--onboard-gray-600, var(--gray-600))
    );
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
    width: 100%;
    filter: drop-shadow(0px 4px 16px rgba(178, 178, 178, 0.2));
    padding: 0 1px 1px 1px;
    pointer-events: auto;
  } */
</style>

<!-- <div
  in:fly={{
    // delay: position.includes('top') ? 100 : 0,
    duration: 600,
    // y: position.includes('top') ? 56 : -76,
    easing: quartOut,
    opacity: 0
  }}
  class="outer-container"
> -->
<div
  in:fade={{ duration: 250 }}
  out:fade={{ duration: 100 }}
  class="maximized pointer radius padding-5"
>
  <div class="flex bn-notify-notification-inner">
    <StatusIconBadge />
    <NotificationContent />
  </div>
  <section class="details">
    <section class="address-info">
      Simulated balance changes for {`0x1230...0987`}
    </section>
    <table class="balance-change-table table-radius">
      <colgroup>
        <col span="1" style="width: 25%;" />
        <col span="1" style="width: 70%;" />
      </colgroup>
      <thead>
        <tr>
          <th>Token</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {#each balanceChanges as balanceChangesList}
          {#if balanceChangesList.length}
            {#each balanceChangesList as assetChanges}
              {#each assetChanges.balanceChanges as asset}
                <tr>
                  <td>{asset.asset.symbol}</td>
                  <td
                    class={asset.delta.includes('-') ? 'negative' : 'positive'}
                    >{!asset.delta.includes('-') ? '+' : ''}{asset.delta}</td
                  >
                </tr>
                <!-- <tr>
          <td>DAI</td>
          <td>+10,000.2480</td>
        </tr> -->
              {/each}
            {/each}
          {/if}
        {/each}
      </tbody>
    </table>
  </section>
  <div
    class="details-cta"
    on:click|stopPropagation={() => toggleExpanded(false)}
  >
    Hide details
  </div>
</div>
<!-- </div> -->
