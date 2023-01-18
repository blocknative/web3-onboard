<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { blocknativeIcon, poweredByBlocknative } from '../../icons/index.js'
  import en from '../../i18n/en.json'
  import type { i18n } from '../../types.js'
  import { isSVG } from '../../utils.js'
  import { configuration } from '../../configuration.js'
  import { MOBILE_WINDOW_WIDTH } from '../../constants.js'

  export let step: keyof i18n['connect']

  const { appMetadata } = configuration
  const { icon, logo, name = 'This app' } = appMetadata || {}

  const defaultContent = en.connect[step].sidebar
  const { subheading, paragraph } = defaultContent

  let windowWidth: number
</script>

<style>
  .sidebar {
    --background-color: var(--onboard-connect-sidebar-background, white);
    --text-color: var(--onboard-connect-sidebar-color, var(--gray-700));
    --border-color: var(--onboard-connect-sidebar-border-color, var(--gray-200));

    display: flex;
    flex-flow: column;
    gap: 1rem;
    padding: 1rem;
    align-items: center;

    color: var(--text-color);
  }

  .inner-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    align-self: stretch;
    gap: 0.5rem;
    padding: 1.5rem;
    text-align: center;

    border: 1px solid;
    border-radius: 12px;

    border-color: var(--border-color);
    background-color: var(--background-color);
  }

  .icon-container {
    display: flex;
  }

  .subheading {
    line-height: 1rem;
  }

  .description {
    line-height: 1.25rem;
    font-size: var(--onboard-font-size-6, var(--font-size-6));
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .indicators {
    margin-top: 1rem;
  }

  .indicator {
    box-sizing: content-box;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: var(
      --onboard-connect-sidebar-progress-background,
      var(--onboard-gray-700, var(--gray-700))
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
        var(--onboard-gray-700, var(--gray-700))
      );
  }

  .join {
    box-sizing: content-box;
    z-index: 1;
    right: 4px;
    height: 2px;
    background: var(
      --onboard-connect-sidebar-progress-background,
      var(--onboard-gray-700, var(--gray-700))
    );
    transition: background 250ms ease-in-out;
  }

  .join.active {
    background: var(
      --onboard-connect-sidebar-progress-color,
      var(--onboard-primary-600, var(--primary-600))
    );
  }

  @media all and (min-width: 768px) {
    .sidebar {
      max-width: 280px;
      border-right: 1px solid;

      border-color: var(--border-color);
      background-color: var(--background-color);
    }
    .inner-container {
      border: none;
      text-align: initial;
      flex: 1;
      align-items: flex-start;
      gap: 1rem;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<div class="sidebar">
  <div class="inner-container">
    <!-- On Mobile we display the icon only & within the header rather than the sidebar -->
    {#if windowWidth >= MOBILE_WINDOW_WIDTH}
      <div class="icon-container">
        {#if logo || icon}
          {#if isSVG(logo || icon)}
            {@html logo || icon}
          {:else}
            <img src={logo || icon} alt="logo" />
          {/if}
        {:else}
          {@html blocknativeIcon}
        {/if}
      </div>
    {/if}

    <div class="subheading">
      {$_(`connect.${step}.sidebar.subheading`, {
        default: subheading
      })}
    </div>

    <div class="description">
      {$_(`connect.${step}.sidebar.paragraph`, {
        values: { app: name },
        default: paragraph
      })}
    </div>

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
  <div>
    {@html poweredByBlocknative}
  </div>
</div>
