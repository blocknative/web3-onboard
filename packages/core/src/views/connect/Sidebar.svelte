<script lang="ts">
  import { _ } from 'svelte-i18n'
  import blocknative from '../../icons/blocknative'
  import { internalState$ } from '../../streams'
  import en from '../../i18n/en.json'
  import type { i18n } from '../../types'

  export let status: keyof i18n['connect']

  const { appMetadata } = internalState$.getValue()
  const { icon, name = 'This dapp' } = appMetadata || {}

  const defaultContent = en.connect[status].sidebar
  const { subheading, paragraph } = defaultContent
  const { heading } =
    defaultContent as i18n['connect']['selectingWallet']['sidebar']
</script>

<style>
  .sidebar {
    padding: 1.5rem;
    border-radius: 24px 0 0 24px;
    background: var(--onboard-gray-100, var(--gray-100));
  }

  .inner-container {
    padding-left: 0.5rem;
    max-width: 236px;
  }

  .icon-container {
    height: 3rem;
    display: inline-block;
    margin-bottom: var(--onboard-margin-3, var(--margin-3));
  }

  .heading {
    font-size: var(--onboard-font-size-3, var(--font-size-3));
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    margin: 0 0 var(--onboard-margin-5, var(--margin-5)) 0;
  }

  .subheading {
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    margin: 0 0 var(--onboard-margin-5, var(--margin-5)) 0;
  }

  .description {
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    margin: 0;
  }

  .indicators {
    display: flex;
    align-items: center;
    margin-top: var(--onboard-margin-2, var(--margin-2));
  }

  .indicator {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: var(--onboard-gray-200, var(--gray-200));
    transition: background 250ms ease-in-out;
  }

  .indicator.on {
    background: var(--onboard-blue-600, var(--blue-600));
    border: 2px solid var(--onboard-gray-200, var(--gray-200));
  }

  .join {
    position: relative;
    z-index: 1;
    right: 4px;
    height: 3px;
    background: var(--onboard-gray-200, var(--gray-200));
    transition: background 250ms ease-in-out;
  }

  .join.active {
    background: var(--onboard-blue-600, var(--blue-600));
  }
</style>

<div class="sidebar">
  <div class="inner-container">
    <div class="icon-container">
      {#if icon}
        {@html icon}
      {:else}
        {@html blocknative}
      {/if}
    </div>
    {#if $_(`connect.${status}.sidebar.heading`, { default: '' })}
      <h2 class="heading">
        {$_(`connect.${status}.sidebar.heading`, {
          default: heading
        })}
      </h2>
    {/if}

    <h4 class="subheading">
      {$_(`connect.${status}.sidebar.subheading`, {
        default: subheading
      })}
    </h4>

    <p class="description">
      {$_(`connect.${status}.sidebar.paragraph`, {
        values: { dapp: name },
        default: paragraph
      })}
    </p>

    <div class="indicators">
      <div class="indicator" class:on={true} />
      <div
        class:active={status !== 'selectingWallet'}
        class="join"
        style={`${
          status !== 'selectingWallet'
            ? 'right: 4px; width: 52px;'
            : 'right: 2px; width: 54px;'
        }`}
      />
      <div
        class="indicator"
        style={`right: 8px;`}
        class:on={status !== 'selectingWallet'}
      />
      <div
        class:active={status === 'connectedWallet'}
        class="join"
        style={`${
          status === 'connectedWallet'
            ? 'right: 12px; width: 52px;'
            : 'right: 10px; width: 54px;'
        }`}
      />
      <div
        style={`right: 16px;`}
        class="indicator"
        class:on={status === 'connectedWallet'}
      />
    </div>
  </div>
</div>
