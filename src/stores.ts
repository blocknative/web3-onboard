import { getBlocknative } from './services'
import { writable, derived, get } from 'svelte/store'
import debounce from 'lodash.debounce'
import { wait, makeQueryablePromise, makeCancelable } from './utilities'
import { validateWalletInterface, validateType } from './validation'
import {
  WritableStore,
  WalletInterfaceStore,
  WalletInterface,
  WalletStateSliceStore,
  StateSyncer,
  BalanceStore,
  QueryablePromise
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
  syncing: null | QueryablePromise
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
  instance: null
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
  if (walletInterface) {
    // reset state
    balance.reset()
    address.reset()
    network.reset()

    // clear all current intervals if they exist
    currentSyncerIntervals.forEach(
      (interval: number | undefined) => interval && clearInterval(interval)
    )

    // start syncing state and save intervals
    currentSyncerIntervals = [
      address.setStateSyncer(walletInterface.address),
      network.setStateSyncer(walletInterface.network),
      balance.setStateSyncer(walletInterface.balance)
    ]
  }
})

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

  return {
    subscribe,
    reset: () => set(undefined),
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
        onChange(set)
        return
      }

      if (get) {
        const interval: any = setInterval(() => {
          get()
            .then(set)
            .catch((err: any) => {
              throw new Error(
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
  let emitterAddress: String
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
          // no address, so set balance back to null
          set && set(undefined)
        }
      }
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
