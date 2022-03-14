<script lang="ts">
  import { state } from '../../store'
  import type { ConnectedChain, WalletState } from '../../types'
  import { chainIdToLabel, getChainStyles } from '../../utils'
  import caretIcon from '../../icons/caret'
  import { switchChain } from '../../provider'
  import setChain from '../../chain'

  export let wallet: WalletState

  const chains = state.get().chains
  let { id: connectedId, namespace: connectedNamespace } = wallet.chains[0]
  let switching: boolean

  $: chainStyles = getChainStyles(connectedId)

  $: if (connectedId !== wallet.chains[0].id) {
    syncChains()
  }

  async function syncChains() {
    switching = true

    const switched = await setChain({
      chainId: connectedId,
      chainNamespace: connectedNamespace,
      wallet: wallet.label
    })

    if (!switched) {
      connectedId = wallet.chains[0].id
      connectedNamespace = wallet.chains[0].namespace
    }

    switching = false
  }

  function connectedToValidAppChain(
    walletConnectedChain: ConnectedChain
  ): boolean {
    return !!chains.find(
      ({ id, namespace }) =>
        id === walletConnectedChain.id &&
        namespace === walletConnectedChain.namespace
    )
  }
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 16px;
    padding: 1px;
    transition: border-color 250ms ease-in-out, backround 250ms ease-in-out;
    box-shadow: var(--onboard-shadow-1, var(--shadow-1));
    max-width: 105px;
  }

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 56px;
  }

  select:focus {
    outline: none;
  }

  span {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  .chain-icon {
    width: 22px;
    height: 22px;
    padding: 4px;
    border-radius: 25px;
    margin-right: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-network {
    display: flex;
    align-items: center;
  }

  .caret {
    width: 10px;
    margin: 0 4px;
    display: flex;
  }
</style>

<div
  class="container"
  style={chainStyles
    ? `border-color: ${chainStyles.borderColor}; background-color: ${chainStyles.backgroundColor}`
    : ''}
>
  <div class="icon-network">
    {#if chainStyles.icon}
      <div
        class="chain-icon"
        style={`background-color: ${chainStyles.badgeColor};`}
      >
        {@html chainStyles.icon}
      </div>
    {/if}

    {#if switching}
      <span style={chainStyles ? `color: ${chainStyles.fontColor}` : ''}
        >switching...</span
      >
    {:else}
      <select
        bind:value={connectedId}
        style={chainStyles ? `color: ${chainStyles.fontColor}` : ''}
      >
        {#if !connectedToValidAppChain( { id: connectedId, namespace: connectedNamespace } )}
          <option value={connectedId}
            >{chainIdToLabel[connectedId] || 'unrecognized'}</option
          >
        {/if}
        {#each chains as chain}
          <option value={chain.id}>{chain.label}</option>
        {/each}
      </select>
    {/if}
  </div>

  <div
    style={chainStyles ? `color: ${chainStyles.caretColor}` : ''}
    class="caret"
  >
    {@html caretIcon}
  </div>
</div>
