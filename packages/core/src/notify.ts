import 'regenerator-runtime/runtime'
import BlocknativeSdk from 'bnc-sdk'
import type { TransactionHandler } from 'bnc-sdk/dist/types/src/interfaces'
import { get } from 'svelte/store'

import uuid from 'uuid/v4'
import { locale, dictionary, getClientLocale } from 'svelte-i18n'

import Notify from './views/notify/views/Notify.svelte'

import { app, notifications } from './stores'
import { handleTransactionEvent, preflightTransaction } from './transactions'
import { createNotification } from './notifications'

import type {
  NotifyInitOptions,
  AppStore,
  API,
  Emitter,
  TransactionOptions,
  CustomNotificationObject,
  UpdateNotification,
  ConfigOptions,
  LocaleMessages
} from './types'

export {
  NotifyInitOptions,
  TransactionEvent,
  System,
  TransactionEventCode,
  TransactionData,
  NotificationType,
  CustomNotificationObject,
  BitcoinInputOutput,
  NotificationObject,
  ContractCall,
  DecodedContractCall,
  NotifyMessages,
  LocaleMessages,
  TransactionOptions,
  PreflightEvent,
  UpdateNotification,
  ConfigOptions,
  Hash,
  Transaction,
  NotifyAccount,
  Unsubscribe,
  Notification,
  Config,
  API,
  EmitterListener,
  Emitter,
  NotificationDetails
} from './types'

import {
  validateInit,
  validateTransactionOptions,
  validateNotificationObject,
  validateConfig
} from './validation'

import { createEmitter } from './utils'

import { version } from '../package.json'

let notify: any
let blocknative

function init(options: NotifyInitOptions): API {
  if (notify) {
    console.warn('notify has already been initialized')
    notify.$destroy()
    blocknative && blocknative.destroy()
  }

  validateInit(options)

  const { system, transactionHandler, apiUrl, ...appOptions } = options
  const { dappId, networkId, name, clientLocale, onerror } = appOptions

  const transactionHandlers: TransactionHandler[] = [handleTransactionEvent]

  if (transactionHandler) {
    transactionHandlers.push(transactionHandler)
  }

  if (dappId) {
    blocknative = new BlocknativeSdk({
      dappId,
      networkId,
      onerror,
      transactionHandlers,
      name: name || 'Notify',
      apiUrl,
      system
    })

    // filter out pending simulation events
    blocknative
      .configuration({
        scope: 'global',
        filters: [{ status: 'pending-simulation', _not: true }]
      })
      .catch(() => {
        // swallow server timeout response error as we are not waiting on it
      })
  }

  // save config to app store
  app.update((store: AppStore) => ({
    ...store,
    ...appOptions,
    version,
    clientLocale:
      clientLocale ||
      getClientLocale({
        fallback: 'en',
        navigator: true
      })
  }))

  // initialize App
  notify = new Notify({
    target: document.body
  })

  app.subscribe((store: AppStore) => {
    const { notifyMessages, clientLocale } = store

    // set the dictionary for i18n
    dictionary.set(notifyMessages)

    const availableLocale: LocaleMessages | undefined =
      notifyMessages[clientLocale] || notifyMessages[clientLocale.slice(0, 2)]
    locale.set(availableLocale ? clientLocale : 'en')
  })

  return {
    hash,
    transaction,
    account,
    unsubscribe,
    notification,
    config
  }

  function account(
    address: string
  ): { details: { address: string }; emitter: Emitter } | never {
    if (!blocknative) {
      throw new Error(
        'A dappId needs to be passed in when intializing Notify to use the account function'
      )
    }

    const result = blocknative.account(address)
    return result
  }

  function hash(hash: string, id?: string) {
    if (!blocknative) {
      throw new Error(
        'A dappId needs to be passed in when intializing Notify to use the hash function'
      )
    }

    const result = blocknative.transaction(hash, id)
    return result
  }

  function transaction(
    options: TransactionOptions
  ): { result: Promise<string>; emitter: Emitter } {
    if (!blocknative) {
      throw new Error(
        'A dappId needs to be passed in when intializing Notify to use the transaction function'
      )
    }

    validateTransactionOptions(options)

    const emitter = createEmitter()

    const result = preflightTransaction(blocknative, options, emitter).catch(
      err => {
        const { onerror } = get(app)
        onerror && onerror(err)
        return err
      }
    )

    return {
      emitter,
      result
    }
  }

  function unsubscribe(addressOrHash: string) {
    if (!blocknative) {
      throw new Error(
        'A dappId needs to be passed in when intializing Notify to use the unsubscribe function'
      )
    }

    blocknative.unsubscribe(addressOrHash)
  }

  function notification(
    notificationObject: CustomNotificationObject
  ): {
    dismiss: () => void
    update: UpdateNotification
  } {
    validateNotificationObject(notificationObject)

    let key = 0

    const id: string = uuid()
    const startTime: number = Date.now()
    const { eventCode = `customNotification${key++}` } = notificationObject

    const dismiss = () => notifications.remove(id, eventCode)

    function update(
      notificationUpdate: CustomNotificationObject
    ): {
      dismiss: () => void
      update: UpdateNotification
    } {
      validateNotificationObject(notificationUpdate)

      const { eventCode = `customNotification${key++}` } = notificationUpdate
      createNotification({ id, startTime, eventCode }, notificationUpdate)

      return {
        dismiss,
        update
      }
    }

    createNotification({ id, startTime, eventCode }, notificationObject)

    return {
      dismiss,
      update
    }
  }

  function config(options: ConfigOptions): void {
    validateConfig(options)

    const {
      notifyMessages,
      networkId: newNetworkId,
      system: newSystem,
      ...otherOptions
    } = options

    const { networkId, system, dappId, transactionHandler, name, apiUrl } = get(
      app
    )

    // networkId or system has changed
    if (
      (newNetworkId && newNetworkId !== networkId) ||
      (newSystem && newSystem !== system)
    ) {
      if (!blocknative) {
        throw new Error(
          'A dappId needs to be passed in when intializing Notify to be able to connect to a system and network'
        )
      }

      // close existing SDK connection
      blocknative.destroy()

      // create new connection with new values
      blocknative = new BlocknativeSdk({
        dappId,
        networkId: newNetworkId || networkId,
        transactionHandlers: transactionHandler
          ? [handleTransactionEvent, transactionHandler]
          : [handleTransactionEvent],
        name: name || 'Notify',
        apiUrl,
        system: newSystem || system
      })
    }

    app.update((store: AppStore) => {
      return {
        ...store,
        networkId: newNetworkId || networkId,
        system: newSystem || system,
        ...otherOptions,
        notifyMessages: notifyMessages
          ? { ...store.notifyMessages, ...notifyMessages }
          : store.notifyMessages
      }
    })
  }
}

export default init
