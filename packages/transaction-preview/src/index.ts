import { SofiaProLight, SofiaProRegular } from '@web3-onboard/common'
import simTransaction from './get.js'
import { SimPlatformResponse, TransactionPreviewInitOptions } from './types.js'
import { validateTPInit } from './validation'
import TransactionPreview from './views/Index.svelte'
import initI18N from './i18n/index.js'

export * from './types.js'

const transactionPreview = (
  initOptions: TransactionPreviewInitOptions
): void => {
  initOptions
  if (initOptions) {
    const error = validateTPInit(initOptions)

    if (error) {
      throw error
    }
  }
  // Add i18n to init options
  initI18N({})

  mountTransactionPreview(initOptions)
  watchWallet(initOptions)
}

// patchProvider
const watchWallet = async (initOptions: TransactionPreviewInitOptions) => {
  const { walletProvider } = initOptions
  const fullProviderRequest = walletProvider.request
  let transactionParams
  walletProvider.request = async req => {
    if (req.method === 'eth_sendTransaction' && req.params.length) {
      transactionParams = req.params[0]
      if (transactionParams) {
        try {
          const preview = simTransaction(initOptions, transactionParams)
          // mountTransactionPreview(initOptions)
          console.log(preview)
        } catch (e) {
          console.log('error: ', e)
        }
        transactionParams = undefined
      }
    }
    // await result and clear if wanted : check w/ Murat
    return fullProviderRequest(req)
  }
}

// eslint-disable-next-line max-len
const mountTransactionPreview = (
  transactionPreviewOptions: TransactionPreviewInitOptions
) => {
  class TransactionPreviewEl extends HTMLElement {
    constructor() {
      super()
    }
  }

  if (!customElements.get('transaction-preview')) {
    customElements.define('transaction-preview', TransactionPreviewEl)
  }

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${SofiaProRegular}
    ${SofiaProLight}
  `
  document.body.appendChild(styleEl)

  // add to DOM
  const transactionPreviewDomElement = document.createElement(
    'transaction-preview'
  )
  const target = transactionPreviewDomElement.attachShadow({ mode: 'open' })

  transactionPreviewDomElement.style.all = 'initial'

  target.innerHTML = `
    <style>
      :host {  

        --transaction-notification-border-radius
        
        /* COLORS */
        --transaction-notification-background

        /* FONTS */
  
        /* FONTS */
        --font-family-normal: Sofia Pro;

        /* SPACING */


        /* MODAL POSITION */
        --transaction-preview-modal-z-index: 20;
        --transaction-preview-modal-top: unset;
        --transaction-preview-modal-right: unset;
        --transaction-preview-modal-bottom: unset;
        --transaction-preview-modal-left: unset;

        /* SHADOWS */
      }

    </style>
  `
  let getW3OEl = document.querySelector('onboard-v2')

  const containerElementQuery =
    transactionPreviewOptions.containerElement || 'body'

  let containerEl
  // If Onboard is present copy Onboard stylesheets over to TransactionPreview shadow DOM
  if (getW3OEl && getW3OEl.shadowRoot) {
    let w3OStyleSheets = getW3OEl.shadowRoot.styleSheets
    const transactionPreviewStyleSheet = new CSSStyleSheet()

    Object.values(w3OStyleSheets).forEach(sheet => {
      const styleRules = Object.values(sheet.cssRules)
      styleRules.forEach(rule =>
        transactionPreviewStyleSheet.insertRule(rule.cssText)
      )
    })
    target.adoptedStyleSheets = [transactionPreviewStyleSheet]
    containerEl = getW3OEl.shadowRoot.querySelector(containerElementQuery)
  } else {
    containerEl = document.querySelector(containerElementQuery)
  }

  if (!containerEl) {
    throw new Error(
      `Element with query ${containerElementQuery} does not exist.`
    )
  }

  containerEl.appendChild(transactionPreviewDomElement)

  const app = new TransactionPreview({
    target: target,
    props: {
      transactionPreviewOptions
    }
  })

  return app
}

export default transactionPreview
