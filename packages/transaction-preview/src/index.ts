import { SofiaProLight, SofiaProRegular } from '@web3-onboard/common'
import get from './get.js'
import { SimPlatformResponse, TransactionPreviewInitOptions } from './types.js'
import { validateTPInit } from './validation'
import TransactionPreview from './views/Index.svelte'

export * from './types.js'

// eslint-disable-next-line max-len
const transactionPreview = async (
  options: TransactionPreviewInitOptions
): Promise<SimPlatformResponse[]> => {
  if (options) {
    const error = validateTPInit(options)

    if (error) {
      throw error
    }
  }

  const app = mountTransactionPreview(options)

  return get(options)
}

// eslint-disable-next-line max-len
const mountTransactionPreview = (
  transactionPreviewOptions: TransactionPreviewInitOptions,
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
        /* COLORS */
        
        /* FONTS */


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
  }

  const containerElementQuery =
    transactionPreviewOptions.containerElement || 'body'

  const containerElement = document.querySelector(containerElementQuery)

  if (!containerElement) {
    throw new Error(
      `Element with query ${containerElementQuery} does not exist.`
    )
  }

  containerElement.appendChild(transactionPreviewDomElement)

  const app = new TransactionPreview({
    target: target,
    props: {
      transactionPreviewOptions,
    }
  })

  return app
}

export default transactionPreview
