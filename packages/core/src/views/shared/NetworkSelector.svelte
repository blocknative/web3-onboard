<script lang="ts">
  import type { Chain } from '@web3-onboard/common'
  import type { WalletState } from '../../types'
  import { chainIdToLabel, connectedToValidAppChain } from '../../utils'
  import setChain from '../../chain'
  import { wallets$ } from '../../streams'
  import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

  export let color = '#33394B'
  export let chains: Chain[]
  export let bold = false

  let switching: boolean
  let selectElement: HTMLSelectElement

  $: [wallet] = $wallets$

  const chainId$ = wallets$.pipe(
    debounceTime(50),
    distinctUntilChanged(
      (prev, next) => prev[0].chains[0].id === next[0].chains[0].id
    )
  )

  $: if ($chainId$) {
    resizeSelect()
  }

  async function handleSelect() {
    const selectedChain = selectElement.selectedOptions[0].value

    if (selectedChain !== wallet.chains[0].id) {
      switching = true

      await setChain({
        chainId: selectedChain,
        chainNamespace: 'evm',
        wallet: wallet.label
      })

      switching = false
    }
  }

  function resizeSelect() {
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
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    appearance: none;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    max-width: 72px;
  }

  select:focus {
    outline: none;
  }

  span {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }
</style>

{#if switching}
  <span style={`color: ${color};`}>switching...</span>
{:else}
  <select
    class="flex justify-center items-center pointer"
    bind:this={selectElement}
    value={wallet.chains[0].id}
    on:change={handleSelect}
    style={`color: ${color}; ${bold ? 'font-weight: 700;' : ''}`}
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
