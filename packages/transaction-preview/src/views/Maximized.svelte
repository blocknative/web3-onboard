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

  let totalGasInEth = 0
  let totalGasUsed = 0

  const device = getDevice()
  const addCommasToNumber = (x: number): string => {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  const cleanBalance = (dirtyBalance: string): string => {
    const formattedEth = ethers.utils.formatEther(dirtyBalance)
    return roundAndCleanDecimals(formattedEth)
  }

  const roundAndCleanGas = (formattedValue: string): number => {
    const roundedGwei = parseFloat(formattedValue).toFixed(7)
    return Number(roundedGwei)
  }

  const roundAndCleanDecimals = (formattedValue: string): string => {
    const roundedGwei = parseFloat(formattedValue).toFixed(6)
    const removeEmptyDecimalPlaces = Number(roundedGwei)
    return addCommasToNumber(removeEmptyDecimalPlaces)
  }

  const shortenAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const cleanGas = (gasComputed: number): number => {
    const gweiToEther = ethers.utils.formatEther(gasComputed)
    return roundAndCleanGas(gweiToEther)
  }

  const getCumulativeGasInEth = (index: number) => {
    if (simResponse.transactions[index].type === 0) {
      totalGasInEth += cleanGas(
        simResponse.gasUsed[index] * simResponse.transactions[index].gasPrice
      )
    }
    // if (simResponse.transactions[index].type === 2) {
    //   totalGasInEth += cleanGas(
    //     simResponse.gasUsed[index] *
    //       (simResponse.transactions[index].baseFeePerGasGwei +
    //         simResponse.transactions[index].maxPriorityFeePerGasGwei)
    //   )
    // }
  }

  const gasUsed = (index: number) => {
    totalGasUsed += simResponse.gasUsed[index]
  }

  const transactionOriginator = simResponse.transactions[0].from
  const balanceChanges = simResponse.netBalanceChanges.reduce(
    (arr: NetBalanceChange[], changes: NetBalanceChange[], index: number) => {
      if (changes.length) {
        changes.forEach(change => {
          if (
            change.address.toLowerCase() === transactionOriginator.toLowerCase()
          ) {
            arr.push(change)
          }
        })
      }
      getCumulativeGasInEth(index)
      gasUsed(index)
      return arr
    },
    []
  )
</script>

<style>
  .maximized {
    pointer-events: all;
    width: 100%;
    min-height: 3.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .radius {
    border-radius: inherit;
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

  .tp-close-btn .close-icon {
    color: currentColor;
  }

  .tp-close-btn:hover .close-icon {
    color: currentColor;
  }

  .table-radius {
    border-radius: var(--border-radius-5);
  }

  .bn-notify-notification-inner {
    padding: 0.75rem;
    background: var(--foreground-color);
  }
  .details {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.5rem;
    border-top: 1px solid var(--border-color);
  }
  .address-info {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    display: inline-flex;
  }
  .details-cta {
    color: inherit;
    font-weight: 700;
    font-size: 0.875rem;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    gap: 0.5rem;
    height: 3rem;
    border-top: 1px solid var(--border-color);
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
  }

  table.balance-change-table {
    width: 100%;
    overflow: hidden;
    border-spacing: 0;
    border: 1px solid transparent;
    border-color: var(--border-color);
    color: var(--text-color);
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
    box-shadow: inset 0px 1px 0px var(--border-color);
  }

  table.balance-change-table thead {
    background: var(--border-color);
  }

  .negative {
    color: var(--onboard-danger-400, var(--danger-400));
  }
  .positive {
    color: var(--onboard-success-500, var(--success-500));
  }

  .gas-used-value {
    color: var(--text-color);
    display: inline-block;
    margin: 0 4px 0 0;
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
      {$_('maximized.balanceChangeHeading', {
        default: en.maximized.balanceChangeHeading
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
          {#if totalGasInEth && totalGasUsed}
          <tr>
            <td class="token-text">ETH</td>
            <td class="negative"
              >-{totalGasInEth}
              <div class="gas-used-value">
                ({totalGasUsed}
                {$_('maximized.gasUsed', {
                  default: en.maximized.gasUsed
                })})
              </div></td
            >
          </tr>
          {/if}
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
