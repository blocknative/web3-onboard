import { getBlocknative } from './services'
import { writable, derived, get } from 'svelte/store'
import debounce from 'lodash.debounce'
import { wait, makeCancelable } from './utilities'
import { validateWalletInterface, validateType } from './validation'
import {
  WritableStore,
  WalletInterfaceStore,
  WalletInterface,
  WalletStateSliceStore,
  StateSyncer,
  BalanceStore,
  CancelablePromise
} from './interfaces'

export const app: WritableStore = writable({
  dappId: '',
  networkId: 1,
  version: '',
  mobileDevice: false,
  os: '',
  darkMode: false,
  walletSelectInProgress: false,
  walletSelectCompleted: false,
  walletCheckInProgress: false,
  walletCheckCompleted: false,
  autoSelectWallet: ''
})

export const balanceSyncStatus: {
  syncing: null | CancelablePromise
  error: string
} = {
  syncing: null,
  error: ''
}

export const address: WalletStateSliceStore = createWalletStateSliceStore({
  parameter: 'address',
  initialState: null
})
export const network: WalletStateSliceStore = createWalletStateSliceStore({
  parameter: 'network',
  initialState: null
})
export const balance: BalanceStore = createBalanceStore(null)
export const wallet: WritableStore = writable({
  name: null,
  provider: null,
  connect: null,
  instance: null,
  url: null,
  loading: null
})

export const state = derived(
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

// keep track of intervals that are syncing state so they can be cleared
let currentSyncerIntervals: (number | undefined)[] = []

export const walletInterface: WalletInterfaceStore = createWalletInterfaceStore(
  null
)

walletInterface.subscribe((walletInterface: WalletInterface | null) => {
  // clear all current intervals if they exist
  currentSyncerIntervals.forEach(
    (interval: number | undefined) => interval && clearInterval(interval)
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
})

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
        url: undefined,
        loading: undefined
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
        url: undefined,
        loading: undefined
      }))

      disconnected &&
        currentInterface.disconnect &&
        currentInterface.disconnect()

      return null
    }

    return currentInterface
  })

  app.update(store => ({
    ...store,
    walletSelectInProgress: false,
    walletSelectCompleted: false,
    autoSelect: false
  }))
}

function createWalletInterfaceStore(
  initialState: null | WalletInterface
): WalletInterfaceStore {
  const { subscribe, set, update } = writable(initialState)

  return {
    subscribe,
    update,
    set: (walletInterface: WalletInterface) => {
      validateWalletInterface(walletInterface)
      set(walletInterface)
    }
  }
}

function createWalletStateSliceStore(options: {
  parameter: string
  initialState: string | number | null | undefined
}): WalletStateSliceStore {
  const { parameter, initialState } = options
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
        onChange(newVal => {
          if (newVal || currentState !== initialState) {
            set(newVal)
          }
        })
        return
      }

      if (get) {
        const interval: any = setInterval(() => {
          get()
            .then(newVal => {
              if (newVal || currentState !== initialState) {
                set(newVal)
              }
            })
            .catch((err: any) => {
              console.warn(
                `Error getting ${parameter} from state syncer: ${err}`
              )
            })
        }, 200)

        return interval
      }
    }
  }
}

function createBalanceStore(initialState: string | null): BalanceStore {
  let stateSyncer: StateSyncer
  let emitter: any
  let emitterAddress: String | undefined
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

            emitter = blocknative.account(blocknative.clientIndex, $address)
              .emitter

            emitter.on(
              'txConfirmed',
              debounce(() => {
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
              }, 500)
            )

            emitter.on('all', () => false)

            emitterAddress = $address
          }
        } else if (emitterAddress && !$address) {
          // no address, so set balance to undefined
          set && set(undefined)
          emitterAddress = undefined
        }
      }

      set(initialState)
    }
  )

  return {
    subscribe,
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

  balanceSyncStatus.syncing = prom

  prom
    .then(async (result: string) => {
      if (result === currentBalance && pollStart) {
        await wait(350)
        syncStateWithTimeout(options)
      } else {
        setState(result)
      }
    })
    .catch(() => {})

  const timedOut = wait(timeout)

  timedOut.then(() => {
    prom.cancel()
  })

  return () => prom.cancel()
}
