<script lang="ts">
  import { _ } from 'svelte-i18n'
  import en from '../../i18n/en.json'
  import { internalState$ } from '../../streams'
  import Warning from '../shared/Warning.svelte'

  const { recommendedInjectedWallets, name } =
    internalState$.getValue().appMetadata || {}
</script>

<style>
  .outer-container {
    padding: 1rem;
  }
  .link {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--onboard-blue-500, var(--blue-500));
    cursor: pointer;
    text-decoration: none;
  }
</style>

<div class="outer-container">
  <Warning>
    {#if recommendedInjectedWallets}
      {$_('connect.selectingWallet.recommendedWalletsPart1', {
        default: en.connect.selectingWallet.recommendedWalletsPart1,
        values: {
          app: name || 'This app'
        }
      })}
      {#each recommendedInjectedWallets as { name, url }, i}
        <a class="link" href={url} target="_blank" rel="noreferrer noopener"
          >{name}{i < recommendedInjectedWallets.length - 1 ? ', ' : ''}
        </a>
      {/each}
      {$_('connect.selectingWallet.recommendedWalletsPart2', {
        default: en.connect.selectingWallet.recommendedWalletsPart2
      })}
    {:else}
      {$_('connect.selectingWallet.installWallet', {
        default: en.connect.selectingWallet.installWallet,
        values: {
          app: name || 'this app'
        }
      })}
    {/if}
  </Warning>
</div>
