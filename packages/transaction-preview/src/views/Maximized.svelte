<script lang="ts">
  import { _ } from 'svelte-i18n'
  import en from '../i18n/en.json'
  import type { SimPlatformResponse } from '../types'
  import SimulationHeader from './components/SimulationHeader.svelte'
  import IconBadge from './components/IconBadge.svelte'
  import { ethers } from 'ethers'
  import closeIcon from '../icons/close-circle.js'
  import { getDevice } from '../utils'

  
  export let toggleExpanded: (maximize: boolean) => void
  export let simResponse: SimPlatformResponse
  export let startTime: number
  const device = getDevice()
  let nodeRef: HTMLElement

  let transactionOriginator = simResponse.transactions[0].from
  let balanceChanges = simResponse.netBalanceChanges.reduce((arr, changes) => {
    if (changes.length) {
      changes.forEach(change => {
        if (
          change.address.toLowerCase() === transactionOriginator.toLowerCase()
        ) {
          arr.push(change)
        }
      })
    }
    return arr
  }, [])

  function addCommasToNumber(x: number): string {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  const cleanBalance = (dirtyBalance: string): string => {
    const gweiToEther = ethers.utils.formatEther(dirtyBalance)
    const roundTo4Decimal = parseFloat(gweiToEther).toFixed(4)
    const removeEmptyDecimalPlaces = Number(roundTo4Decimal)
    return addCommasToNumber(removeEmptyDecimalPlaces)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
</script>

<style>
  .maximized {
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
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
  }

  .radius {
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
  }

  div.tp-close-btn {
    visibility: visible;
    opacity: 1;
  }

  div.tp-close-btn {
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

  div.maximized:hover > div.tp-close-btn-desktop {
    visibility: visible;
    opacity: 1;
  }

  div.tp-close-btn-desktop {
    visibility: hidden;
    transition: visibility 0.15s linear, opacity 0.15s linear;
    opacity: 0;
  }

  .tp-close-btn .close-icon {
    width: 20px;
    margin: auto;
  }

  .tp-close-btn > .close-icon {
    color: var(
      --notify-onboard-close-icon-color,
      var(--onboard-gray-300, var(--gray-300))
    );
  }

  .tp-close-btn:hover > .close-icon {
    color: var(
      --notify-onboard-close-icon-hover,
      var(--onboard-gray-100, var(--gray-100))
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
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
  }
  table.balance-change-table th {
    font-size: 0.75rem;
  }
  table.balance-change-table td {
    font-size: 14px;
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
</style>

<div class="maximized pointer radius padding-5" bind:this={nodeRef}>
  <div
    on:click|stopPropagation={() => {
      nodeRef.parentNode.removeChild(nodeRef)
    }}
    class="tp-close-btn tp-close-btn-{device.type} pointer flex"
  >
    <div class="flex items-center close-icon">
      {@html closeIcon}
    </div>
  </div>
  <div class="flex bn-notify-notification-inner">
    <IconBadge />
    <SimulationHeader {startTime} />
  </div>
  <section class="details">
    <section class="address-info">
      {$_('maximized.sectionHeading', {
        default: en.maximized.sectionHeading
      })}
      {shortenAddress(transactionOriginator)}
    </section>
    <table class="balance-change-table table-radius">
      <colgroup>
        <col span="1" style="width: 28%;" />
        <col span="1" style="width: 72%;" />
      </colgroup>
      <thead>
        <tr>
          <th>
            {$_('maximized.tokenColumnHeader', {
              default: en.maximized.tokenColumnHeader
            })}</th
          >
          <th>
            {$_('maximized.balanceColumnHeader', {
              default: en.maximized.balanceColumnHeader
            })}</th
          >
        </tr>
      </thead>
      <tbody>
        {#if balanceChanges.length}
          {#each balanceChanges as assetChanges}
            {#each assetChanges.balanceChanges as asset}
              <tr>
                <td>{asset.asset.symbol}</td>
                <td class={asset.delta.includes('-') ? 'negative' : 'positive'}
                  >{!asset.delta.includes('-') ? '+' : ''}{cleanBalance(
                    asset.delta
                  )}</td
                >
              </tr>
            {/each}
          {/each}
        {/if}
      </tbody>
    </table>
  </section>
  <div
    class="details-cta"
    on:click|stopPropagation={() => toggleExpanded(false)}
  >
    {$_('maximized.hide', {
      default: en.maximized.hide
    })}
  </div>
</div>
