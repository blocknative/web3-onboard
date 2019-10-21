import "regenerator-runtime/runtime"
import { get } from "svelte/store"

import modules from "./modules"

import Onboard from "./views/Onboard.svelte"

import {
  app,
  address,
  network,
  balance,
  wallet,
  state,
  walletInterface
} from "./stores"

import { isMobileDevice } from "./utilities"
import { initializeBlocknative } from "./services"

import { version } from "../package.json"

function init(initialization) {
  // validateInit(initialization)

  const { subscriptions, dappId, networkId, modules } = initialization

  initializeBlocknative(dappId, networkId)

  app.update(store => ({
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
      walletReadyModules: modules.walletReady,
      walletSelect
    }
  })

  // register subscriptions
  if (subscriptions) {
    if (subscriptions.address) {
      address.subscribe(subscriptions.address)
    }

    if (subscriptions.network) {
      network.subscribe(subscriptions.network)
    }

    if (subscriptions.balance) {
      balance.subscribe(subscriptions.balance)
    }

    if (subscriptions.wallet) {
      wallet.subscribe(subscriptions.wallet)
    }
  }

  function walletSelect(autoSelectWallet) {
    return new Promise(resolve => {
      app.update(store => ({
        ...store,
        walletSelectInProgress: true,
        autoSelectWallet:
          typeof autoSelectWallet === "string" && autoSelectWallet
      }))

      const appUnsubscribe = app.subscribe(
        ({ walletSelectInProgress, walletSelectCompleted }) => {
          if (walletSelectInProgress === false) {
            appUnsubscribe()
            setTimeout(() => resolve(walletSelectCompleted), 500)
          }
        }
      )
    })
  }

  function walletReady() {
    return new Promise(resolve => {
      if (!get(walletInterface)) {
        throw new Error("walletSelect must be called before walletReady")
      }

      app.update(store => ({
        ...store,
        walletReadyInProgress: true
      }))

      const appUnsubscribe = app.subscribe(
        ({ walletReadyInProgress, walletReadyCompleted }) => {
          if (walletReadyInProgress === false) {
            appUnsubscribe()
            setTimeout(() => resolve(walletReadyCompleted), 500)
          }
        }
      )
    })
  }

  function config(options) {
    // validateConfig(options)
    app.update(store => ({ ...store, ...options }))
  }

  function getState() {
    return get(state)
  }

  return { walletSelect, walletReady, config, getState }
}

export default {
  init,
  modules
}
