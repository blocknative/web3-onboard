import "regenerator-runtime/runtime"

import Onboard from "./views/Onboard.svelte"
import { app, address, network, balance, provider } from "./stores"
import { selectWallet, prepareWallet, config, getState } from "./api"
import { validateInit } from "./validation"
import { getUserAgent } from "./utilities"
import { initializeBlocknative } from "./services"

function init(initialization) {
  getUserAgent()

  validateInit(initialization)

  const { subscriptions, ...rest } = initialization

  initializeBlocknative(initialization.dappId, initialization.networkId)

  app.update(store => ({
    ...store,
    ...rest
  }))

  new Onboard({
    target: document.body,
    props: {
      onboardingModules: initialization.modules.prepareWallet
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

    if (subscriptions.provider) {
      provider.subscribe(subscriptions.provider)
    }
  }

  return { selectWallet, prepareWallet, config, getState }
}

export default init
