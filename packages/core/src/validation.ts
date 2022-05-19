import Joi from 'joi'
import type { ChainId, WalletInit, WalletModule } from '@web3-onboard/common'

import type {
  InitOptions,
  WalletState,
  ConnectOptions,
  DisconnectOptions,
  ConnectOptionsString,
  AccountCenter,
  NotifyOptions
} from './types'

const chainId = Joi.string().pattern(/^0x[0-9a-fA-F]+$/)
const chainNamespace = Joi.string().valid('evm')
const unknownObject = Joi.object().unknown()
// const address = Joi.string().regex(/^0x[a-fA-F0-9]{40}$/)

const chain = Joi.object({
  namespace: chainNamespace,
  id: chainId.required(),
  rpcUrl: Joi.string().required(),
  label: Joi.string().required(),
  token: Joi.string().required(),
  icon: Joi.string(),
  color: Joi.string()
})

const connectedChain = Joi.object({
  namespace: chainNamespace.required(),
  id: chainId.required()
})

const ens = Joi.any().allow(
  Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string(),
    contentHash: Joi.any().allow(Joi.string(), null),
    getText: Joi.function().arity(1).required()
  }),
  null
)

const balance = Joi.any().allow(
  Joi.object({
    eth: Joi.number()
  }).unknown(),
  null
)

const account = Joi.object({
  address: Joi.string().required(),
  ens,
  balance
})

const chains = Joi.array().items(chain)
const accounts = Joi.array().items(account)

const wallet = Joi.object({
  label: Joi.string(),
  icon: Joi.string(),
  provider: unknownObject,
  instance: unknownObject,
  accounts,
  chains: Joi.array().items(connectedChain)
})

const recommendedWallet = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required()
})

const agreement = Joi.object({
  version: Joi.string().required(),
  termsUrl: Joi.string().uri(),
  privacyUrl: Joi.string().uri()
})

const appMetadata = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  icon: Joi.string().required(),
  logo: Joi.string(),
  gettingStartedGuide: Joi.string(),
  email: Joi.string(),
  appUrl: Joi.string(),
  explore: Joi.string(),
  recommendedInjectedWallets: Joi.array().items(recommendedWallet),
  agreement
})

const walletModule = Joi.object({
  label: Joi.string().required(),
  getInfo: Joi.function().arity(1).required(),
  getInterface: Joi.function().arity(1).required()
})

const walletInit = Joi.array().items(Joi.function()).required()

const locale = Joi.string()

const accountCenterPosition = Joi.string().valid(
  'topRight',
  'bottomRight',
  'bottomLeft',
  'topLeft'
)

const initOptions = Joi.object({
  wallets: walletInit,
  chains: chains.required(),
  appMetadata: appMetadata,
  i18n: Joi.object().unknown(),
  dappId: Joi.string(),
  accountCenter: Joi.object({
    desktop: Joi.object({
      enabled: Joi.boolean(),
      minimal: Joi.boolean(),
      position: accountCenterPosition
    }),
    mobile: Joi.object({
      enabled: Joi.boolean(),
      position: accountCenterPosition
    })
  }),
  notify: Joi.object({
    transactionHandler: Joi.function(),
    enabled: Joi.boolean(),
    onerror: Joi.function(),
  })
})

const connectOptions = Joi.object({
  autoSelect: [
    Joi.object({
      label: Joi.string().required(),
      disableModals: Joi.boolean()
    }),
    Joi.string()
  ]
})

const disconnectOptions = Joi.object({
  label: Joi.string().required()
}).required()

const setChainOptions = Joi.object({
  chainId: chainId.required(),
  chainNamespace: chainNamespace,
  wallet: Joi.string()
})

const accountCenter = Joi.object({
  enabled: Joi.boolean(),
  position: accountCenterPosition,
  expanded: Joi.boolean()
})

const notify = Joi.object({
  transactionHandler: Joi.function().required(),
  enabled: Joi.boolean(),
  onerror: Joi.function(),
})

type ValidateReturn = Joi.ValidationResult | null

function validate(validator: Joi.Schema, data: unknown): ValidateReturn {
  const result = validator.validate(data)
  return result.error ? result : null
}

export function validateWallet(
  data: WalletState | Partial<WalletState>
): ValidateReturn {
  return validate(wallet, data)
}

export function validateInitOptions(data: InitOptions): ValidateReturn {
  return validate(initOptions, data)
}

export function validateWalletModule(data: WalletModule): ValidateReturn {
  return validate(walletModule, data)
}

export function validateConnectOptions(
  data: ConnectOptions | ConnectOptionsString
): ValidateReturn {
  return validate(connectOptions, data)
}

export function validateDisconnectOptions(
  data: DisconnectOptions
): ValidateReturn {
  return validate(disconnectOptions, data)
}

export function validateString(str: string): ValidateReturn {
  return validate(Joi.string().required(), str)
}

export function validateSetChainOptions(data: {
  chainId: ChainId
  wallet?: WalletState['label']
}): ValidateReturn {
  return validate(setChainOptions, data)
}

export function validateAccountCenterUpdate(
  data: AccountCenter | Partial<AccountCenter>
): ValidateReturn {
  return validate(accountCenter, data)
}

export function validateNotifyUpdate(
  data: NotifyOptions | Partial<NotifyOptions>
): ValidateReturn {
  return validate(notify, data)
}

export function validateWalletInit(data: WalletInit[]): ValidateReturn {
  return validate(walletInit, data)
}

export function validateLocale(data: string): ValidateReturn {
  return validate(locale, data)
}





import type {
  NotifyInitOptions,
  TransactionOptions,
  CustomNotificationObject,
  ConfigOptions
} from './types'

const validInitKeys = [
  'dappId',
  'networkId',
  'system',
  'transactionHandler',
  'name',
  'onerror',
  'mobilePosition',
  'desktopPosition',
  'darkMode',
  'txApproveReminderTimeout',
  'txStallPendingTimeout',
  'txStallConfirmedTimeout',
  'notifyMessages',
  'clientLocale'
]

const validNotificationKeys = [
  'eventCode',
  'type',
  'message',
  'autoDismiss',
  'onclick',
  'link'
]

const validTransactionKeys = [
  'sendTransaction',
  'estimateGas',
  'gasPrice',
  'balance',
  'contractCall',
  'txDetails'
]

function invalidParams(
  params: any,
  validParams: string[],
  functionName: string
): void | never {
  const invalid = Object.keys(params)

  if (invalid.length > 0) {
    throw new Error(
      `${
        invalid[0]
      } is not a valid parameter for ${functionName}, must be one of the following valid parameters: ${validParams.join(
        ', '
      )}`
    )
  }
}

export function validateType({
  name,
  value,
  type,
  optional,
  customValidation
}: {
  name: string
  value: any
  type: string
  optional?: boolean
  customValidation?: (val: any) => void | never
}): never | void {
  if (!optional && typeof value === 'undefined') {
    throw new Error(`"${name}" is required`)
  }

  if (
    typeof value !== 'undefined' &&
    (type === 'array' ? Array.isArray(type) : typeof value !== type)
  ) {
    throw new Error(
      `"${name}" must be of type: ${type}, received type: ${typeof value} from value: ${value}`
    )
  }

  if (typeof value !== 'undefined' && customValidation) {
    customValidation(value)
  }
}

export function validateInit(init: NotifyInitOptions): void {
  validateType({ name: 'init', value: init, type: 'object' })

  const {
    dappId,
    system,
    networkId,
    transactionHandler,
    name,
    apiUrl,
    onerror,
    ...otherParams
  } = init

  validateType({
    name: 'dappId',
    value: dappId,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'system',
    value: system,
    type: 'string',
    // defaults to ethereum so optional
    optional: true
  })

  // if no dappId provided then optional, otherwise required
  validateType({
    name: 'networkId (if dappId provided)',
    value: networkId,
    type: 'number',
    optional: !dappId
  })

  validateType({ name: 'name', value: name, type: 'string', optional: true })

  validateType({
    name: 'apiUrl',
    value: apiUrl,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'transactionHandler',
    value: transactionHandler,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'onerror',
    value: onerror,
    type: 'function',
    optional: true
  })

  validateConfig(otherParams)
}

function stringOrNumber(val: string | number): boolean {
  return typeof val === 'string' || typeof val === 'number'
}

export function validateTransactionOptions(options: TransactionOptions): void {
  validateType({ name: 'transaction options', value: options, type: 'object' })

  const {
    sendTransaction,
    estimateGas,
    gasPrice,
    balance,
    contractCall,
    txDetails,
    ...otherParams
  } = options

  invalidParams(otherParams, validTransactionKeys, 'Transaction Options')

  validateType({
    name: 'sendTransaction',
    value: sendTransaction,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'estimateGas',
    value: estimateGas,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'gasPrice',
    value: gasPrice,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'balance',
    value: balance,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'contractCall',
    value: contractCall,
    type: 'object',
    optional: true
  })

  if (contractCall) {
    const { methodName, params, ...otherParams } = contractCall
    invalidParams(otherParams, ['methodName', 'params'], 'contractCall')

    validateType({
      name: 'methodName',
      value: methodName,
      type: 'string',
      optional: true
    })

    validateType({
      name: 'params',
      value: params,
      type: 'array',
      optional: true
    })
  }

  validateType({
    name: 'txDetails',
    value: txDetails,
    type: 'object',
    optional: true
  })

  if (txDetails) {
    const { to, value, from, ...otherParams } = txDetails

    invalidParams(otherParams, ['to', 'value', 'from'], 'txDetails')

    validateType({
      name: 'to',
      value: to,
      type: 'string',
      optional: true,
      customValidation: isAddress
    })

    if (typeof value !== 'undefined' && !stringOrNumber(value)) {
      throw new Error(
        `"value" must be of type: string | number, received type: ${typeof value} from value: ${value}`
      )
    }

    validateType({
      name: 'from',
      value: from,
      type: 'string',
      optional: true,
      customValidation: isAddress
    })
  }
}

export function validateNotificationObject(
  notification: CustomNotificationObject | boolean | undefined
): void {
  validateType({
    name: 'notification',
    value: notification,
    type: 'object'
  })

  if (typeof notification !== 'object') return

  const {
    eventCode,
    type,
    message,
    autoDismiss,
    onclick,
    link,
    ...otherParams
  } = notification

  invalidParams(otherParams, validNotificationKeys, 'notification')

  validateType({
    name: 'eventCode',
    value: eventCode,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'type',
    value: type,
    type: 'string',
    optional: true,
    customValidation: validNotificationType
  })

  validateType({
    name: 'message',
    value: message,
    type: 'string'
  })

  validateType({
    name: 'autoDismiss',
    value: autoDismiss,
    type: 'number',
    optional: true
  })

  validateType({
    name: 'onclick',
    value: onclick,
    type: 'function',
    optional: true
  })

  validateType({
    name: 'link',
    value: link,
    type: 'string',
    optional: true
  })
}

export function validateConfig(config: ConfigOptions): void {
  validateType({ name: 'config', value: config, type: 'object' })

  const {
    networkId,
    system,
    mobilePosition,
    desktopPosition,
    darkMode,
    notifyMessages,
    clientLocale,
    txApproveReminderTimeout,
    txStallPendingTimeout,
    txStallConfirmedTimeout,
    ...otherParams
  } = config

  invalidParams(otherParams, validInitKeys, 'config / initialize')

  validateType({
    name: 'networkId',
    value: networkId,
    type: 'number',
    optional: true
  })

  validateType({
    name: 'system',
    value: system,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'mobilePosition',
    value: mobilePosition,
    type: 'string',
    optional: true,
    customValidation: validMobilePosition
  })

  validateType({
    name: 'desktopPosition',
    value: desktopPosition,
    type: 'string',
    optional: true,
    customValidation: validDesktopPosition
  })

  validateType({
    name: 'darkMode',
    value: darkMode,
    type: 'boolean',
    optional: true
  })

  validateType({
    name: 'notifyMessages',
    value: notifyMessages,
    type: 'object',
    optional: true
  })

  if (notifyMessages) {
    Object.keys(notifyMessages).forEach(locale => {
      validateType({
        name: locale,
        value: notifyMessages[locale],
        type: 'object'
      })

      const { transaction, watched, time, ...otherParams } = notifyMessages[
        locale
      ]

      invalidParams(otherParams, ['transaction', 'watched', 'time'], locale)

      validateType({
        name: `notifyMessages.${locale}.transaction`,
        value: transaction,
        type: 'object',
        optional: true
      })

      validateType({
        name: `notifyMessages.${locale}.watched`,
        value: watched,
        type: 'object',
        optional: true
      })

      validateType({
        name: `notifyMessages.${locale}.time`,
        value: time,
        type: 'object',
        optional: true
      })
    })
  }

  validateType({
    name: 'clientLocale',
    value: clientLocale,
    type: 'string',
    optional: true
  })

  validateType({
    name: 'txApproveReminderTimeout',
    value: txApproveReminderTimeout,
    type: 'number',
    optional: true
  })

  validateType({
    name: 'txStallPendingTimeout',
    value: txStallPendingTimeout,
    type: 'number',
    optional: true
  })

  validateType({
    name: 'txStallConfirmedTimeout',
    value: txStallConfirmedTimeout,
    type: 'number',
    optional: true
  })
}

function validNotificationType(type: string): void | never {
  switch (type) {
    case 'hint':
    case 'pending':
    case 'error':
    case 'success':
      return
    default:
      throw new Error(
        `${type} is not a valid notification type, must be one of: 'hint', 'pending', 'error' or 'success'.`
      )
  }
}

function validMobilePosition(position: string): void | never {
  switch (position) {
    case 'top':
    case 'bottom':
      return
    default:
      throw new Error(
        `${position} is not a valid mobile notification position, must be one of: 'top' or 'bottom'.`
      )
  }
}

function validDesktopPosition(position: string): void | never {
  switch (position) {
    case 'bottomLeft':
    case 'bottomRight':
    case 'topLeft':
    case 'topRight':
      return
    default:
      throw new Error(
        `${position} is not a valid desktop notification position, must be one of: 'bottomLeft', 'bottomRight', 'topLeft' or 'topRight'.`
      )
  }
}

function isAddress(address: string): void | never {
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
    throw new Error(`${address} is not a valid ethereum address.`)
  }
}
