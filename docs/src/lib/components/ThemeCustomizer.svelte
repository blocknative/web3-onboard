<script>
  import Onboard from '@web3-onboard/core'
  import injectedModule from '@web3-onboard/injected-wallets'

  import { share } from 'rxjs/operators'
  import { onMount } from 'svelte'

  const INFURA_ID = '8b60d52405694345a99bcb82e722e0af'
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
        id: '0x5',
        token: 'ETH',
        label: 'Ethereum Goerli Testnet',
        rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
      },
      {
        id: '0x13881',
        token: 'MATIC',
        label: 'Polygon - Mumbai',
        rpcUrl: 'https://matic-mumbai.chainstacklabs.com	'
      },
      {
        id: '0x38',
        token: 'BNB',
        label: 'Binance',
        rpcUrl: 'https://bsc-dataseed.binance.org/'
      },
      {
        id: 137,
        token: 'MATIC',
        label: 'Polygon',
        rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
      },
      {
        id: 10,
        token: 'OETH',
        label: 'Optimism',
        rpcUrl: 'https://mainnet.optimism.io'
      },
      {
        id: 42161,
        token: 'ARB-ETH',
        label: 'Arbitrum',
        rpcUrl: 'https://rpc.ankr.com/arbitrum'
      }
    ],
    appMetadata: {
      name: 'Documentation',
      // icon: '<svg></svg>',
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    },
    accountCenter: {
      desktop: { enabled: true },
      mobile: { enabled: true }
    }
  })

  const themes = ['system', 'default', 'light', 'dark', 'custom']
  let selectedTheme = 'custom'

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
    resetTheme()
    const onboardCloseBtnVisible = document
      ?.querySelector('body > onboard-v2')
      ?.shadowRoot?.querySelector('.close-button')
    if (onboardCloseBtnVisible) onboardCloseBtnVisible?.click()
  }

  const handleConnectWalletBtn = () => {
    !!$wallets$ && $wallets$.length
      ? onboard.disconnectWallet({ label: $wallets$[0].label })
      : onboard.connectWallet()
  }

  const themingObjects = {
    default: {
      '--w3o-background-color': 'unset',
      '--w3o-foreground-color': 'unset',
      '--w3o-text-color': 'unset',
      '--w3o-border-color': 'unset',
      '--w3o-action-color': 'unset',
      '--w3o-border-radius': 'unset'
    },
    custom: {
      '--w3o-background-color': 'unset',
      '--w3o-foreground-color': 'unset',
      '--w3o-text-color': 'unset',
      '--w3o-border-color': 'unset',
      '--w3o-action-color': 'unset',
      '--w3o-border-radius': 'unset'
    },
    light: {
      '--w3o-background-color': '#ffffff',
      '--w3o-foreground-color': '#EFF1FC',
      '--w3o-text-color': '#1a1d26',
      '--w3o-border-color': '#d0d4f7',
      '--w3o-action-color': '#6370E5',
      '--w3o-border-radius': '16px'
    },
    dark: {
      '--w3o-background-color': '#1A1D26',
      '--w3o-foreground-color': '#242835',
      '--w3o-text-color': '#EFF1FC',
      '--w3o-border-color': '#33394B',
      '--w3o-action-color': '#929bed',
      '--w3o-border-radius': '16px'
    }
  }

  const styleToString = (style) => {
    return Object.keys(style).reduce((acc, key) => acc + `"${key}": "${style[key]}", \n`, '')
  }

  async function copyStylingConfig() {
    try {
      const copy = await navigator.clipboard.writeText(copyableStyles)
      return copy
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  let copyableStyles =
    selectedTheme !== 'custom' ? '' : `{\n ${styleToString(themingObjects[selectedTheme])}}`

  const updateTheme = () => {
    if (selectedTheme !== 'custom') {
      onboard.state.actions.updateTheme(selectedTheme)
    }
    copyableStyles =
      selectedTheme !== 'custom' ? '' : `{\n ${styleToString(themingObjects[selectedTheme])}}`
  }

  const updateThemeEl = (e, targetStyle) => {
    if (selectedTheme !== 'custom') return
    document.documentElement.style.setProperty(targetStyle, e.target.value)

    copyableStyles = `{\n ${styleToString(themingObjects[selectedTheme])}}`
  }

  const resetTheme = () => {
    selectedTheme = 'custom'
    Object.keys(themingObjects['custom']).forEach((style) => {
      document.documentElement.style.setProperty(style, themingObjects['custom'][style])
    })
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
    <label>Select a theme:</label>
    <select bind:value={selectedTheme} on:change={() => updateTheme()}>
      {#each themes as theme}
        <option value={theme}>
          {theme}
        </option>
      {/each}
    </select>
    {#if selectedTheme === 'custom'}
      <label for="Theme"
        >Click Color Circles to Customize Theme, Copy Config and Paste as `theme` property value in
        Onboard config:
      </label>
      <hr />
      <div class="theming-container">
        {#each Object.keys(themingObjects[selectedTheme]) as target}
          {#if !target.includes('border-radius')}
            <div class="theming-inputs-wrapper">
              <div class="theming-inputs">
                <input
                  type="color"
                  name="Theme"
                  bind:value={themingObjects[selectedTheme][target]}
                  on:input={(e) => updateThemeEl(e, target)}
                />
              </div>
              <span class="text" id="current-theme"
                >{target} : {themingObjects[selectedTheme][target]}</span
              >
            </div>
          {:else}
            <div class="theming-inputs-wrapper">
              <div class="theming-inputs-text">
                <input
                  class="br-text-input"
                  type="text"
                  bind:value={themingObjects[selectedTheme][target]}
                  on:input={(e) => updateThemeEl(e, target)}
                />
              </div>
              <span class="text" id="current-theme"
                >{target} : {themingObjects[selectedTheme][target]}</span
              >
            </div>
          {/if}
        {/each}
      </div>
      <div class="copy-styles-container">
        <textarea readonly bind:value={copyableStyles} rows="8" class="copy-styles-textarea" />
        <button on:click={async () => await copyStylingConfig()}> Copy Theming Config </button>
      </div>
      <hr />
    {:else}
      <label for="Theme">
        The system theme will align the theme with the users system preferences
      </label>
      <hr />
      <div class="theming-container" />
    {/if}

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
      <form class="drop-area-controls" on:submit|preventDefault={addURLToIFrame}>
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
      </form>
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
    z-index: 25;
    left: 0;
    right: auto;
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
  .theming-inputs-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    margin: 0.25em;
  }
  .br-text-input {
    width: 3rem;
    padding: 0.25rem;
    text-align: center;
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
    z-index: 9999;
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

  select {
    width: 100%;
    padding: 1rem;
  }

  .backdrop-toggle {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
