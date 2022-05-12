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
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }
  .link {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: 16px;
    color: var(--onboard-primary-500, var(--primary-500));
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
        <a
          class="link pointer"
          href={url}
          target="_blank"
          rel="noreferrer noopener"
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
