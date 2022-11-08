import {
  EthSignTransactionRequest,
  SofiaProLight,
  SofiaProRegular
} from '@web3-onboard/common'
import type {
  PatchedEIP1193Provider,
  SimPlatformResponse,
  TransactionPreviewInitOptions,
  TransactionPreviewModule,
  TransactionPreviewAPI,
  TransactionObject
} from './types.js'
import type { EIP1193Provider } from '@web3-onboard/common'

import { validateTPInit } from './validation'
import TransactionPreview from './views/Index.svelte'
import initI18N from './i18n/index.js'
import simulateTransactions from './simulateTransactions.js'

export * from './types.js'

let options: TransactionPreviewInitOptions

export const setContainerElement = (containerElement: string): void => {
  options.containerElement = containerElement
}

const simTransactions = (
  txs: [TransactionObject]
): Promise<SimPlatformResponse> => {
  return simulateTransactions(options, txs)
}

export const patchProvider = (
  walletProvider: PatchedEIP1193Provider
): PatchedEIP1193Provider => {
  if (walletProvider.simPatched) return walletProvider as PatchedEIP1193Provider

  const fullProviderRequest = walletProvider.request
  const patchedProvider = walletProvider as PatchedEIP1193Provider
  const request: EIP1193Provider['request'] = async (req: {
    method: string
    params?: Array<unknown>
  }): Promise<any> => {
    if (
      req.method === 'eth_sendTransaction' &&
      req.params &&
      req.params.length
    ) {
      const transactionParams =
        req.params as EthSignTransactionRequest['params']
      if (transactionParams) {
        try {
          simulateTransactions(options, transactionParams).then(preview => {
            if (preview.status !== 'simulated') {
              // If transaction simulation was unsuccessful do not create DOM el
              return
            }
            const app = mountTransactionPreview(preview)
            fullProviderRequest(req)
              .then((hash: unknown) => {
                hash && app.$destroy()
              })
              .catch(() => {
                app.$destroy()
              })
          })
        } catch (e) {
          console.error('Error simulating transaction: ', e)
        }
      }
    }
    return fullProviderRequest(req)
  }
  patchedProvider.request = request
  patchedProvider.simPatched = true
  return patchedProvider
}

const transactionPreview: TransactionPreviewModule = (
  initOptions: TransactionPreviewInitOptions
): TransactionPreviewAPI => {
  const { i18n, containerElement } = initOptions
  if (initOptions) {
    const error = validateTPInit(initOptions)

    if (error) {
      throw error
    }
  }
  options = initOptions

  initI18N(i18n)

  return {
    patchProvider,
    simTransactions,
    containerElement: containerElement,
    setContainerElement
  }
}

const mountTransactionPreview = (simResponse: SimPlatformResponse) => {
  console.log(simResponse)
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
  const getW3OEl = document.querySelector('onboard-v2')

  const containerElementQuery = options.containerElement || 'body'

  let containerEl: Element | null
  // If Onboard present copy stylesheets over to TransactionPreview shadow DOM
  if (getW3OEl && getW3OEl.shadowRoot) {
    const w3OStyleSheets = getW3OEl.shadowRoot.styleSheets
    const transactionPreviewStyleSheet = new CSSStyleSheet()

    Object.values(w3OStyleSheets).forEach(sheet => {
      const styleRules = Object.values(sheet.cssRules)
      styleRules.forEach(rule =>
        transactionPreviewStyleSheet.insertRule(rule.cssText)
      )
    })

    //@ts-ignore
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
    target,
    props: {
      simResponse
    }
  })

  return app
}

export default transactionPreview
