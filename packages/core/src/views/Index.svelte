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
    // !accountCenterMountToDifferentElement &&
    $accountCenter$.enabled &&
    $notify$.enabled &&
    $notify$.position === $accountCenter$.position

  $: samePositionOrMobile =
    device.type === 'mobile' || $accountCenter$.position === $notify$.position

  $: sharedMobileContainerCheck =
    device.type === 'mobile' &&
    (($notify$.position.includes('bottom') &&
      $accountCenter$.position.includes('bottom')) ||
      ($notify$.position.includes('top') &&
        $accountCenter$.position.includes('top')))

  $: separateMobileContainerCheck =
    device.type === 'mobile' &&
    (($notify$.position.includes('top') &&
      $accountCenter$.position.includes('bottom')) ||
      ($notify$.position.includes('bottom') &&
        $accountCenter$.position.includes('top')))

  $: displayNotifySeparate =
    $notify$.enabled &&
    // accountCenterMountToDifferentElement &&
    (!$accountCenter$.enabled ||
      ($notify$.position !== $accountCenter$.position &&
        device.type !== 'mobile') ||
      separateMobileContainerCheck ||
      !$wallets$.length)

  $: displayAccountCenterSeparate =
    $accountCenter$.enabled &&
    (!$notify$.enabled ||
      ($notify$.position !== $accountCenter$.position &&
        device.type !== 'mobile') ||
      separateMobileContainerCheck) &&
    $wallets$.length

  $: displayAccountCenterNotifySameContainer =
    $notify$.enabled &&
    $accountCenter$.enabled &&
    $wallets$.length &&
    (sharedContainer || sharedMobileContainerCheck)

  const accountCenterContainerElement =
    (containerElements && containerElements.accountCenter) || null

  const accountCenterMountToDifferentElement =
    $accountCenter$.enabled &&
    accountCenterContainerElement
  console.log(containerElements,
    accountCenterMountToDifferentElement,
    accountCenterContainerElement
  )

  if (accountCenterMountToDifferentElement) {
    console.log(
      'container elements for accountCenter:   ',
      accountCenterContainerElement
    )
    // add to DOM
    const accountCenter = document.createElement('onboard-account-center')
    const target = accountCenter.attachShadow({ mode: 'open' })

    target.innerHTML = `
      <style>
        :host {  
          /* COLORS */
          --white: white;
          --black: black;
          --primary-1: #2F80ED;
          --primary-100: #eff1fc;
          --primary-200: #d0d4f7;
          --primary-300: #b1b8f2;
          --primary-400: #929bed;
          --primary-500: #6370e5;
          --primary-600: #454ea0;
          --primary-700: #323873;
          --gray-100: #ebebed;
          --gray-200: #c2c4c9;
          --gray-300: #999ca5;
          --gray-400: #707481;
          --gray-500: #33394b;
          --gray-600: #242835;
          --gray-700: #1a1d26;
          --success-100: #d1fae3;
          --success-200: #baf7d5;
          --success-300: #a4f4c6;
          --success-400: #8df2b8;
          --success-500: #5aec99;
          --success-600: #18ce66;
          --success-700: #129b4d;
          --danger-100: #ffe5e6;
          --danger-200: #ffcccc;
          --danger-300: #ffb3b3;
          --danger-400: #ff8080;
          --danger-500: #ff4f4f;
          --danger-600: #cc0000;
          --danger-700: #660000;
          --warning-100: #ffefcc;
          --warning-200: #ffe7b3;
          --warning-300: #ffd780;
          --warning-400: #ffc74c;
          --warning-500: #ffaf00;
          --warning-600: #cc8c00;
          --warning-700: #664600;
  
          /* FONTS */
          --font-family-normal: Sofia Pro;
  
          --font-size-1: 3rem;
          --font-size-2: 2.25rem;
          --font-size-3: 1.5rem;
          --font-size-4: 1.25rem;
          --font-size-5: 1rem;
          --font-size-6: .875rem;
          --font-size-7: .75rem;
  
          --font-line-height-1: 24px;
          --font-line-height-2: 20px;
          --font-line-height-3: 16px;
          --font-line-height-4: 12px;
  
          /* SPACING */
          --spacing-1: 3rem;
          --spacing-2: 2rem;
          --spacing-3: 1.5rem;
          --spacing-4: 1rem;
          --spacing-5: 0.5rem;
          --spacing-6: 0.25rem;
          --spacing-7: 0.125rem;
  
          /* BORDER RADIUS */
          --border-radius-1: 24px;  
          --border-radius-2: 20px;  
          --border-radius-3: 16px;  
          --border-radius-4: 12px;  
          --border-radius-5: 8px;  

          /* SHADOWS */
          --shadow-0: none;
          --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
          --shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
          --shadow-3: 0px 4px 16px rgba(179, 179, 179, 0.2);

          /* MODAL POSITIONING */
          --modal-z-index: 10;
          --modal-top: unset;
          --modal-right: unset;
          --modal-bottom: unset;
          --modal-left: unset;
          
          /* MODAL STYLES */
          --modal-backdrop: rgba(0, 0, 0, 0.6);
        }
      </style>
    `

    // get container element
    const accountCenterContainerElementQuery =
      accountCenterContainerElement

    const containerElement = document.querySelector(
      accountCenterContainerElementQuery
    )

    containerElement.appendChild(accountCenter)
    if (!containerElement) {
      throw new Error(
        `Element with query ${accountCenterContainerElementQuery} does not exist.`
      )
    }

    // containerElement.appendChild(accountCenter)
    const getACComp = async () => {
      let acComponent = await accountCenterComponent
      if (acComponent) {
        new acComponent({
          target,
          props: {
            settings: $accountCenter$,
            mountInDefinedContainer: true
          }
        })
      }
    }
    getACComp()
  }
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
    >
      {#await accountCenterComponent then AccountCenter}
        {#if AccountCenter}
          <svelte:component this={AccountCenter} settings={$accountCenter$} />
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
            <svelte:component this={AccountCenter} settings={$accountCenter$} />
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
