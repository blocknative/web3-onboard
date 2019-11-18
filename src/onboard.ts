import 'regenerator-runtime/runtime'

import { get } from 'svelte/store'

import modules from './modules'
import Onboard from './views/Onboard.svelte'

import {
  app,
  address,
  network,
  balance,
  wallet,
  state,
  walletInterface
} from './stores'

import { isMobileDevice } from './utilities'
import { initializeBlocknative } from './services'
import { validateInit, validateConfig } from './validation'

import { version } from '../package.json'

import {
  Initialization,
  AppState,
  API,
  ConfigOptions,
  UserState,
  Wallet
} from './interfaces'

function init(initialization: Initialization): API {
  validateInit(initialization)

  const { subscriptions, dappId, networkId, modules } = initialization

  initializeBlocknative(dappId, networkId)

  app.update((store: AppState) => ({
    ...store,
    dappId,
    networkId,
    version,
    mobileDevice: isMobileDevice()
  }))

  new Onboard({
    target: document.body,
    props: {
      walletSelectModule: modules.walletSelect,
      walletCheckModules: modules.walletCheck,
      walletSelect
    }
  })

  // register subscriptions
  if (subscriptions) {
    if (subscriptions.address) {
      address.subscribe((address: string | null) => {
        if (address !== null) {
          subscriptions.address(address)
        }
      })
    }

    if (subscriptions.network) {
      network.subscribe((networkId: number | null) => {
        networkId && subscriptions.network(networkId)
      })
    }

    if (subscriptions.balance) {
      balance.subscribe((balance: string) => {
        if (balance !== null) {
          subscriptions.balance(balance)
        }
      })
    }

    if (subscriptions.wallet) {
      wallet.subscribe((wallet: Wallet) => {
        wallet.provider && subscriptions.wallet(wallet)
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
        const { walletSelectInProgress, walletSelectCompleted } = store
        if (walletSelectInProgress === false) {
          appUnsubscribe()
          setTimeout(() => resolve(walletSelectCompleted), 500)
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
        const { walletCheckInProgress, walletCheckCompleted } = store
        if (walletCheckInProgress === false) {
          appUnsubscribe()
          setTimeout(() => resolve(walletCheckCompleted), 500)
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

  return { walletSelect, walletCheck, config, getState }
}

export default {
  init,
  modules
}
