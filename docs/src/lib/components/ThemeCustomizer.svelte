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
      // Event listener for dragging the image over the div
      image_drop_area.addEventListener('dragover', (event) => {
        event.stopPropagation()
        event.preventDefault()
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = 'copy'
      })

      // Event listener for dropping the image inside the div
      image_drop_area.addEventListener('drop', (event) => {
        const image_drop_area_direction = document.querySelector('#image_drop_area_direction')
        // document.body.style.padding = 0
        image_drop_area_direction.style.display = 'none'
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
    <hr>
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
    <hr>
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
      <p id="image_drop_area_direction">
        Drag and drop a screen shot of your site to customize styling.
        <br />
        Click color circles above to change the theme.
      </p>
      {#if uploaded_image}
        <button on:click={() => onboard.connectWallet()}>Connect Wallet</button>
      {/if}
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
    height: 100%;
    width: 100%;
  }
  button {
    color: var(--kd-color-gray-body);
    background: var(--kd-color-gray-inverse);
    padding: 1rem;
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
    width: 360px;
    margin: 1rem;
    padding: 1rem;
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
    background: rgba(0, 0, 0, 0.2);
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
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #image_drop_area {
    width: 70%;
    height: 90%;
    margin: auto;
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 12px;
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
