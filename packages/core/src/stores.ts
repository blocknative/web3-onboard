import { writable } from 'svelte/store'
import { replaceOrAdd } from './utils'
import { defaultNotifyMessages } from './i18n'

import type {
  TransactionData,
  NotificationObject,
  CustomNotificationObject,
  AppStore
} from './types'

export const app = writable<AppStore>({
  version: '',
  name: '',
  dappId: '',
  networkId: 1,
  nodeSynced: true,
  mobilePosition: 'top',
  desktopPosition: 'bottomRight',
  darkMode: false,
  txApproveReminderTimeout: 20000,
  txStallPendingTimeout: 20000,
  txStallConfirmedTimeout: 90000,
  clientLocale: 'en',
  notifyMessages: defaultNotifyMessages
})
export const accounts = writable([])
export const contracts = writable([])
export const transactions = createTransactionStore([])
export const notifications = createNotificationStore([])

function createTransactionStore(initialState: TransactionData[]) {
  const { subscribe, update } = writable(initialState)

  function updateQueue(
    transaction: TransactionData,
    predicate: (tx: TransactionData) => boolean
  ) {
    update((store: TransactionData[]) => {
      return replaceOrAdd(store, predicate, transaction)
    })
  }

  function add(transaction: TransactionData) {
    update((store: TransactionData[]) => [...store, transaction])
  }

  return {
    subscribe,
    updateQueue,
    add
  }
}

function createNotificationStore(
  initialState: (NotificationObject & CustomNotificationObject)[]
) {
  const { subscribe, update } = writable(initialState)

  function add(notification: NotificationObject & CustomNotificationObject) {
    update((store: (NotificationObject & CustomNotificationObject)[]) => {
      const existingNotification = store.find(
        (n: NotificationObject & CustomNotificationObject) =>
          n.id === notification.id
      )

      // if notification is a hint type or there are 
      // no existing notifications with same id, then just add it.
      if (notification.type === 'hint' || !existingNotification) {
        return [...store, notification]
      }

      // otherwise filter out all notifications with the 
      // same id and then add the new notification
      return [
        ...store.filter(
          (n: NotificationObject & CustomNotificationObject) =>
            n.id !== notification.id
        ),
        notification
      ]
    })
  }

  function remove(id: string, eventCode: string) {
    update((store: (NotificationObject & CustomNotificationObject)[]) =>
      store.filter(
        (n: NotificationObject & CustomNotificationObject) =>
          n.id !== id || n.eventCode !== eventCode
      )
    )
  }

  function updateId(oldId: string, newId: string) {
    update((store: (NotificationObject & CustomNotificationObject)[]) =>
      store.map((n: NotificationObject & CustomNotificationObject) =>
        n.id === oldId ? { ...n, id: newId } : n
      )
    )
  }

  return {
    subscribe,
    add,
    remove,
    update,
    updateId
  }
}
