import blocknativeApi from "bn-sdk"
import Onboard from "./views/Onboard.svelte"
import { app, address, network, balance, provider } from "./stores"
import { selectWallet, prepareWallet, config, getState } from "./api"
import { validateInit } from "./validation"
import { getUserAgent } from "./utilities"

function init(initialization) {
  getUserAgent()

  validateInit(initialization)

  const { subscriptions, ...rest } = initialization

  app.update(store => ({
    ...store,
    ...rest,
    blocknative: new blocknativeApi({
      dappId: initialization.dappId,
      networkId: initialization.networkId
    })
  }))

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

  return { selectWallet, prepareWallet, config, getState }
}

export default init
