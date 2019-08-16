import { writable, derived } from "svelte/store"
import { validateProviderInterface } from "./validation"

export const app = writable({
  dappId: null,
  networkId: null,
  version: null,
  selectWallet: false,
  prepareWallet: false,
  modules: null
})

export let syncingState = false

export const address = createUserStateStore("address")
export const network = createUserStateStore("network")
export const balance = createBalanceStore()

export const onboard = writable({
  inProgress: false,
  activeModal: false,
  completed: false,
  exited: false
})

export const state = createState({
  mobileDevice: null,
  walletName: null,
  address: null,
  network: null,
  balance: null,
  connect: null
})

address.subscribe(value => state.update({ address: value }))
network.subscribe(value => state.update({ network: value }))
balance.subscribe(value => state.update({ balance: value }))

let currentSyncerIntervals = []

export const providerInterface = createProviderInterfaceStore(null)
providerInterface.subscribe(provider => {
  if (provider) {
    // clear all current intervals if they exist
    currentSyncerIntervals.forEach(
      clearInterval => clearInterval && clearInterval()
    )

    // start syncing state and save intervals
    currentSyncerIntervals = [
      address.setStateSyncer(provider.address),
      network.setStateSyncer(provider.network),
      balance.setStateSyncer(provider.balance)
    ]

    state.update({ connect: provider.connect, walletName: provider.name })
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

function createProviderInterfaceStore(initialState) {
  const { subscribe, set } = writable(initialState)

  return {
    subscribe,
    set: providerInterface => {
      validateProviderInterface(providerInterface)
      set(providerInterface)
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

function createBalanceStore() {
  let stateSyncer
  const { subscribe } = derived(
    [address, network],
    ([$address, $network], set) => {
      if (stateSyncer) {
        const syncProm = stateSyncer.get()
        syncingState = syncProm
        syncProm
          .then(result => {
            set(result)
            syncingState = false
          })
          .catch(err => {
            throw new Error(`Error getting balance from state syncer: ${err}`)
          })
      }
    }
  )

  return {
    subscribe,
    setStateSyncer: syncer => {
      if (!syncer || typeof syncer !== "object") {
        throw new Error("setStateSyncer must be called with a valid interface")
      }

      stateSyncer = syncer
    }
  }
}
