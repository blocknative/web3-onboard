import 'regenerator-runtime/runtime'

import { get } from 'svelte/store'

import Onboard from './views/Onboard.svelte'

import {
  app,
  address,
  network,
  balance,
  wallet,
  state,
  walletInterface,
  resetWalletState,
  initializeStores
} from './stores'

import { getDeviceInfo } from './utilities'
import { validateInit, validateConfig, isWalletInit } from './validation'

import { version } from '../package.json'

import {
  Initialization,
  AppState,
  API,
  ConfigOptions,
  UserState,
  Wallet,
  WalletInitOptions
} from './interfaces'

import initializeModules from './modules'

let onboard: any

function init(initialization: Initialization): API {
  if (typeof window === 'undefined') {
    console.warn(
      'Onboard.js must be run in a browser environment. If you are utilizing server side rendering you can ignore this warning.'
    )

    const stubbedAPI = {
      walletSelect: () => Promise.resolve(false),
      walletCheck: () => Promise.resolve(false),
      walletReset: () => {},
      config: () => {},
      getState: () => get(state),
      accountSelect: () => Promise.resolve(false)
    }

    return stubbedAPI
  }

  if (onboard) {
    console.warn(
      'Initializing Onboard and destroying previously initialized instance.'
    )
    onboard.$destroy()
  }

  validateInit(initialization)

  const {
    subscriptions,
    dappId,
    networkId,
    networkName,
    darkMode,
    apiUrl,
    hideBranding,
    blockPollingInterval = 4000
  } = initialization

  const { os, browser, isMobile } = getDeviceInfo()

  const initializedModules = initializeModules(
    networkId,
    initialization.walletSelect,
    initialization.walletCheck,
    isMobile
  )

  let displayBranding: boolean

  if (dappId) {
    if (hideBranding !== false) {
      displayBranding = false
    } else {
      displayBranding = true
    }
  } else {
    if (hideBranding !== true) {
      displayBranding = true
    } else {
      displayBranding = false
    }
  }

  app.update((store: AppState) => ({
    ...store,
    dappId,
    apiUrl,
    networkId,
    networkName,
    version,
    mobileDevice: isMobile,
    os,
    browser,
    darkMode,
    displayBranding,
    checkModules: initializedModules.walletCheck,
    blockPollingInterval,
    agreement: initialization.walletSelect?.agreement || null
  }))

  initializeStores()

  onboard = new Onboard({
    target: document.body,
    props: {
      walletSelectModule: initializedModules.walletSelect,
      walletSelect
    }
  })

  // register subscriptions
  if (subscriptions) {
    if (subscriptions.address) {
      address.subscribe((address: string | null) => {
        if (address !== null) {
          subscriptions.address && subscriptions.address(address)
        }
      })
    }

    if (subscriptions.network) {
      network.subscribe((networkId: number | null) => {
        if (networkId !== null) {
          subscriptions.network && subscriptions.network(networkId)
        }
      })
    }

    if (subscriptions.balance) {
      balance.subscribe((balance: string) => {
        if (balance !== null) {
          subscriptions.balance && subscriptions.balance(balance)
        }
      })
    }

    if (subscriptions.wallet) {
      wallet.subscribe((wallet: Wallet) => {
        if (wallet.provider !== null) {
          subscriptions.wallet && subscriptions.wallet(wallet)
        }
      })
    }
  }

  function walletSelect(autoSelectWallet?: string): Promise<boolean> {
    return new Promise(resolve => {
      app.update((store: AppState) => ({
        ...store,
        walletSelectInProgress: true,
        autoSelectWallet:
          typeof autoSelectWallet === 'string' && autoSelectWallet
      }))

      const appUnsubscribe = app.subscribe((store: AppState) => {
        const {
          walletSelectInProgress,
          walletSelectCompleted,
          walletSelectDisplayedUI
        } = store

        if (walletSelectInProgress === false) {
          appUnsubscribe()

          // timeout for UI transitions if it was displayed
          walletSelectDisplayedUI
            ? setTimeout(() => {
                resolve(walletSelectCompleted)
                app.update(store => ({ ...store, displayedUI: false }))
              }, 500)
            : resolve(walletSelectCompleted)
        }
      })
    })
  }

  function walletCheck(): Promise<boolean> {
    return new Promise(resolve => {
      if (!get(walletInterface)) {
        throw new Error('walletSelect must be called before walletCheck')
      }

      app.update((store: AppState) => ({
        ...store,
        walletCheckInProgress: true
      }))

      const appUnsubscribe = app.subscribe((store: AppState) => {
        const {
          walletCheckInProgress,
          walletCheckCompleted,
          walletCheckDisplayedUI,
          switchingWallets
        } = store

        if (!switchingWallets && walletCheckInProgress === false) {
          appUnsubscribe()
          walletCheckDisplayedUI
            ? setTimeout(() => {
                resolve(walletCheckCompleted)
                app.update(store => ({ ...store, displayedUI: false }))
              }, 500)
            : resolve(walletCheckCompleted)
        }
      })
    })
  }

  function walletReset(): void {
    resetWalletState()
  }

  function accountSelect(): Promise<boolean> {
    return new Promise(resolve => {
      const { type } = get(wallet)
      if (type !== 'hardware') {
        resolve(false)
      }

      app.update((store: AppState) => ({
        ...store,
        accountSelectInProgress: true
      }))

      const appUnsubscribe = app.subscribe((store: AppState) => {
        const { accountSelectInProgress, walletSelectDisplayedUI } = store
        if (accountSelectInProgress === false) {
          appUnsubscribe()
          walletSelectDisplayedUI
            ? setTimeout(() => {
                resolve(true)
                app.update(store => ({ ...store, displayedUI: false }))
              }, 500)
            : resolve(true)
        }
      })
    })
  }

  function config(options: ConfigOptions): void {
    validateConfig(options)
    app.update((store: AppState) => ({ ...store, ...options }))
  }

  function getState(): UserState {
    return get(state)
  }

  // Find the Gnosis wallet from the wallet init options. Ignore it
  // if it is a wallet module. We need to get the wallet init first
  // in order to determine the wallet name: `walletName` or `label`.
  const {
    // If label is undefined set it to 'Gnosis Safe'
    label: gnosisWalletName = 'Gnosis Safe'
  } = (initialization.walletSelect?.wallets?.find(
    wallet => isWalletInit(wallet) && wallet.walletName === 'gnosis'
  ) || {}) as WalletInitOptions

  if (gnosisWalletName) {
    import('./modules/select/wallets/gnosis').then(
      ({ checkGnosisSafeContext }) =>
        checkGnosisSafeContext(() => walletSelect(gnosisWalletName))
    )
  }

  return {
    walletSelect,
    walletCheck,
    walletReset,
    config,
    getState,
    accountSelect
  }
}

export default init
