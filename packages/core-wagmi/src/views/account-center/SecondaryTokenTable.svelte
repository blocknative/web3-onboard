<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { fade } from 'svelte/transition'
  import { isSVG } from '../../utils.js'
  import type { SecondaryTokenBalances } from '../../types'

  export let secondaryTokens: SecondaryTokenBalances[]
</script>

<style>
  .secondary-token-container {
    width: 100%;
  }
  table {
    width: 100%;
  }
  tr {
    padding: 0.25rem 1rem;
    line-height: 1rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }
  thead .secondary-token-table-header {
    text-align: inherit;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
  }
  .token-icon {
    width: 30%;
    font-weight: 700;
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    color: var(--text-color);
  }
  .icon-name-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 0.5rem;
  }
  .icon {
    width: 1rem;
    height: 1rem;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .token-balance {
    width: 70%;
    font-weight: 200;
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    color: var(--text-color);
  }
</style>

<div class="secondary-token-container">
  <table class="balance-change-table table-radius">
    <thead>
      <tr>
        <th colspan="3" class="secondary-token-table-header">Token Balances:</th
        >
      </tr>
    </thead>
    <tbody>
      {#each secondaryTokens as token}
        {#if token && token.name && token.balance}
          <tr class="token-row">
            <td class="token-icon">
              <div class="icon-name-container">
                {#if token.icon}
                  {#await token.icon then iconLoaded}
                    <div in:fade|local class="icon">
                      {#if isSVG(iconLoaded)}
                        <!-- render svg string -->
                        {@html iconLoaded}
                      {:else}
                        <!-- load img url -->
                        <img src={iconLoaded} alt="logo" />
                      {/if}
                    </div>
                  {/await}
                {:else}
                  <div class="icon" />
                {/if}
                {token.name.toUpperCase()}
              </div>
            </td>
            <td class="token-balance">
              {token.balance.length > 7
                ? token.balance.slice(0, 7)
                : token.balance}
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
