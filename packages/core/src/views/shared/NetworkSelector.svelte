<script lang="ts">
  import { BehaviorSubject, merge } from 'rxjs'
  import type { Chain } from '@web3-onboard/common'
  import { chainIdToLabel, connectedToValidAppChain } from '../../utils.js'
  import setChain from '../../chain.js'
  import { wallets$ } from '../../streams.js'
  import { distinctUntilChanged, debounceTime, skip } from 'rxjs/operators'
  import caretIcon from '../../icons/caret.js'

  export let selectIcon: string = caretIcon
  export let colorVar: string
  export let chains: Chain[]
  export let bold = false
  export let parentCSSId = ''

  const switching$ = new BehaviorSubject<boolean>(false)
  let selectElement: HTMLSelectElement

  $: [wallet] = $wallets$

  const resize$ = merge(wallets$, switching$.pipe(skip(1))).pipe(
    debounceTime(50),
    distinctUntilChanged((prev, next) =>
      typeof prev === 'boolean' || typeof next === 'boolean'
        ? false
        : prev[0] && next[0] && prev[0].chains[0].id === next[0].chains[0].id
    )
  )

  $: if ($resize$) {
    resizeSelect()
  }

  async function handleSelect() {
    const selectedChain = selectElement.selectedOptions[0].value

    if (selectedChain !== wallet.chains[0].id) {
      switching$.next(true)

      await setChain({
        chainId: selectedChain,
        chainNamespace: 'evm',
        wallet: wallet.label
      })

      switching$.next(false)
    }
  }

  function resizeSelect() {
    if (!selectElement) return
    let tempOption = document.createElement('option')
    tempOption.textContent = selectElement.selectedOptions[0].textContent

    let tempSelect = document.createElement('select')
    tempSelect.style.visibility = 'hidden'
    tempSelect.style.position = 'fixed'
    tempSelect.appendChild(tempOption)
    selectElement.after(tempSelect)
    selectElement.style.width = `${tempSelect.clientWidth - 22}px`
    tempSelect.remove()
  }
</script>

<style>
  select {
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-appearance: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    appearance: none;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    transition: width 250ms ease-in-out;
    background-repeat: no-repeat, repeat;
    background-position: right 0px top 0px, 0 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0 14px 0 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  select.minimized_ac {
    min-width: 80px;
    max-width: 80px;
  }

  select.maximized_ac {
    width: auto !important;
  }

  select:focus {
    outline: none;
  }

  span.switching-placeholder {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    min-width: 80px;
    max-width: 80px;
    padding: 0 8px 0 4px;
  }
</style>

{#if wallet}
  {#if $switching$}
    <span
      class={`switching-placeholder ${parentCSSId}`}
      style={`
        color: var(${colorVar},
        var(--account-center-network-selector-color, var(--gray-500)));
      `}>switching...</span
    >
  {:else}
    <select
      class={`flex justify-center items-center pointer ${parentCSSId}`}
      bind:this={selectElement}
      value={wallet.chains[0].id}
      on:change={handleSelect}
      style={`
        color: var(${colorVar},
        var(--account-center-network-selector-color, var(--gray-500)));
        background-image: url('data:image/svg+xml;utf8,${selectIcon}'); ${
        bold ? 'font-weight: 700;' : ''
      }`}
    >
      {#if !connectedToValidAppChain(wallet.chains[0], chains)}
        <option value={wallet.chains[0].id}
          >{chainIdToLabel[wallet.chains[0].id] || 'unrecognized'}</option
        >
      {/if}
      {#each chains as chain (chain.id)}
        <option value={chain.id}>{chain.label}</option>
      {/each}
    </select>
  {/if}
{/if}
