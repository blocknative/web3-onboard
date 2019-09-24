import { writable, derived } from "svelte/store"
import Cancelable from "promise-cancelable"
import { validateWalletInterface } from "./validation"
import { getBlocknative } from "./services"

export const app = writable({
  dappId: null,
  networkId: null,
  version: null,
  selectWallet: false,
  selectWalletCompleted: false,
  prepareWallet: false,
  prepareWalletCompleted: false,
  modules: null,
  blocknative: null,
  darkMode: false
})

export const balanceSyncStatus = {
  syncing: false,
  error: false
}

export const address = createUserStateStore("address")
export const network = createUserStateStore("network")
export const balance = createBalanceStore()
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
    // reset state
    address.reset()
    network.reset()

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
  const { subscribe, set, update } = writable(initialState)

  return {
    subscribe,
    update,
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
    reset: () => set(null),
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
        }, 200)

        return () => clearInterval(interval)
      }
    }
  }
}

function createBalanceStore() {
  let stateSyncer
  let emitter

  const { subscribe } = derived([address, network], ([$address], set) => {
    if (stateSyncer) {
      if ($address) {
        syncState(stateSyncer.get, set)

        emitter = getBlocknative().account($address).emitter
        emitter.on("txConfirmed", () => {
          syncState(stateSyncer.get, set)
          return false
        })
        emitter.on("all", () => false)
      } else {
        // no address, so set balance back to null
        set(null)
      }
    }
  })

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

function syncState(func, set) {
  const prom = makeQuerablePromise(
    new Cancelable((resolve, reject, onCancel) => {
      func().then(resolve)

      onCancel(() => {
        balanceSyncStatus.error =
          "There was a problem getting the balance of this wallet"
      })
    })
  )

  balanceSyncStatus.syncing = prom

  prom
    .then(result => {
      if (result) {
        set(result)
      }
    })
    .catch(() => {})

  const timedOut = wait(2000)

  timedOut.then(() => {
    if (!prom.isFulfilled()) {
      console.log("CANCELING GET BALANCE CALL")
      prom.cancel()
    }
  })
}

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function makeQuerablePromise(promise) {
  let isResolved = false
  let isRejected = false

  const result = promise.then(
    function(v) {
      isResolved = true
      return v
    },
    function(e) {
      isRejected = true
      throw e
    }
  )
  result.isFulfilled = function() {
    return isResolved || isRejected
  }
  result.isResolved = function() {
    return isResolved
  }
  result.isRejected = function() {
    return isRejected
  }
  return result
}
