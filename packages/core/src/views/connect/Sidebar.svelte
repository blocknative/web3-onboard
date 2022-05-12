<script lang="ts">
  import { _ } from 'svelte-i18n'
  import blocknative from '../../icons/blocknative'
  import { internalState$ } from '../../streams'
  import en from '../../i18n/en.json'
  import type { i18n } from '../../types'
  import { isSVG } from '../../utils'

  export let step: keyof i18n['connect']

  const { appMetadata } = internalState$.getValue()
  const { icon, logo, name = 'This app' } = appMetadata || {}

  const defaultContent = en.connect[step].sidebar
  const { subheading, paragraph } = defaultContent
  const { heading } =
    defaultContent as i18n['connect']['selectingWallet']['sidebar']
</script>

<style>
  .sidebar {
    padding: var(--onboard-spacing-3, var(--spacing-3));
    background: var(
      --onboard-connect-sidebar-background,
      var(--onboard-gray-100, var(--gray-100))
    );
    color: var(
      --onboard-connect-sidebar-color,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  .inner-container {
    padding-left: var(--onboard-spacing-5, var(--spacing-5));
    max-width: 236px;
  }

  .icon-container {
    height: 3rem;
    margin-bottom: var(--onboard-spacing-4, var(--spacing-4));
  }

  .heading {
    font-size: var(--onboard-font-size-3, var(--font-size-3));
    margin: 0 0 var(--onboard-spacing-5, var(--spacing-5)) 0;
  }

  .subheading {
    margin: 0 0 var(--onboard-spacing-5, var(--spacing-5)) 0;
  }

  .description {
    line-height: 20px;
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    margin: 0;
  }

  .indicators {
    margin-top: var(--onboard-spacing-2, var(--spacing-2));
  }

  .indicator {
    box-sizing: content-box;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: var(
      --onboard-connect-sidebar-progress-background,
      var(--onboard-gray-200, var(--gray-200))
    );
    transition: background 250ms ease-in-out;
  }

  .indicator.on {
    background: var(
      --onboard-connect-sidebar-progress-color,
      var(--onboard-primary-600, var(--primary-600))
    );
    border: 2px solid
      var(
        --onboard-connect-sidebar-progress-background,
        var(--onboard-gray-200, var(--gray-200))
      );
  }

  .join {
    box-sizing: content-box;
    z-index: 1;
    right: 4px;
    height: 2px;
    background: var(
      --onboard-connect-sidebar-progress-background,
      var(--onboard-gray-200, var(--gray-200))
    );
    transition: background 250ms ease-in-out;
  }

  .join.active {
    background: var(
      --onboard-connect-sidebar-progress-color,
      var(--onboard-primary-600, var(--primary-600))
    );
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>

<div class="sidebar">
  <div class="inner-container">
    <div class="icon-container flex">
      {#if logo || icon}
        {#if isSVG(logo || icon)}
          {@html logo || icon}
        {:else}
          <img src={logo || icon} alt="logo" />
        {/if}
      {:else}
        {@html blocknative}
      {/if}
    </div>
    {#if $_(`connect.${step}.sidebar.heading`, { default: '' })}
      <h2 class="heading">
        {$_(`connect.${step}.sidebar.heading`, {
          default: heading
        })}
      </h2>
    {/if}

    <h4 class="subheading">
      {$_(`connect.${step}.sidebar.subheading`, {
        default: subheading
      })}
    </h4>

    <p class="description">
      {$_(`connect.${step}.sidebar.paragraph`, {
        values: { app: name },
        default: paragraph
      })}
    </p>

    <div class="indicators flex items-center">
      <div class="indicator relative" class:on={true} />
      <div
        class:active={step !== 'selectingWallet'}
        class="join relative"
        style={`${
          step !== 'selectingWallet'
            ? 'right: 4px; width: 52px;'
            : 'right: 2px; width: 54px;'
        }`}
      />
      <div
        class="indicator relative"
        style={`right: 8px;`}
        class:on={step !== 'selectingWallet'}
      />
      <div
        class:active={step === 'connectedWallet'}
        class="join relative"
        style={`${
          step === 'connectedWallet'
            ? 'right: 12px; width: 52px;'
            : 'right: 10px; width: 54px;'
        }`}
      />
      <div
        style={`right: 16px;`}
        class="indicator relative"
        class:on={step === 'connectedWallet'}
      />
    </div>
  </div>
</div>
