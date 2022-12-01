<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { blocknative, poweredByBlocknativeIcon } from '../../icons'
  import en from '../../i18n/en.json'
  import type { i18n } from '../../types.js'
  import { isSVG } from '../../utils.js'
  import { configuration } from '../../configuration.js'

  export let step: keyof i18n['connect']

  const { appMetadata } = configuration
  const { icon, logo, name = 'This app' } = appMetadata || {}

  const defaultContent = en.connect[step].sidebar
  const { subheading, paragraph } = defaultContent
  const { heading } =
    defaultContent as i18n['connect']['selectingWallet']['sidebar']

  let windowWidth: number
</script>

<style>
  .sidebar {
    padding: var(--onboard-spacing-2, var(--spacing-2));
    background: var(
      --onboard-connect-sidebar-background,
      var(--onboard-primary-100, var(--primary-100))
    );
    color: var(
      --onboard-connect-sidebar-color,
      var(--onboard-gray-700, var(--gray-700))
    );
    border-right: 1px solid var(--onboard-primary-200, var(--primary-200));
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

  img {
    max-width: 100%;
    height: auto;
  }

  .poweredby {
    margin-top: 50%;
    text-align: center;
  }

  @media all and (max-width: 520px) {
    .sidebar {
      margin: 1rem 1rem 4rem 1rem;
      border-radius: 0.75rem;
      text-align: center;
      background: var(
        --onboard-primary-100,
        var(--onboard-primary-100, var(--primary-100))
      );
      border: 1px solid var(--onboard-primary-200, var(--primary-200));
    }

    .inner-container {
      max-width: 100%;
      padding: 0;
    }

    .indicators {
      justify-content: center;
      margin-top: var(--onboard-spacing-4, var(--spacing-4));
    }

    .poweredby {
      position: absolute;
      bottom: 2rem;
      display: block;
      right: 50%;
      transform: translate(50%, 0);
    }

    .subheading {
      line-height: 1rem;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<div class="sidebar">
  <div class="inner-container">
    <!-- On Mobile we display the icon only & within the header rather than the sidebar -->
    {#if windowWidth >= 809}
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
  <div class="poweredby">
    {@html poweredByBlocknativeIcon}
  </div>
</div>
