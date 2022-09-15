<script>
  import Onboard from '@web3-onboard/core'
  import injectedModule from '@web3-onboard/injected-wallets'
  import { share } from 'rxjs/operators'
  import { onMount } from 'svelte'

  const INFURA_ID = 'e0b15c21b7d54cd4814586334af72618'
  const injected = injectedModule()

  const onboard = Onboard({
    wallets: [injected],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
      },
      {
        id: '0x3',
        token: 'tROP',
        label: 'Ethereum Ropsten Testnet',
        rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
      }
    ],
    appMetadata: {
      name: 'Documentation',
      icon: '<svg></svg>',
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    },
    accountCenter: {
      desktop: { enabled: false },
      mobile: { enabled: false }
    }
  })

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets').pipe(share())

  let webURL = ''
  let iframeUsed = false

  const addURLToIFrame = () => {
    document.getElementById('iframe_underlay').setAttribute('src', webURL)
    iframeUsed = true
  }

  const defaultStyling = {
    '--background-color': '#ffffff',
    '--text-color': '#1a1d26',
    '--border-color': '#ebebed',
    '--accent-background': '#ebebed',
    '--accent-color': '#929bed',
    '--accent-color-hover': '#eff1fc',
    '--secondary-text-color': '#707481'
    // '--secondary-accent-background': '#242835'
  }

  const baseStyling = `--onboard-connect-sidebar-background: var(--accent-background);
  --onboard-close-button-background: var(--accent-background);
  --onboard-connect-sidebar-color: var(--text-color);
  --onboard-connect-sidebar-progress-background: var(--secondary-text-color);
  --onboard-connect-sidebar-progress-color: var(--accent-color);
  --onboard-connect-header-background: var(--background-color);
  --onboard-connect-header-color: var(--text-color);
  --onboard-main-scroll-container-background: var(--background-color);
  --onboard-link-color: var(--accent-color);
  --onboard-wallet-button-background: var(--background-color);
  --onboard-wallet-button-background-hover: var(--accent-color-hover);
  --onboard-wallet-button-border-color: var(--border-color);
  --onboard-wallet-app-icon-border-color: var(--border-color);
  --onboard-close-button-background: var(--accent-background);
  --onboard-wallet-button-color-hover: var(--text-color);
  --onboard-wallet-button-color: var(--text-color);`

  const styleToString = style => {
    return Object.keys(style).reduce(
      (acc, key) => acc + key + ': ' + style[key] + '; \n  ',
      ''
    )
  }

  async function copyStylingConfig() {
    try {
      const copy = await navigator.clipboard.writeText(copyableStyles)
      return copy
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  let copyableStyles = `:root {\n  ${styleToString(
    defaultStyling
  )}${baseStyling}\n}`

  const updateTheme = (e, targetStyle) => {
    const iframe = document.getElementById('inlineFrameExample')
    iframe.contentWindow.document.documentElement.style.setProperty(
      targetStyle,
      e.target.value
    )

    copyableStyles = `:root {\n  ${styleToString(
      defaultStyling
    )}${baseStyling}\n}`
  }

  let checked = false

  const handleBackdrop = () => {
    const iframe = document.getElementById('inlineFrameExample')

    if (!checked) {
      iframe.contentWindow.document.documentElement.style.setProperty(
        '--onboard-modal-backdrop',
        'rgba(0, 0, 0, 0)'
      )
    } else {
      iframe.contentWindow.document.documentElement.style.setProperty(
        '--onboard-modal-backdrop',
        'rgba(0, 0, 0, 0.6)'
      )
    }
  }

  // Converts the image into a data URI
  const readImage = file => {
    const reader = new FileReader()
    reader.addEventListener('load', event => {
      uploaded_image = event.target.result
      document.querySelector(
        '#image_drop_area'
      ).style.backgroundImage = `url(${uploaded_image})`
    })
    reader.readAsDataURL(file)
  }

  let uploaded_image
  const handleImageDrop = dataFromDocument => {
    if (dataFromDocument) {
      if (image_drop_area) {
        // Event listener for dragging the image over the div
        image_drop_area.addEventListener('dragover', event => {
          event.stopPropagation()
          event.preventDefault()
          // Style the drag-and-drop as a "copy file" operation.
          event.dataTransfer.dropEffect = 'copy'
        })

        // Event listener for dropping the image inside the div
        image_drop_area.addEventListener('drop', event => {
          const image_drop_area_direction = document.querySelector(
            '#image_drop_area_direction'
          )
          document.body.style.padding = 0
          image_drop_area_direction.style.display = 'none'
          onboard.connectWallet()
          event.stopPropagation()
          event.preventDefault()
          let fileList = event.dataTransfer.files

          readImage(fileList[0])
        })
      }
    }
  }
  const initIFrame = async dataFromDocument => {
    if (dataFromDocument) {
      return (hideForIframe = true)
    }
  }

  onMount(async () => {
    var dataFromDocument = location.hash.replace(/#/, '')
    console.log(dataFromDocument)
    await initIFrame(dataFromDocument)
    handleImageDrop(dataFromDocument)
  })
</script>

<style>
  :root {
    --background-color: #ffffff; /* --white */
    --text-color: #1a1d26; /* --gray-700 */
    --border-color: #ebebed; /* --gray-100 taken from future mock */

    --accent-background: #ebebed; /* --gray-100 (currently gray-100 in connect modal) */
    --accent-color: #929bed; /* --primary-400 */
    --accent-color-hover: #eff1fc; /* --primary-200 */

    /* Account Center & Notify */
    --secondary-text-color: #707481; /* --gray-400 (balance and token name) */
    /* --secondary-accent-background: #242835; --gray-600 (Upper background in maximized) */

    /* --onboard-font-family-normal: System,monospace; */
    --onboard-connect-sidebar-background: var(--accent-background);
    --onboard-close-button-background: var(--accent-background);
    --onboard-connect-sidebar-color: var(--text-color);
    --onboard-connect-sidebar-progress-background: var(
      --secondary-text-color
    ); /* defaults to gray-200 */
    --onboard-connect-sidebar-progress-color: var(
      --accent-color
    ); /* defaults to  primary-600 */
    --onboard-connect-header-background: var(--background-color);
    --onboard-connect-header-color: var(--text-color);
    --onboard-main-scroll-container-background: var(--background-color);
    --onboard-link-color: var(--accent-color);
    --onboard-wallet-button-background: var(--background-color);
    --onboard-wallet-button-background-hover: var(--accent-color-hover);
    --onboard-wallet-button-color-hover: var(--text-color);
    --onboard-wallet-button-color: var(--text-color);
    --onboard-wallet-button-border-color: var(--border-color);
    --onboard-wallet-app-icon-border-color: var(--border-color);
    /* 
    --account-center-minimized-background: var(--background-color);
    --account-center-minimized-address-color: var(--text-color);
    --account-center-minimized-balance-color: var(--secondary-text-color);
    --account-center-minimized-chain-select-background: var(
      --accent-color-hover
    );
    --account-center-maximized-info-section-background: var(--background-color);
    --account-center-maximized-network-section-background: var(
      --accent-background
    );
    --account-center-maximized-upper-background: var(
      --secondary-accent-background
    );
    --account-center-maximized-address-color: var(--background-color);
    --account-center-maximized-account-section-background-hover: var(
      --text-color
    );
    --account-center-maximized-balance-color: var(--border-color);
    --account-center-maximized-upper-action-color: var(--accent-color);
    --account-center-maximized-network-text-color: var(
      --secondary-accent-background
    );
    --account-center-maximized-info-section-background-color: var(
      --background-color
    );
    --account-center-maximized-app-name-color: var(
      --secondary-accent-background
    );
    --account-center-maximized-app-info-color: var(
      --secondary-accent-background
    );
    --account-center-app-btn-background: var(--secondary-accent-background);
    --account-center-app-btn-text-color: var(--background-color);

    --notify-onboard-background: var(--secondary-accent-background);
    --notify-onboard-transaction-status: var(--accent-background);
    --notify-onboard-address-hash-color: var(--accent-color-hover);
    --notify-onboard-anchor-color: var(--accent-color);
    --notify-onboard-timer-color: var(--secondary-text-color); */

    /* 
		NEEDS TARGET AS IT USES OPACITY: 
		--account-center-maximized-upper-action-background-hover
		NEEDS UPDATES FOR DIFFERNT STYLING, DOESNT FIT BASIC VARIABLES ABOVE:
		Notify status icons, icon backgrounds and icon borders
	*/
  }
  main {
    height: 100%;
  }
  button {
    width: 14rem;
    margin: 8px;
  }

  .copy-styles-container {
    display: flex;
    flex-direction: row;
    align-items: end;
  }

  .copy-styles-textarea {
    width: 30rem;
    height: 16rem;
    margin: 0 0 8px;
  }

  /* .notify-chain-container {
    display: flex;
    flex-wrap: wrap;
  }
  .notify-action-container {
    display: flex;
    flex-direction: column;
    width: 15rem;
  } */

  .theming-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
  }

  .theming-inputs-wrapper {
    display: flex;
    align-items: center;
    width: 19rem;
  }
  .theming-inputs {
    display: inline-flex;
    overflow: hidden;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    box-shadow: 1px 1px 3px 0px grey;
    margin: 0.4em;
  }
  input[type='color'] {
    padding: 0;
    width: 150%;
    height: 150%;
    margin: -25%;
  }
  #image_drop_area,
  #iframe_underlay {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #929bed;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #929bed;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .backdrop-toggle {
    display: flex;
    align-items: center;
    margin: 8px 8px 16px 4px;
  }

  .backdrop-toggle > label {
    margin-right: 8px;
  }
</style>

<main>
  {#if !iframeUsed}
    <div id="image_drop_area">
      <p id="image_drop_area_direction">
        Drag and drop a screen shot of your site to customize styling origin....
        <br />
      </p>
      <div>
        <input
          type="text"
          class="text-input"
          placeholder="Enter your Website URL"
          bind:value={webURL}
        />
        <button on:click={addURLToIFrame}> View With Your Website </button>
      </div>
      Click color circles above to change the theme.
      <!-- {#if uploaded_image}
        {#if $wallets$}
          <div class="notify-chain-container">
            <div class="notify-action-container">
              <button
                on:click={() =>
                  onboard.state.actions.customNotification({
                    type: 'hint',
                    message: 'This is a custom DApp hint',
                    autoDismiss: 0
                  })}>Send Hint Notification</button
              >
              <button
                on:click={() => {
                  onboard.state.actions.customNotification({
                      type: 'pending',
                      message:
                        'This is a custom DApp pending notification to use however you want',
                      autoDismiss: 0
                    })
                }}>Send Success Notification</button
              >
              <button
                on:click={() =>
                  onboard.state.actions.customNotification({
                    message:
                      'This is a custom DApp success notification to use however you want',
                    autoDismiss: 0,
                    type: 'pending'
                  })}>Send Pending Notification</button
              >
              <button
                on:click={() =>
                  onboard.state.actions.customNotification({
                    type: 'error',
                    message:
                      'This is a custom DApp Error notification to use however you want',
                    autoDismiss: 0
                  })}>Send Error Notification</button
              >
              <button
                on:click={() =>
                  onboard.state.actions.customNotification({
                    message:
                      'This is a custom non-descript DApp notification to use however you want',
                    autoDismiss: 0
                  })}>Send DApp Notification</button
              >
            </div>
          </div>
        {/if}
      {/if} -->
    </div>
  {:else}
    <iframe
      id="iframe_underlay"
      title="iframe area for testing W3O with your app"
    />
  {/if}
  <div class="themes">
    <label for="Theme">Click Color Circles to Set Theme: </label>
    <div class="theming-container">
      {#each Object.keys(defaultStyling) as target}
        <div class="theming-inputs-wrapper">
          <div class="theming-inputs">
            <input
              type="color"
              name="Theme"
              bind:value={defaultStyling[target]}
              on:input={e => updateTheme(e, target)}
            />
          </div>
          <span class="text" id="current-theme"
            >{target} : {defaultStyling[target]}</span
          >
        </div>
      {/each}
    </div>
    <div class="backdrop-toggle">
      <label class="switch">
        <input
          type="checkbox"
          on:change={() => handleBackdrop()}
          bind:checked
        />
        <span class="slider" />
      </label>
      Disabled Backdrop for Styling
    </div>
    <div class="copy-styles-container">
      <textarea
        readonly
        bind:value={copyableStyles}
        class="copy-styles-textarea"
      />
      <button on:click={async () => await copyStylingConfig()}>
        Copy Styling Config
      </button>
    </div>
  </div>
  <iframe
    id="inlineFrameExample"
    name="inlineFrameExample"
    title="Inline Frame Example"
    src={window.location.href + '#stylize'}
  />
</main>
