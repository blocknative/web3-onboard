import { firstValueFrom, Subject } from 'rxjs'
import {
  EthSignTransactionRequest,
  ProviderRpcError,
  ProviderRpcErrorCode,
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

import {
  validateSetContainerEl,
  validateSimTransactions,
  validateTPInit
} from './validation'
import TransactionPreview from './views/Index.svelte'
import initI18N from './i18n/index.js'
import simulateTransactions from './simulateTransactions.js'

export * from './types.js'

const approved$ = new Subject<boolean>()
let options: TransactionPreviewInitOptions
let app: TransactionPreview

export const setContainerElement = (containerElement: string): void => {
  if (containerElement) {
    const error = validateSetContainerEl(containerElement)

    if (error) {
      throw error
    }
  }
  options.containerElement = containerElement
}

const destroyApp = () => {
  app.$destroy()
}

const simTransactions = (
  txs: [TransactionObject]
): Promise<SimPlatformResponse> => {
  if (txs) {
    const error = validateSimTransactions(txs)

    if (error) {
      throw error
    }
  }
  return simulateTransactions(options, txs)
}

const handleRequireApproval = async (
  app: TransactionPreview,
  fullProviderRequest: EIP1193Provider['request'],
  req: {
    method: string
    params?: Array<unknown>
  }
) => {
  const approved = await firstValueFrom(approved$)
  app.$destroy()
  if (!approved) {
    throw new ProviderRpcError({
      code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
      message: 'User rejected the transaction'
    })
  }
  fullProviderRequest(req)
}

export const patchProvider = (
  walletProvider: PatchedEIP1193Provider
): PatchedEIP1193Provider => {
  if (!walletProvider) {
    throw new Error(
      `An EIP 1193 wallet provider is required to preform patching and 
      watch for transactions e.g. an injected wallet using window.ethereum`
    )
  }
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
      try {
        const preview = await simulateTransactions(options, transactionParams)
        if (preview.status !== 'simulated') {
          // If transaction simulation was unsuccessful do not create DOM el
          return fullProviderRequest(req)
        }
        if (app) app.$destroy()
        app = mountTransactionPreview(preview)
        options.requireTransactionApproval
          ? handleRequireApproval(app, fullProviderRequest, req)
          : fullProviderRequest(req)
              .then(() => {
                app.$destroy()
              })
              .catch(() => app.$destroy())
      } catch (e) {
        if (app) app.$destroy()
        throw new ProviderRpcError({
          code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
          message: `User rejected the transaction: ${e}`
        })
      }
    } else {
      return fullProviderRequest(req)
    }
  }
  try {
    patchedProvider.request = request
    patchedProvider.simPatched = true
  } catch (err) {
    console.error(
      `There was an error patching the passed in wallet provider. 
      The provider may be read only and may be incompatible with Transaction Preview`
    )
  }
  return patchedProvider
}

const transactionPreview: TransactionPreviewModule = (
  initOptions: TransactionPreviewInitOptions
): TransactionPreviewAPI => {
  if (initOptions) {
    const error = validateTPInit(initOptions)

    if (error) {
      throw error
    }
  }
  const { i18n, containerElement } = initOptions
  options = initOptions

  initI18N(i18n)

  return {
    patchProvider,
    simTransactions,
    setContainerElement,
    containerElement
  }
}

const mountTransactionPreview = (simResponse: SimPlatformResponse) => {
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
  const { requireTransactionApproval } = options

  const app = new TransactionPreview({
    target,
    intro: true,
    props: {
      simResponse,
      requireTransactionApproval,
      approved$,
      destroyApp
    }
  })

  return app
}

export default transactionPreview
