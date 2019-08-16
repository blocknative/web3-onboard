import Onboard from "./Onboard.svelte"

import { app, address, network, balance, providerInterface } from "./stores"
import { validateConfig } from "./validation"
import { getUserAgent } from "./utilities"

function init(config) {
  // get the user agent
  getUserAgent()

  // validate config
  // validateConfig(config)

  const { subscriptions, ...rest } = config

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
  }

  return { selectWallet, prepareWallet }
}

function selectWallet() {
  return new Promise(resolve => {
    app.update(store => ({ ...store, selectWallet: true }))
    app.subscribe(({ selectWallet }) => {
      if (selectWallet === false) {
        resolve()
      }
    })
  })
}

function prepareWallet() {
  return new Promise(resolve => {
    providerInterface.subscribe(provider => {
      if (!provider) {
        throw new Error("selectWallet must be called before prepareWallet")
      }
    })

    app.update(store => ({ ...store, prepareWallet: true }))
    app.subscribe(({ prepareWallet, prepareWalletCompleted }) => {
      if (prepareWallet === false) {
        resolve(prepareWalletCompleted ? true : false)
      }
    })
  })
}

export default { init }
