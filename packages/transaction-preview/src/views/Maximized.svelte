<script lang="ts">
  import { ethers } from 'ethers'
  import { _ } from 'svelte-i18n'
  import en from '../i18n/en.json'
  import { getDevice } from '../utils'
  import IconBadge from './components/IconBadge.svelte'
  import Button from './components/Button.svelte'
  import closeIcon from '../icons/close-circle.js'
  import SimulationHeader from './components/SimulationHeader.svelte'
  import type { MultiSimOutput, NetBalanceChange } from 'bnc-sdk'

  export let requireTransactionApproval: boolean
  export let transactionApproved: (approved: boolean) => void
  export let toggleExpanded: (maximize: boolean) => void
  export let destroyApp: () => void
  export let simResponse: MultiSimOutput
  export let startTime: number
  const device = getDevice()

  const transactionOriginator = simResponse.transactions[0].from
  const balanceChanges = simResponse.netBalanceChanges.reduce(
    (arr: NetBalanceChange[], changes: NetBalanceChange[]) => {
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
    },
    []
  )

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
    pointer-events: all;
    backdrop-filter: blur(5px);
    width: 100%;
    min-height: 3.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .radius {
    border-radius: var(--onboard-border-radius-4, var(--border-radius-4));
  }

  div.tp-close-btn {
    visibility: visible;
    opacity: 1;
  }

  div.tp-close-btn {
    margin-left: auto;
    margin-bottom: auto;
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
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
    width: 1.25rem;
    margin: auto;
  }

  .tp-close-btn > .close-icon {
    color: var(--onboard-gray-300, var(--gray-300));
  }

  .tp-close-btn:hover > .close-icon {
    color: var(--onboard-gray-100, var(--gray-100));
  }

  .table-radius {
    border-radius: var(--onboard-border-radius-5, var(--border-radius-5));
  }

  .bn-notify-notification-inner {
    padding: 0.75rem;
  }
  .details {
    background: var(--onboard-gray-700, var(--gray-700));
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.5rem;
  }
  .address-info {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    display: inline-flex;
    color: var(--onboard-gray-200, var(--gray-200));
  }
  .details-cta {
    color: var(--onboard-primary-400, var(--primary-400));
    font-weight: 700;
    font-size: 0.875rem;
    display: flex;
    justify-content: flex-end;
    background: var(--onboard-gray-700, var(--gray-700));
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    gap: 0.5rem;
    height: 3rem;
    border: 1px solid var(--onboard-gray-600, var(--gray-600));
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
  }

  table.balance-change-table {
    width: 100%;
    background: var(--onboard-gray-600, var(--gray-600));
    border: 1px solid var(--onboard-gray-500, var(--gray-500));
    color: var(--onboard-gray-100, var(--gray-100));
    overflow: hidden;
    border-spacing: 0;
  }

  table.balance-change-table td,
  table.balance-change-table th {
    padding: 0.25rem 1rem;
    text-align: start;
    line-height: 1rem;
  }
  table.balance-change-table th {
    font-size: 0.75rem;
  }
  table.balance-change-table td {
    font-size: 0.875rem;
  }

  table.balance-change-table td.token-text {
    font-weight: 700;
  }

  tbody > tr:not(:first-child) {
    box-shadow: inset 0px 1px 0px var(--onboard-gray-500, var(--gray-500));
  }

  table.balance-change-table thead {
    background: var(--onboard-gray-500, var(--gray-500));
    color: var(--onboard-gray-100, var(--gray-100));
  }

  .negative {
    color: var(--onboard-danger-400, var(--danger-400));
  }
  .positive {
    color: var(--onboard-success-500, var(--success-500));
  }
</style>

<div class="maximized radius padding-5">
  {#if !requireTransactionApproval}
    <div
      on:click|stopPropagation={() => {
        destroyApp()
      }}
      class="tp-close-btn tp-close-btn-{device.type} pointer flex"
    >
      <div class="flex items-center close-icon">
        {@html closeIcon}
      </div>
    </div>
  {/if}
  <div class="flex bn-notify-notification-inner">
    <IconBadge />
    <SimulationHeader {startTime} />
  </div>
  <div class="details">
    <div class="address-info">
      {$_('maximized.sectionHeading', {
        default: en.maximized.sectionHeading
      })}
      {shortenAddress(transactionOriginator)}
    </div>
    <table class="balance-change-table table-radius">
      <colgroup>
        <col span="1" style="width: 20%;" />
        <col span="1" style="width: 80%;" />
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
                <td class="token-text">{asset.asset.symbol}</td>
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
  </div>
  <div class="details-cta">
    {#if requireTransactionApproval}
      <Button
        btnText={$_('maximized.cancel', {
          default: en.maximized.cancel
        })}
        btnFunction={() => transactionApproved(false)}
      />
      <Button
        btnText={$_('maximized.confirm', {
          default: en.maximized.confirm
        })}
        btnFunction={() => transactionApproved(true)}
      />
    {:else}
      <Button
        btnText={$_('maximized.hide', {
          default: en.maximized.hide
        })}
        btnFunction={() => toggleExpanded(false)}
      />
    {/if}
  </div>
</div>
