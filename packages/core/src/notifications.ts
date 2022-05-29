// import { _ } from 'svelte-i18n'
// import BigNumber from 'bignumber.js'
// import { notifications } from './stores'
// import { eventToType, typeToDismissTimeout } from './notifyDefaultsfaults'
// import { defaultNotifyMessages } from './i18n'

// import type {
//   CustomNotificationObject,
//   TransactionData,
//   NotificationType,
//   BitcoinInputOutput
// } from './types'

// // subscribe to the formatter store
// let formatter: any
// _.subscribe((store: any) => (formatter = store))

// export function createNotification(
//   transactionDetails: TransactionData,
//   customization: CustomNotificationObject | boolean | void = {}
// ): void {
//   const notificationObject =
//     transactionDetails.system === 'bitcoin'
//       ? createBitcoinNotificationObject(transactionDetails, customization)
//       : createEthereumNotificationObject(transactionDetails, customization)

//   notifications.add(notificationObject)
// }

// function createBitcoinNotificationObject(
//   transactionDetails: TransactionData,
//   customization: CustomNotificationObject | boolean | void
// ) {
//   const {
//     id,
//     txid,
//     startTime,
//     eventCode,
//     watchedAddress,
//     inputs,
//     outputs
//   } = transactionDetails
//   const type: NotificationType = eventToType(eventCode)
//   const key = `${id || txid}-${
//     (typeof customization === 'object' && customization.eventCode) || eventCode
//   }`

//   const { direction, value } = getBitcoinDirectionValue(
//     inputs,
//     outputs,
//     watchedAddress
//   )

//   const formatterOptions = watchedAddress
//     ? {
//         messageId: `watched['${eventCode}']`,
//         values: {
//           verb:
//             eventCode === 'txConfirmed'
//               ? direction === 'incoming'
//                 ? 'received'
//                 : 'sent'
//               : direction === 'incoming'
//               ? 'receiving'
//               : 'sending',
//           formattedValue: value,
//           asset: 'BTC',
//           preposition: '',
//           counterpartyShortened: ''
//         }
//       }
//     : {
//         messageId: `transaction['${eventCode}']`,
//         values: { value, asset: 'BTC' }
//       }

//   const internationalizedMessage = formatter(formatterOptions.messageId, {
//     values: formatterOptions.values
//   })

//   const noMessageAvailable =
//     internationalizedMessage === formatterOptions.messageId

//   const message = noMessageAvailable
//     ? defaultNotifyMessages.en[watchedAddress ? 'watched' : 'transaction'][
//         eventCode || ''
//       ]
//     : internationalizedMessage

//   let notificationObject = {
//     id: id || txid,
//     type,
//     key,
//     startTime,
//     eventCode,
//     message,
//     autoDismiss: typeToDismissTimeout(
//       (typeof customization === 'object' && customization.type) || type
//     )
//   }
//   if (typeof customization === 'object') {
//     notificationObject = { ...notificationObject, ...customization }
//   }

//   return notificationObject
// }

// function createEthereumNotificationObject(
//   transactionDetails: TransactionData,
//   customization: CustomNotificationObject | boolean | void
// ) {
//   const {
//     id,
//     hash,
//     startTime,
//     eventCode,
//     direction,
//     counterparty,
//     value,
//     asset
//   } = transactionDetails

//   const type: NotificationType = eventToType(eventCode)
//   const key = `${id || hash}-${
//     (typeof customization === 'object' && customization.eventCode) || eventCode
//   }`
//   const counterpartyShortened: string | undefined =
//     counterparty &&
//     counterparty.substring(0, 4) +
//       '...' +
//       counterparty.substring(counterparty.length - 4)

//   const formattedValue = new BigNumber(value || 0)
//     .div(new BigNumber('1000000000000000000'))
//     .toString(10)

//   const formatterOptions =
//     counterparty && value
//       ? {
//           messageId: `watched['${eventCode}']`,
//           values: {
//             verb:
//               eventCode === 'txConfirmed'
//                 ? direction === 'incoming'
//                   ? 'received'
//                   : 'sent'
//                 : direction === 'incoming'
//                 ? 'receiving'
//                 : 'sending',
//             formattedValue,
//             preposition: direction === 'incoming' ? 'from' : 'to',
//             counterpartyShortened,
//             asset
//           }
//         }
//       : {
//           messageId: `transaction['${eventCode}']`,
//           values: { formattedValue, asset }
//         }

//   const internationalizedMessage = formatter(formatterOptions.messageId, {
//     values: formatterOptions.values
//   })

//   const noMessageAvailable =
//     internationalizedMessage === formatterOptions.messageId

//   const message = noMessageAvailable
//     ? defaultNotifyMessages.en[counterparty ? 'watched' : 'transaction'][
//         eventCode || ''
//       ]
//     : internationalizedMessage

//   let notificationObject = {
//     id: id || hash,
//     type,
//     key,
//     startTime,
//     eventCode,
//     message,
//     autoDismiss: typeToDismissTimeout(
//       (typeof customization === 'object' && customization.type) || type
//     )
//   }

//   if (typeof customization === 'object') {
//     notificationObject = { ...notificationObject, ...customization }
//   }

//   return notificationObject
// }

// function getBitcoinDirectionValue(
//   inputs: BitcoinInputOutput[] | undefined,
//   outputs: BitcoinInputOutput[] | undefined,
//   watchedAddress: string | undefined
// ) {
//   if (!watchedAddress) return { value: null, direction: '' }

//   const finder = (i: BitcoinInputOutput) => i.address === watchedAddress

//   const input = inputs && inputs.find(finder)
//   const output = outputs && outputs.find(finder)

//   return {
//     direction: output ? 'incoming' : 'outgoing',
//     value: output ? output.value : input && input.value
//   }
// }
