<script lang="ts">
  import { _ } from 'svelte-i18n'
  import {
    defaultBnIcon,
    poweredByBlocknative,
    infoIcon
  } from '../../icons/index.js'
  import en from '../../i18n/en.json'
  import type { i18n } from '../../types.js'
  import { isSVG } from '../../utils.js'
  import { MOBILE_WINDOW_WIDTH } from '../../constants.js'
  import { state } from '../../store'
  import { shareReplay, startWith } from 'rxjs'

  export let step: keyof i18n['connect']

  const { connect } = state.get()

  const defaultContent = en.connect[step].sidebar
  const { subheading, paragraph } = defaultContent

  const { heading } =
    defaultContent as i18n['connect']['selectingWallet']['sidebar']

  let windowWidth: number

  const appMetadata$ = state
    .select('appMetadata')
    .pipe(startWith(state.get().appMetadata), shareReplay(1))
</script>

<style>
  .sidebar {
    --background-color: var(
      --onboard-connect-sidebar-background,
      var(--w3o-foreground-color, none)
    );
    --text-color: var(--onboard-connect-sidebar-color, inherit);
    --border-color: var(--onboard-connect-sidebar-border-color, inherit);

    display: flex;
    flex-flow: column;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
  }

  .inner-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    align-self: stretch;
    gap: 0.5rem;
    padding: 1.5rem;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 12px;
    border-color: var(--border-color);
    background: var(--background-color);
    color: var(--text-color);
  }

  .icon-container {
    display: flex;
    height: 3.5rem;
    width: auto;
    min-width: 3.5rem;
    max-width: 100%;
  }

  .heading {
    font-size: var(--onboard-font-size-3, var(--font-size-3));
    margin: 0 0 var(--onboard-spacing-5, var(--spacing-5)) 0;
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
    margin-top: auto;
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
      var(--action-color)
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
      var(--action-color)
    );
  }
  .no-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25rem 0.5rem 0.25rem 0.75rem;
    gap: 0.25rem;
    font-size: var(--onboard-font-size-6, var(--font-size-6));
  }

  .info-icon {
    width: 1.25rem;
    display: flex;
    align-items: center;
  }

  @media all and (min-width: 768px) {
    .sidebar {
      max-width: 280px;
      border-right: 1px solid;

      border-color: var(--border-color);
      background: var(--background-color);
    }
    .inner-container {
      border: none;
      text-align: initial;
      flex: 1;
      align-items: flex-start;
      gap: 1rem;
    }
    .indicators {
      margin-bottom: 0.25rem;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<div class="sidebar">
  <div class="inner-container">
    <!-- On Mobile we display the icon only & within the header rather than the sidebar -->
    {#if windowWidth >= MOBILE_WINDOW_WIDTH}
      <div class="icon-container">
        {#if $appMetadata$ && ($appMetadata$.logo || $appMetadata$.icon)}
          {#if isSVG($appMetadata$.logo || $appMetadata$.icon)}
            {@html $appMetadata$.logo || $appMetadata$.icon}​
          {:else}
            <img src={$appMetadata$.logo || $appMetadata$.icon} alt="logo" />
          {/if}
        {:else}
          {@html defaultBnIcon}
        {/if}
      </div>
      {#if $_(`connect.${step}.sidebar.header`, { default: '' })}
        <div class="heading">
          {$_(`connect.${step}.sidebar.header`, {
            default: heading
          })}
        </div>
      {/if}
    {/if}

    <div class="subheading">
      {$_(`connect.${step}.sidebar.subheading`, {
        default: subheading
      })}
    </div>

    <div class="description">
      {$_(`connect.${step}.sidebar.paragraph`, {
        values: { app: ($appMetadata$ && $appMetadata$.name) || 'This App' },
        default: paragraph
      })}
    </div>
    {#if !connect.removeIDontHaveAWalletInfoLink}
      <a
        href={connect.iDontHaveAWalletLink ||
          'https://ethereum.org/en/wallets/find-wallet/#main-content'}
        target="_blank"
        rel="noreferrer noopener"
        class="no-link"
        >{$_('connect.selectingWallet.sidebar.IDontHaveAWallet', {
          default: en.connect.selectingWallet.sidebar.IDontHaveAWallet
        })}
        <div class="info-icon">{@html infoIcon}</div></a
      >
    {/if}
    {#if windowWidth < MOBILE_WINDOW_WIDTH}
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
    {/if}
  </div>
  {#if windowWidth >= MOBILE_WINDOW_WIDTH}
    <div class="indicators flex items-center">
      <div class="indicator relative" class:on={true} />
      <div
        class:active={step !== 'selectingWallet'}
        class="join relative"
        style={`right: 2px; ${
          step !== 'selectingWallet' ? 'width: 78px;' : 'width: 82px;'
        }`}
      />
      <div
        class="indicator relative"
        style={`right: 4px;`}
        class:on={step !== 'selectingWallet'}
      />
      <div
        class:active={step === 'connectedWallet'}
        class="join relative"
        style={`right: 6px; ${
          step === 'connectedWallet' ? 'width: 74px;' : 'width: 81px;'
        }`}
      />
      <div
        style={`right: 8px;`}
        class="indicator relative"
        class:on={step === 'connectedWallet'}
      />
    </div>
  {/if}
  <div>
    {@html poweredByBlocknative}
  </div>
</div>
