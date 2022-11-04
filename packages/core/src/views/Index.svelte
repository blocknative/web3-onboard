<script lang="ts">
  import { shareReplay, startWith } from 'rxjs/operators'
  import { connectWallet$, switchChainModal$, wallets$ } from '../streams.js'
  import { state } from '../store/index.js'
  import Connect from './connect/Index.svelte'
  import SwitchChain from './chain/SwitchChain.svelte'
  import ActionRequired from './connect/ActionRequired.svelte'
  import { configuration } from '../configuration.js'
  import type { Observable } from 'rxjs'
  import type { Notification } from '../types.js'
  import { afterUpdate } from 'svelte'

  const { device, containerElements } = configuration
  const accountCenter$ = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))

  const notify$ = state
    .select('notify')
    .pipe(startWith(state.get().notify), shareReplay(1))

  const notifications$: Observable<Notification[]> = state
    .select('notifications')
    .pipe(startWith(state.get().notifications))

  const accountCenterPositioning = 'account-center'
  const notifyPositioning = 'notify-onboard-container'
  const setPositioningDefaults = (targetComponentVariable: string) => {
    return {
      topLeft: `
        top: var(--${targetComponentVariable}-position-top, 0); 
        left: var(--${targetComponentVariable}-position-left, 0);`,
      topRight: `
        top: var(--${targetComponentVariable}-position-top, 0); 
        right: var(--${targetComponentVariable}-position-right, 0);`,
      bottomRight: `
        bottom: var(--${targetComponentVariable}-position-bottom, 0); 
        right: var(--${targetComponentVariable}-position-right, 0);`,
      bottomLeft: `
        bottom: var(--${targetComponentVariable}-position-bottom, 0); 
        left: var(--${targetComponentVariable}-position-left, 0);`
    }
  }

  const accountCenterComponent = $accountCenter$.enabled
    ? import('./account-center/Index.svelte').then(mod => mod.default)
    : Promise.resolve(null)

  const notifyComponent = $notify$.enabled
    ? import('./notify/Index.svelte').then(mod => mod.default)
    : Promise.resolve(null)

  $: sharedContainer =
    !accountCenterMountToElement &&
    $accountCenter$.enabled &&
    $notify$.enabled &&
    $notify$.position === $accountCenter$.position

  $: samePositionOrMobile =
    device.type === 'mobile' || $accountCenter$.position === $notify$.position

  $: sharedMobileContainerCheck =
    ($notify$.position.includes('bottom') &&
      $accountCenter$.position.includes('bottom')) ||
    ($notify$.position.includes('top') &&
      $accountCenter$.position.includes('top'))

  $: displayNotifySeparate =
    $notify$.enabled &&
    (!$accountCenter$.enabled ||
      accountCenterMountToElement ||
      ($notify$.position !== $accountCenter$.position &&
        device.type !== 'mobile') ||
      (device.type === 'mobile' && !sharedMobileContainerCheck) ||
      !$wallets$.length)

  $: displayAccountCenterSeparate =
    $accountCenter$.enabled &&
    (!$notify$.enabled ||
      ($notify$.position !== $accountCenter$.position &&
        device.type !== 'mobile') ||
      (device.type === 'mobile' && !sharedMobileContainerCheck)) &&
    $wallets$.length

  $: displayAccountCenterNotifySameContainer =
    $notify$.enabled &&
    $accountCenter$.enabled &&
    (sharedContainer ||
      (device.type === 'mobile' && sharedMobileContainerCheck)) &&
    $wallets$.length

  const accountCenterMountToElement =
    $accountCenter$.enabled &&
    containerElements &&
    containerElements.accountCenter

  if (accountCenterMountToElement) {
    const accountCenter = document.createElement('onboard-account-center')
    const target = accountCenter.attachShadow({ mode: 'open' })

    let getW3OEl = document.querySelector('onboard-v2')
    let w3OStyleSheets = getW3OEl.shadowRoot.styleSheets
    const accountCenterStyleSheet = new CSSStyleSheet()

    // Copy Onboard stylesheets over to AccountCenter shadow DOM
    Object.values(w3OStyleSheets).forEach(sheet => {
      const styleRules = Object.values(sheet.cssRules)
      styleRules.forEach(rule =>
        accountCenterStyleSheet.insertRule(rule.cssText)
      )
    })
    target.adoptedStyleSheets = [accountCenterStyleSheet]

    const containerElement = document.querySelector(accountCenterMountToElement)

    containerElement.appendChild(accountCenter)
    if (!containerElement) {
      throw new Error(
        `Element with query ${accountCenterMountToElement} does not exist.`
      )
    }

    const getACComp = async () => {
      let acComponent = await accountCenterComponent
      if (acComponent) {
        new acComponent({
          target,
          props: {
            settings: $accountCenter$,
            mountInContainer: true
          }
        })
      }
    }
    getACComp()
  }
let transactionPreviewRendered = false
  afterUpdate(() => {
    const { apiKey, apiSecretKey, transactionPreview } = configuration
    if (transactionPreview && apiKey && apiSecretKey && $wallets$.length && !transactionPreviewRendered) {
      try {
        configuration.transactionPreview({
          apiKey: configuration.apiKey,
          apiSecretKey: configuration.apiSecretKey,
          walletProvider: $wallets$[0].provider,
          containerElement: '#bn-inner-aux-container'
        })
        transactionPreviewRendered = true
      } catch (error) {
        console.log(error)
      }
    }
  })
</script>

<style>
  :global(.flex) {
    display: flex;
  }

  :global(.inline-flex) {
    display: inline-flex;
  }

  :global(.flex-column) {
    flex-direction: column;
  }

  :global(.items-center) {
    align-items: center;
  }

  :global(.items-end) {
    align-items: flex-end;
  }

  :global(.items-start) {
    align-items: flex-start;
  }

  :global(.justify-center) {
    justify-content: center;
  }

  :global(.justify-start) {
    justify-content: flex-start;
  }

  :global(.justify-between) {
    justify-content: space-between;
  }

  :global(.justify-end) {
    justify-content: flex-end;
  }

  :global(.justify-around) {
    justify-content: space-around;
  }

  :global(.relative) {
    position: relative;
  }

  :global(.absolute) {
    position: absolute;
  }

  :global(.fixed) {
    position: fixed;
  }

  :global(.pointer) {
    cursor: pointer;
  }

  :global(.shadow-1) {
    box-shadow: var(--onboard-shadow-1, var(--shadow-1));
  }

  :global(.w-100) {
    width: 100%;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(input) {
    background: var(--onboard-white, var(--white));
  }

  :global(input) {
    width: 100%;
    padding: 0.5rem 1rem;
    outline: 2px solid var(--onboard-gray-200, var(--gray-200));
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--onboard-gray-600, var(--gray-600));
    transition: all 200ms ease-in-out;
  }

  :global(input[type='checkbox']) {
    -webkit-appearance: none;
    width: auto;
    background: var(--onboard-white, var(--white));
    outline: 1px solid var(--onboard-gray-300, var(--gray-300));
    border: none;
    padding: 0.5em;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  :global(input[type='checkbox']:hover) {
    border-color: var(
      --onboard-checkbox-background,
      var(--onboard-primary-500, var(--primary-500))
    );
  }

  :global(input[type='checkbox']:checked) {
    background: var(
      --onboard-checkbox-background,
      var(--onboard-primary-500, var(--primary-500))
    );
    border-color: var(
      --onboard-checkbox-background,
      var(--onboard-primary-500, var(--primary-500))
    );
    color: var(--onboard-checkbox-color, var(--onboard-white, var(--white)));
  }

  :global(input[type='checkbox']:checked:after) {
    content: url("data:image/svg+xml,%3Csvg width='0.885em' height='0.6em' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 6L5 11L14 2L12.59 0.58L5 8.17L1.41 4.59L0 6Z' fill='white'/%3E%3C/svg%3E");
    font-size: 12px;
    position: absolute;
    color: var(--onboard-checkbox-color, var(--onboard-white, var(--white)));
  }

  :global(input:hover) {
    border-color: var(
      --onboard-checkbox-color,
      var(--onboard-white, var(--white))
    );
  }

  :global(input:focus) {
    border-color: var(--onboard-primary-500, var(--primary-500));
    box-shadow: 0 0 1px 1px
      var(
        --onboard-checkbox-background,
        var(--onboard-primary-500, var(--primary-500))
      );
    box-shadow: 0 0 0 1px -moz-mac-focusring;
  }

  :global(input:disabled, textarea:disabled, select:disabled) {
    background: var(--gray-100);
  }

  :global(input::-moz-focus-inner) {
    outline: 0;
    padding: 0;
    margin-top: -2px;
    margin-bottom: -2px;
  }

  :global(a) {
    color: var(
      --onboard-link-color,
      var(--onboard-primary-500, var(--primary-500))
    );
    text-decoration: none;
  }

  :global(a:hover) {
    text-decoration: underline;
  }

  :global(button) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);
    border-radius: 24px;
    cursor: pointer;
    font: inherit;
    border: none;
    transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  }

  :global(.onboard-button-primary) {
    background: var(--onboard-white, var(--white));
    padding: calc(var(--onboard-spacing-5, var(--spacing-5)) - 1px)
      calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);
    color: var(--onboard-gray-500, var(--gray-500));
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    border: 1px solid var(--onboard-gray-500, var(--gray-500));
    font-weight: 700;
  }

  :global(.button-neutral-solid) {
    width: 100%;
    border-radius: 8px;
    background: var(--onboard-gray-500, var(--gray-500));
    color: var(--onboard-white, var(--white));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  :global(.button-neutral-solid-b) {
    width: 100%;
    background: var(--onboard-gray-100, var(--gray-100));
    color: var(--onboard-gray-500, var(--gray-500));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  :global(button.rounded) {
    border-radius: 24px;
  }

  :global(.button-neutral-solid:hover) {
    background: var(--onboard-gray-700, var(--gray-700));
  }
  :global(.button-neutral-solid-b:hover) {
    background: var(--onboard-gray-200, var(--gray-200));
  }

  :global(.button-neutral-solid:active) {
    color: var(--onboard-gray-300, var(--gray-300));
  }

  :global(.button-neutral-solid-b:active) {
    color: var(--onboard-gray-600, var(--gray-600));
    background: var(--onboard-gray-300, var(--gray-300));
  }

  .container {
    padding: 16px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    width: 100%;
    pointer-events: none;
    touch-action: none;
  }

  .z-indexed {
    z-index: var(--account-center-z-index);
  }

  @media all and (min-width: 428px) {
    .container {
      max-width: 348px;
    }
  }
</style>

{#if $connectWallet$.inProgress}
  <Connect autoSelect={$connectWallet$.autoSelect} />
{/if}

{#if $connectWallet$.actionRequired}
  <ActionRequired wallet={$connectWallet$.actionRequired} />
{/if}

{#if $switchChainModal$}
  <SwitchChain />
{/if}

{#if displayAccountCenterNotifySameContainer}
  <div
    class="container flex flex-column fixed z-indexed"
    style="{setPositioningDefaults(accountCenterPositioning)[
      $accountCenter$.position
    ]}; {device.type === 'mobile' && $accountCenter$.position.includes('top')
      ? 'padding-bottom: 0;'
      : device.type === 'mobile' && $accountCenter$.position.includes('bottom')
      ? 'padding-top:0;'
      : ''} "
    id="bn-inner-aux-container"
  >
    {#if $notify$.position.includes('bottom') && $accountCenter$.position.includes('bottom') && samePositionOrMobile}
      {#await notifyComponent then Notify}
        {#if Notify}
          <svelte:component
            this={Notify}
            notifications={$notifications$}
            position={$notify$.position}
            {sharedContainer}
          />
        {/if}
      {/await}
    {/if}
    <div
      style={!$accountCenter$.expanded &&
      $accountCenter$.minimal &&
      $accountCenter$.position.includes('Right')
        ? 'margin-left: auto'
        : !$accountCenter$.expanded &&
          $accountCenter$.minimal &&
          $accountCenter$.position.includes('Left')
        ? 'margin-right: auto'
        : ''}
      id="account-center-with-notify"
    >
      {#await accountCenterComponent then AccountCenter}
        {#if AccountCenter}
          <svelte:component this={AccountCenter} />
        {/if}
      {/await}
    </div>
    {#if $notify$.position.includes('top') && $accountCenter$.position.includes('top') && samePositionOrMobile}
      {#await notifyComponent then Notify}
        {#if Notify}
          <svelte:component
            this={Notify}
            notifications={$notifications$}
            position={$notify$.position}
            {sharedContainer}
          />
        {/if}
      {/await}
    {/if}
  </div>
{/if}
{#if displayAccountCenterSeparate}
  <div
    class="container flex flex-column fixed z-indexed"
    style="{setPositioningDefaults(accountCenterPositioning)[
      $accountCenter$.position
    ]}; {device.type === 'mobile' && $accountCenter$.position.includes('top')
      ? 'padding-bottom: 0;'
      : device.type === 'mobile' && $accountCenter$.position.includes('bottom')
      ? 'padding-top:0;'
      : ''} "
    id="bn-inner-aux-container"
  >
    <div
      style={!$accountCenter$.expanded &&
      $accountCenter$.minimal &&
      $accountCenter$.position.includes('Right')
        ? 'margin-left: auto'
        : !$accountCenter$.expanded &&
          $accountCenter$.minimal &&
          $accountCenter$.position.includes('Left')
        ? 'margin-right: auto'
        : ''}
    >
      {#if $accountCenter$.enabled && $wallets$.length}
        {#await accountCenterComponent then AccountCenter}
          {#if AccountCenter}
            <svelte:component this={AccountCenter} />
          {/if}
        {/await}
      {/if}
    </div>
  </div>
{/if}
{#if displayNotifySeparate}
  <div
    class="container flex flex-column fixed z-indexed"
    style="{setPositioningDefaults(notifyPositioning)[
      $notify$.position
    ]}; {device.type === 'mobile' && $notify$.position.includes('top')
      ? 'padding-bottom: 0;'
      : device.type === 'mobile' && $notify$.position.includes('bottom')
      ? 'padding-top:0;'
      : ''} "
    id="bn-inner-aux-container"
  >
    {#await notifyComponent then Notify}
      {#if Notify}
        <svelte:component
          this={Notify}
          notifications={$notifications$}
          position={$notify$.position}
          {sharedContainer}
        />
      {/if}
    {/await}
  </div>
{/if}
