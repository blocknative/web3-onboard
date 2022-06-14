import Joi from 'joi'
import type { ChainId, WalletInit, WalletModule } from '@web3-onboard/common'

import type {
  InitOptions,
  WalletState,
  ConnectOptions,
  DisconnectOptions,
  ConnectOptionsString,
  AccountCenter,
  TransactionHandlerReturn,
  NotifyOptions,
  Notification,
  CustomNotification
} from './types'

const chainId = Joi.string().pattern(/^0x[0-9a-fA-F]+$/)
const chainNamespace = Joi.string().valid('evm')
const unknownObject = Joi.object().unknown()

// const address = Joi.string().regex(/^0x[a-fA-F0-9]{40}$/)
/** Related to ConnectionInfo from 'ethers/lib/utils' */
const providerConnectionInfo = Joi.object({
  url: Joi.string().required(),
  headers: Joi.object(),
  user: Joi.string(),
  password: Joi.string(),
  allowInsecureAuthentication: Joi.boolean(),
  allowGzip: Joi.boolean(),
  throttleLimit: Joi.number(),
  throttleSlotInterval: Joi.number(),
  throttleCallback: Joi.function(),
  timeout: Joi.number()
})

const chain = Joi.object({
  namespace: chainNamespace,
  id: chainId.required(),
  rpcUrl: Joi.string().required(),
  label: Joi.string().required(),
  token: Joi.string().required(),
  icon: Joi.string(),
  color: Joi.string(),
  providerConnectionInfo: providerConnectionInfo
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

const wallets = Joi.array().items(wallet)

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

const notify = Joi.object({
  transactionHandler: Joi.function(),
  enabled: Joi.boolean()
})

const initOptions = Joi.object({
  wallets: walletInit,
  chains: chains.required(),
  appMetadata: appMetadata,
  i18n: Joi.object().unknown(),
  apiKey: Joi.string(),
  accountCenter: Joi.object({
    desktop: Joi.object({
      enabled: Joi.boolean(),
      minimal: Joi.boolean(),
      position: accountCenterPosition
    }),
    mobile: Joi.object({
      enabled: Joi.boolean(),
      minimal: Joi.boolean(),
      position: accountCenterPosition
    })
  }),
  notify
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
  expanded: Joi.boolean(),
  minimal: Joi.boolean()
})

const customNotification = Joi.object({
  key: Joi.string(),
  type: Joi.string().allow('pending', 'error', 'success', 'hint'),
  eventCode: Joi.string(),
  message: Joi.string(),
  autoDismiss: Joi.number()
})

const notification = Joi.object({
  id: Joi.string().required(),
  key: Joi.string().required(),
  type: Joi.string().allow('pending', 'error', 'success', 'hint').required(),
  eventCode: Joi.string().required(),
  message: Joi.string().required(),
  autoDismiss: Joi.number().required(),
  network: Joi.string().required(),
  startTime: Joi.number()
})

const transactionHandlerReturn = Joi.any().allow(
  customNotification,
  Joi.boolean().allow(false)
)

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

export function validateWalletInit(data: WalletInit[]): ValidateReturn {
  return validate(walletInit, data)
}

export function validateLocale(data: string): ValidateReturn {
  return validate(locale, data)
}

export function validateNotifyOptions(
  data: Partial<NotifyOptions>
): ValidateReturn {
  return validate(notify, data)
}

export function validateTransactionHandlerReturn(
  data: TransactionHandlerReturn
): ValidateReturn {
  return validate(transactionHandlerReturn, data)
}

export function validateNotification(data: Notification): ValidateReturn {
  return validate(notification, data)
}

export function validateCustomNotification(
  data: CustomNotification
): ValidateReturn {
  return validate(customNotification, data)
}

export function validateUpdateBalances(data: WalletState[]): ValidateReturn {
  return validate(wallets, data)
}
