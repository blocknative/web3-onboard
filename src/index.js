import Onboard from "./views/Onboard.svelte"

import {
  app,
  configuration,
  address,
  network,
  balance,
  walletInterface,
  provider
} from "./stores"
import { validateInit, validateConfig } from "./validation"
import { getUserAgent } from "./utilities"

function init(initialization) {
  getUserAgent()

  validateInit(initialization)

  const { subscriptions, ...rest } = initialization

  app.update(store => ({ ...store, ...rest }))

  // mount assist to the DOM
  new Onboard({
    target: document.body
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

    if (subscriptions.provider) {
      provider.subscribe(subscriptions.provider)
    }
  }

  return { selectWallet, prepareWallet, config }
}

export function selectWallet() {
  return new Promise(resolve => {
    app.update(store => ({ ...store, selectWallet: true }))

    const appUnsubscribe = app.subscribe(
      ({ selectWallet, selectWalletCompleted }) => {
        if (selectWallet === false) {
          appUnsubscribe()
          resolve(selectWalletCompleted)
        }
      }
    )
  })
}

function prepareWallet() {
  return new Promise(resolve => {
    const walletUnsubscribe = walletInterface.subscribe(provider => {
      if (!provider) {
        walletUnsubscribe()
        throw new Error("selectWallet must be called before prepareWallet")
      }
    })

    app.update(store => ({ ...store, prepareWallet: true }))

    const appUnsubscribe = app.subscribe(
      ({ prepareWallet, prepareWalletCompleted }) => {
        if (prepareWallet === false) {
          appUnsubscribe()
          resolve(prepareWalletCompleted)
        }
      }
    )
  })
}

function config(options) {
  validateConfig(options)
  configuration.update(store => ({ ...store, ...options }))
}

export default { init }
