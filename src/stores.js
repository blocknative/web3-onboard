import { writable, derived } from "svelte/store"
import Cancelable from "promise-cancelable"
import { getBlocknative } from "./services"
import { wait, makeQuerablePromise } from "./utilities"

export const app = writable({
  dappId: null,
  networkId: null,
  version: null,
  mobileDevice: null,
  darkMode: false,
  walletSelectInProgress: false,
  walletSelectCompleted: false,
  walletReadyInProgress: false,
  walletReadyCompleted: false
})

export const balanceSyncStatus = {
  syncing: false,
  error: false
}

export const address = createUserStateStore("address")
export const network = createUserStateStore("network")
export const balance = createBalanceStore()
export const wallet = writable({
  name: null,
  provider: null,
  connect: null
})

export const state = derived(
  [address, network, balance, wallet, app],
  ([$address, $network, $balance, $wallet, $app]) => {
    return {
      address: $address,
      network: $network,
      balance: $balance,
      wallet: $wallet,
      mobileDevice: $app.mobileDevice
    }
  }
)

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
  }
})

function createWalletInterfaceStore(initialState) {
  const { subscribe, set, update } = writable(initialState)

  return {
    subscribe,
    update,
    set: walletInterface => {
      // validateWalletInterface(walletInterface)
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
      console.log("CANCELING GET BALANCE CALL DUE TO TIMEOUT")
      prom.cancel()
    }
  })
}
