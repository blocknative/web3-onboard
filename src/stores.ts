import { Emitter } from 'bnc-sdk/dist/types/src/interfaces'
import { writable, derived, get } from 'svelte/store'
import { getBlocknative } from './services'
import { wait, makeCancelable, createInterval } from './utilities'
import { validateWalletInterface, validateType } from './validation'
import {
  WritableStore,
  ReadableStore,
  WalletInterfaceStore,
  WalletInterface,
  WalletStateSliceStore,
  StateSyncer,
  BalanceStore,
  CancelablePromise,
  WalletCheckModule
} from './interfaces'

export const app: WritableStore = writable({
  dappId: '',
  apiUrl: '',
  networkId: 1,
  networkName: '',
  version: '',
  mobileDevice: false,
  os: '',
  darkMode: false,
  walletSelectInProgress: false,
  walletSelectCompleted: false,
  walletCheckInProgress: false,
  walletCheckCompleted: false,
  accountSelectInProgress: false,
  autoSelectWallet: '',
  checkModules: [],
  walletSelectDisplayedUI: false,
  walletCheckDisplayedUI: false,
  displayBranding: false,
  blockPollingInterval: 4000
})

export const stateSyncStatus: {
  [key: string]:
    | null
    | CancelablePromise
    | Promise<Array<string>>
    | Promise<string>
    | Promise<void>
  balance: null | CancelablePromise
  address: null | Promise<Array<string>>
  network: null | Promise<string>
} = {
  balance: null,
  address: null,
  network: null
}

export let address: WalletStateSliceStore
export let network: WalletStateSliceStore
export let balance: BalanceStore | WalletStateSliceStore
export let wallet: WritableStore
export let state: ReadableStore
export let walletInterface: WalletInterfaceStore

let currentSyncerIntervals: ({ clear: () => void } | undefined)[]

export function initializeStores() {
  address = createWalletStateSliceStore({
    parameter: 'address',
    initialState: null
  })

  network = createWalletStateSliceStore({
    parameter: 'network',
    initialState: null
  })

  balance = get(app).dappId
    ? createBalanceStore(null)
    : createWalletStateSliceStore({
        parameter: 'balance',
        initialState: null,
        intervalSetting: 1000
      })

  wallet = writable({
    name: null,
    provider: null,
    connect: null,
    instance: null,
    dashboard: null,
    type: null
  })

  state = derived(
    [address, network, balance, wallet, app],
    ([$address, $network, $balance, $wallet, $app]) => {
      return {
        address: $address,
        network: $network,
        balance: $balance,
        wallet: $wallet,
        mobileDevice: $app.mobileDevice,
        appNetworkId: $app.networkId
      }
    }
  )

  currentSyncerIntervals = []

  walletInterface = createWalletInterfaceStore(null)
  walletInterface.subscribe((walletInterface: WalletInterface | null) => {
    // make sure that stores have been initialized
    if (state) {
      // clear all current intervals if they exist
      currentSyncerIntervals.forEach(
        (interval: { clear: () => void } | undefined) =>
          interval && interval.clear()
      )

      const currentState = get(state)

      // reset state
      currentState.balance && balance.reset()
      currentState.address && address.reset()
      currentState.network && network.reset()

      if (walletInterface) {
        // start syncing state and save intervals
        currentSyncerIntervals = [
          address.setStateSyncer(walletInterface.address),
          network.setStateSyncer(walletInterface.network),
          balance.setStateSyncer(walletInterface.balance)
        ]
      }

      resetCheckModules()
    }
  })
}

export function resetWalletState(options?: {
  disconnected: boolean
  walletName: string
}) {
  walletInterface.update((currentInterface: WalletInterface | null) => {
    // no interface then don't do anything
    if (!currentInterface) {
      return currentInterface
    }

    // no options object, so do a full reset by disconnecting and setting interface to null
    if (!options) {
      wallet.update(() => ({
        name: undefined,
        provider: undefined,
        connect: undefined,
        instance: undefined,
        dashboard: undefined,
        type: undefined
      }))

      currentInterface.disconnect && currentInterface.disconnect()

      return null
    }

    const { walletName, disconnected } = options

    // if walletName is the same as the current interface name then do a full reset (checking if to do a disconnect)
    if (currentInterface.name === walletName) {
      wallet.update(() => ({
        name: undefined,
        provider: undefined,
        connect: undefined,
        instance: undefined,
        dashboard: undefined
      }))

      !disconnected &&
        currentInterface.disconnect &&
        currentInterface.disconnect()

      return null
    }

    return currentInterface
  })

  resetCheckModules()

  app.update(store => {
    return {
      ...store,
      walletSelectInProgress: false,
      walletSelectCompleted: false
    }
  })
}

function resetCheckModules() {
  const { checkModules } = get(app)
  if (Array.isArray(checkModules)) {
    checkModules.forEach((m: WalletCheckModule) => m.reset && m.reset())
  }
}

function createWalletInterfaceStore(
  initialState: null | WalletInterface
): WalletInterfaceStore {
  const { subscribe, set, update } = writable(initialState)

  return {
    subscribe,
    update,
    set: (walletInterface: WalletInterface | null) => {
      if (walletInterface) {
        validateWalletInterface(walletInterface)
      }
      set(walletInterface)
    }
  }
}

function createWalletStateSliceStore(options: {
  parameter: string
  initialState: string | number | null | undefined
  intervalSetting?: number
}): WalletStateSliceStore {
  const { parameter, initialState, intervalSetting } = options
  const { subscribe, set } = writable(initialState)

  let currentState: string | number | null | undefined
  subscribe(store => {
    currentState = store
  })

  return {
    subscribe,
    reset: () => {
      set(undefined)
    },
    get: () => currentState,
    setStateSyncer: (stateSyncer: StateSyncer) => {
      validateType({ name: 'stateSyncer', value: stateSyncer, type: 'object' })

      const { get, onChange } = stateSyncer

      validateType({
        name: `${parameter}.get`,
        value: get,
        type: 'function',
        optional: true
      })

      validateType({
        name: `${parameter}.onChange`,
        value: onChange,
        type: 'function',
        optional: true
      })

      if (onChange) {
        stateSyncStatus[parameter] = new Promise(resolve => {
          onChange(newVal => {
            resolve(undefined)
            if (newVal || currentState !== initialState) {
              set(newVal)
            }
          })
        })
        return
      }

      if (get) {
        const interval: any = createInterval(() => {
          stateSyncStatus[parameter] = get()
            .then(newVal => {
              stateSyncStatus[parameter] = null
              if (newVal || currentState !== initialState) {
                interval.status.active && set(newVal)
              }
            })
            .catch((err: any) => {
              console.warn(
                `Error getting ${parameter} from state syncer: ${err}`
              )
              stateSyncStatus[parameter] = null
            })
        }, intervalSetting || 200)

        return interval
      }
    }
  }
}

function createBalanceStore(initialState: string | null): BalanceStore {
  let stateSyncer: StateSyncer
  let emitter: any
  let emitterAddress: string | undefined
  let cancel: () => void = () => {}

  const { subscribe } = derived(
    [address, network],
    ([$address, $network]: string[], set: any) => {
      if (stateSyncer && !stateSyncer.onChange) {
        if ($address && $network && stateSyncer.get && set) {
          cancel = syncStateWithTimeout({
            getState: stateSyncer.get,
            setState: set,
            timeout: 2000,
            currentBalance: get(balance)
          })

          if (emitterAddress !== $address) {
            const blocknative = getBlocknative()

            // unsubscribe from previous address
            if (emitterAddress) {
              blocknative.unsubscribe(emitterAddress)
            }

            blocknative
              .configuration({
                scope: $address,
                filters: [{ status: 'confirmed' }],
                watchAddress: true
              })
              .then((result: { emitter: Emitter }) => {
                emitter = result.emitter

                emitter
                  .on('txConfirmed', () => {
                    if (stateSyncer.get) {
                      cancel = syncStateWithTimeout({
                        getState: stateSyncer.get,
                        setState: set,
                        timeout: 2000,
                        currentBalance: get(balance),
                        pollStart: Date.now()
                      })
                    }

                    return false
                  })
                  // swallow possible timeout error
                  .catch(() => {})

                emitterAddress = $address
              })
          }
        } else if (emitterAddress && !$address) {
          const blocknative = getBlocknative()

          // unsubscribe from previous address
          blocknative.unsubscribe(emitterAddress)

          // no address, so set balance to undefined
          set && set(undefined)
          emitterAddress = undefined
        }
      }

      set(initialState)
    }
  )

  let currentState: string | null
  subscribe((store: any) => {
    currentState = store
  })

  return {
    subscribe,
    get: () => currentState,
    setStateSyncer: (syncer: StateSyncer) => {
      validateType({ name: 'syncer', value: syncer, type: 'object' })

      const { get, onChange } = syncer

      validateType({
        name: 'balance.get',
        value: get,
        type: 'function',
        optional: true
      })

      validateType({
        name: 'balance.onChange',
        value: onChange,
        type: 'function',
        optional: true
      })

      stateSyncer = syncer

      return undefined
    },
    reset: cancel
  }
}

function syncStateWithTimeout(options: {
  getState: () => Promise<string | number | null>
  setState: (newState: string) => void
  timeout: number
  currentBalance: string
  pollStart?: number
}) {
  const { getState, setState, timeout, currentBalance, pollStart } = options

  if (pollStart && Date.now() - pollStart > 25000) {
    return () => {}
  }

  const prom = makeCancelable(getState())

  stateSyncStatus.balance = prom

  prom
    .then(async (result: string) => {
      if (result === currentBalance && pollStart) {
        await wait(350)
        syncStateWithTimeout(options)
      } else {
        stateSyncStatus.balance = null
        setState(result)
      }
    })
    .catch(() => {
      stateSyncStatus.balance = null
    })

  const timedOut = wait(timeout)

  timedOut.then(() => {
    prom.cancel()
  })

  return () => prom.cancel()
}
