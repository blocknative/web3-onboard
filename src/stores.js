import { writable } from "svelte/store"
import { validateWalletInterface } from "./validation"

export const app = writable({
  dappId: null,
  networkId: null,
  version: null,
  selectWallet: false,
  selectWalletCompleted: false,
  prepareWallet: false,
  prepareWalletCompleted: false,
  modules: null
})

export const configuration = writable({
  darkMode: false
})

export let syncingState = false

export const address = createUserStateStore("address")
export const network = createUserStateStore("network")
export const balance = createUserStateStore("balance")
export const provider = writable(null)

export const state = createState({
  mobileDevice: null,
  walletName: null,
  address: null,
  network: null,
  balance: null,
  connect: null,
  provider: null
})

// make sure state store is updated when any of these change
address.subscribe(value => state.update({ address: value }))
network.subscribe(value => state.update({ network: value }))
balance.subscribe(value => state.update({ balance: value }))
provider.subscribe(value => state.update({ provider: value }))

// keep track of intervals that are syncing state so they can be cleared
let currentSyncerIntervals = []

export const walletInterface = createWalletInterfaceStore(null)

walletInterface.subscribe(wallet => {
  if (wallet) {
    // clear all current intervals if they exist
    currentSyncerIntervals.forEach(
      clearInterval => clearInterval && clearInterval()
    )

    // start syncing state and save intervals
    currentSyncerIntervals = [
      address.setStateSyncer(wallet.address),
      network.setStateSyncer(wallet.network),
      balance.setStateSyncer(wallet.balance)
    ]

    state.update({ connect: wallet.connect, walletName: wallet.name })
  }
})

function createState(initialState) {
  let state = initialState
  let subscribers = []

  return {
    get: () => state,
    subscribe: func => {
      if (!func) return
      subscribers.push(func)
      return () => {
        subscribers = subscribers.filter(f => f !== func)
      }
    },
    update: newState => {
      state = { ...state, ...newState }
      subscribers.forEach(sub => sub(state))

      return state
    }
  }
}

function createWalletInterfaceStore(initialState) {
  const { subscribe, set } = writable(initialState)

  return {
    subscribe,
    set: walletInterface => {
      validateWalletInterface(walletInterface)
      set(walletInterface)
    }
  }
}

function createUserStateStore(parameter) {
  const { subscribe, set } = writable(null)

  return {
    subscribe,
    setStateSyncer: stateSyncer => {
      if (!stateSyncer || typeof stateSyncer !== "object") {
        throw new Error("setStateSyncer must be called with a valid interface")
      }

      if (stateSyncer.onChange) {
        stateSyncer.onChange(set)
        return
      }

      if (stateSyncer.get) {
        const interval = setInterval(() => {
          stateSyncer
            .get()
            .then(set)
            .catch(err => {
              throw new Error(
                `Error getting ${parameter} from state syncer: ${err}`
              )
            })
        }, 250)

        return () => clearInterval(interval)
      }
    }
  }
}
