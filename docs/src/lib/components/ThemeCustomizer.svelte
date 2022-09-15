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
  let hideDirections = false

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }

  const addURLToIFrame = () => {
    if (!webURL || !isValidUrl(webURL)) {
      alert('Invaled URL entered')
      return
    }
    iframeUsed = true
    document.querySelector('#iframe_underlay').setAttribute('src', webURL)
    hideDirections = true
    onboard.connectWallet()
  }

  const resetPage = () => {
    iframeUsed = false
    document.querySelector('#iframe_underlay').setAttribute('src', '')
    hideDirections = false
    document.querySelector('#image_drop_area').style.backgroundImage = ''
    uploaded_image = undefined
    webURL = ''
  }

  const handleConnectWalletBtn = () => {
    !!$wallets$ && $wallets$.length
      ? onboard.disconnectWallet({label: $wallets$[0].label})
      : onboard.connectWallet()
  }

  const defaultStyling = {
    '--background-color': '#ffffff',
    '--text-color': '#1a1d26',
    '--border-color': '#ebebed',
    '--accent-background': '#ebebed',
    '--accent-color': '#929bed',
    '--accent-color-hover': '#eff1fc',
    '--secondary-text-color': '#707481'
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
  --onboard-wallet-app-icon-border-color: var(--border-color);`

  const styleToString = (style) => {
    return Object.keys(style).reduce((acc, key) => acc + key + ': ' + style[key] + '; \n  ', '')
  }

  async function copyStylingConfig() {
    try {
      const copy = await navigator.clipboard.writeText(copyableStyles)
      return copy
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  let copyableStyles = `:root {\n  ${styleToString(defaultStyling)}${baseStyling}\n}`

  const updateThemes = (e, targetStyle) => {
    document.documentElement.style.setProperty(targetStyle, e.target.value)

    copyableStyles = `:root {\n  ${styleToString(defaultStyling)}${baseStyling}\n}`
  }

  let checked = false

  const handleBackdrop = () => {
    if (!checked) {
      document.documentElement.style.setProperty('--onboard-modal-backdrop', 'rgba(0, 0, 0, 0)')
    } else {
      document.documentElement.style.setProperty('--onboard-modal-backdrop', 'rgba(0, 0, 0, 0.6)')
    }
  }

  let uploaded_image
  // Converts the image into a data URI
  const readImage = (file) => {
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      uploaded_image = event?.target?.result
      document.querySelector('#image_drop_area').style.backgroundImage = `url(${uploaded_image})`
    })
    reader.readAsDataURL(file)
  }

  const handleImageDrop = () => {
    const image_drop_area = document.querySelector('#image_drop_area')
    if (image_drop_area) {
      image_drop_area.addEventListener('dragover', (event) => {
        event.stopPropagation()
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
      })

      image_drop_area.addEventListener('drop', (event) => {
        hideDirections = true
        onboard.connectWallet()
        event.stopPropagation()
        event.preventDefault()
        let fileList = event.dataTransfer.files

        readImage(fileList[0])
      })
    }
  }

  onMount(async () => {
    handleImageDrop()
  })
</script>

<section>
  <div class="control-panel">
    <label for="Theme">Click Color Circles to Set Theme: </label>
    <hr />
    <div class="theming-container">
      {#each Object.keys(defaultStyling) as target}
        <div class="theming-inputs-wrapper">
          <div class="theming-inputs">
            <input
              type="color"
              name="Theme"
              bind:value={defaultStyling[target]}
              on:input={(e) => updateThemes(e, target)}
            />
          </div>
          <span class="text" id="current-theme">{target} : {defaultStyling[target]}</span>
        </div>
      {/each}
    </div>
    <div class="copy-styles-container">
      <textarea readonly bind:value={copyableStyles} rows="10" class="copy-styles-textarea" />
      <button on:click={async () => await copyStylingConfig()}> Copy Styling Config </button>
    </div>
    <hr />
    <div class="backdrop-toggle">
      <label class="switch">
        <input type="checkbox" on:change={() => handleBackdrop()} bind:checked />
        <span class="slider" />
      </label>
      Disabled Backdrop for Styling
    </div>
  </div>
  <div class="image-drop-container">
    <div id="image_drop_area">
      <div class="drop-area-controls">
        <div>
          Enter your website url or drag and drop a screenshot to preview web3-onboard on your site
        </div>
        <!-- <div>Then click color circles above to change the theme.</div> -->
        <div class="website-input-row">
          <input
            type="text"
            class="iframe-input"
            placeholder="Enter your Website URL"
            bind:value={webURL}
          />
          <button on:click={addURLToIFrame}>Preview On Your Website</button>
          <button
            on:click={resetPage}
            type="button"
            disabled={iframeUsed || !!uploaded_image ? false : true}>Reset</button
          >
          <button on:click={handleConnectWalletBtn} type="button"
            >{!!$wallets$ && $wallets$.length ? 'Disconnect Wallet' : 'Connect Wallet'}</button
          >
        </div>
      </div>
      <iframe
        id="iframe_underlay"
        title="iframe area for testing W3O with your app"
        class={iframeUsed ? 'iframe-visible' : 'iframe-hidden'}
      />
      <div style:display={hideDirections ? 'none' : ''}>
        <div>Drag and drop an image here to preview</div>
      </div>
    </div>
  </div>
</section>

<style>
  /* iframe { width: 100%; height: 62.5rem;} */
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
    --onboard-connect-sidebar-progress-color: var(--accent-color); /* defaults to  primary-600 */
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
  }

  section {
    position: relative;
    height: 100%;
    padding: 1rem;
  }

  button {
    color: var(--kd-color-gray-body);
    background: var(--kd-color-gray-inverse);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 1rem;
  }
  button:hover {
    background: var(--kd-color-gray-hover-inverse);
  }
  button:disabled {
    background: var(--kd-color-gray-inverse);
    opacity: 0.5;
    cursor: not-allowed;
  }

  hr {
    border-color: var(--kd-color-gray-soft);
  }

  .control-panel {
    z-index: 9999;
    left: auto;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow: hidden;
    overflow-y: scroll;
    max-height: 100vh;
    width: 360px;
    margin: 1rem;
    padding: 1rem;
    font-size: 14px;
    color: var(--kd-color-gray-inverse);
    background-color: var(--kd-color-gray-divider);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  .copy-styles-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    gap: inherit;
  }

  .copy-styles-textarea {
    padding: 1rem;
    color: var(--kd-color-gray-inverse);
    background: var(--kd-color-gray-hover);
    border: 1px solid var(--kd-color-gray-soft);
  }

  .theming-container {
    display: flex;
    flex-direction: column;
  }

  .theming-inputs-wrapper {
    display: flex;
    align-items: center;
  }
  .theming-inputs {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 2em;
    height: 2em;
    margin: 0.5em;
  }
  .iframe-input {
    flex: 1;
    padding: 1rem;
    color: var(--kd-color-gray-inverse);
    background: var(--kd-color-gray-hover);
    border: 1px solid var(--kd-color-gray-soft);
  }

  input[type='color'] {
    width: inherit;
    height: inherit;
    background: none;
  }
  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
    background: none;
  }
  input[type='color']::-webkit-color-swatch {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }

  .image-drop-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    max-width: 100%;
    padding: 0.5rem;

    border: 1px solid var(--kd-color-gray-soft);
    border-style: dotted;
  }

  #image_drop_area {
    width: 100%;
    height: 100%;
    background: center no-repeat;
    background-size: contain;
    background-color: rgba(0, 0, 0, 0.25);
    box-sizing: border-box;

    display: flex;
    flex-flow: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .drop-area-controls {
    position: absolute;
    top: 0;
    padding: 1rem;
    font-size: 14px;
    color: var(--kd-color-gray-inverse);
    background-color: var(--kd-color-gray-divider);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  .website-input-row {
    display: flex;
    flex-flow: row;
    gap: 0.5rem;
  }

  .iframe-visible {
    display: block;
    width: 100%;
    height: 100%;
  }
  .iframe-hidden {
    display: none;
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
    gap: 1rem;
  }
</style>
